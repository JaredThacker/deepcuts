import { creationTimestamps } from "@/common/constants/timestamps";
import { getSession } from "@/helpers/api/session/getSession";
import prisma from "@/lib/prismaClient";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { NextRequest, NextResponse } from "next/server";

const getRecord = async (_request: NextRequest) => {
    const session = getSession();
    let responseStatus = 404;
    let parsedRecord: DiscogsRecord | undefined = undefined;
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
