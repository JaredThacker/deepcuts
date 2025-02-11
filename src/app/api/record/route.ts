import { creationTimestamps } from "@/common/constants/timestamps";
import { applyRecordFilter } from "@/helpers/api/record/applyRecordFilter";
import { getSession } from "@/helpers/api/session/getSession";
import { parseNumber } from "@/helpers/parseNumber";
import prisma from "@/lib/prismaClient";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { NextRequest, NextResponse } from "next/server";

const delay = (ms: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const RECORD_LIMIT = 60;

// For filters applied, maybe take a look at this: https://www.discogs.com/developers?srsltid=AfmBOooot3temCgy3IZkWQ-LZeYk-abmv7ON8JKNYOWG3Ipus4nP3GHF#page:database,header:database-search and https://www.discogs.com/developers?srsltid=AfmBOooot3temCgy3IZkWQ-LZeYk-abmv7ON8JKNYOWG3Ipus4nP3GHF#page:home,header:home-pagination
const getRecord = async (request: NextRequest) => {
    const session = getSession();
    let responseStatus = 404;
    let parsedRecord: DiscogsRecord | undefined = undefined;

    const queryString = request.nextUrl.searchParams;
    const yearStart = parseNumber(queryString.get("yearStart"));
    const yearEnd = parseNumber(queryString.get("yearEnd"));
    const genre = queryString.get("genre") ?? undefined;
    let recordsSearched = 0;

    console.log(genre, yearStart, yearEnd);

    while (responseStatus === 404) {
        try {
            if (recordsSearched === RECORD_LIMIT) {
                break;
            }
            recordsSearched += 1;

            if (recordsSearched > 5) {
                await delay();
            }

            const id = Math.floor(Math.random() * 31105274);

            console.log("id = ", id);
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

            console.log("matched = ", doesRecordMatch);

            if (!doesRecordMatch) {
                continue;
            }

            responseStatus = response.status;
        } catch (error) {
            console.log("in catch", error);
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
    } else {
        return NextResponse.json({ errorMessage: "Broaden your horizons..." });
    }

    return NextResponse.json(parsedRecord);
};

export { getRecord as GET };
