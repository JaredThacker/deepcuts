import { DiscogsRecord } from "@/types/DiscogsRecord";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    let responseStatus = 404;
    let parsedRecord: DiscogsRecord | undefined = undefined;
    while (responseStatus === 404) {
        const id = Math.floor(Math.random() * 31105274);
        const response = await fetch(
            "https://api.discogs.com/releases/" +
                id +
                "?token=pnVhiBkGbDrHnRDrPMCKfDBXwHhvRdfLBvRgvzKb",
        );
        const jsonResponse = await response.json();
        parsedRecord = jsonResponse as DiscogsRecord;
        responseStatus = response.status;
    }

    return NextResponse.json(parsedRecord);
}
