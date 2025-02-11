import { creationTimestamps } from "@/common/constants/timestamps";
import { applyRecordFilter } from "@/helpers/api/record/applyRecordFilter";
import { getSession } from "@/helpers/api/session/getSession";
import { parseNumber } from "@/helpers/parseNumber";
import prisma from "@/lib/prismaClient";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { NextRequest, NextResponse } from "next/server";

const getRecord = async (request: NextRequest) => {
    const session = getSession();
    let responseStatus = 404;
    let parsedRecord: DiscogsRecord | undefined = undefined;

    const queryString = request.nextUrl.searchParams;
    const yearStart = parseNumber(queryString.get("yearStart"));
    const yearEnd = parseNumber(queryString.get("yearEnd"));
    const genre = queryString.get("genre") ?? undefined;

    while (responseStatus === 404) {
        try {
            const id = Math.floor(Math.random() * 31105274);
            const response = await fetch(
                "https://api.discogs.com/releases/" +
                    id +
                    "?token=pnVhiBkGbDrHnRDrPMCKfDBXwHhvRdfLBvRgvzKb",
            );
            const jsonResponse = await response.json();
            parsedRecord = jsonResponse as DiscogsRecord;

            const doesRecordMatch = applyRecordFilter(
                { genre, yearEnd, yearStart },
                parsedRecord,
            );

            if (!doesRecordMatch) {
                continue;
            }

            responseStatus = response.status;
        } catch {
            continue;
        }
    }

    if (parsedRecord !== undefined) {
        await prisma.historyrecord.create({
            data: {
                historyid: session.historyId,
                recordid: parsedRecord?.id,
                image_uri:
                    parsedRecord?.images.length > 0
                        ? parsedRecord.images[0].uri
                        : "https://wingandaprayer.live/wp-content/uploads/2018/07/no-image-available.jpg?w=640",
                ...creationTimestamps(),
            },
        });
    }

    return NextResponse.json(parsedRecord);
};

export { getRecord as GET };
