import { ServerEndpoints } from "@/common/constants/ServerEndpoints";
import { creationTimestamps } from "@/common/constants/timestamps";
import { generateQueryString } from "@/helpers/api/generateQueryString";
import { applyRecordFilter } from "@/helpers/api/record/applyRecordFilter";
import { generateRandomYear } from "@/helpers/api/record/generateRandomYear";
import { getSession } from "@/helpers/api/session/getSession";
import { parseNumber } from "@/helpers/parseNumber";
import prisma from "@/lib/prismaClient";
import { DiscogsDatabaseQuery } from "@/types/DiscogsDatabaseQuery";
import { DiscogsRecord } from "@/types/DiscogsRecord";
import { NextRequest, NextResponse } from "next/server";

const delay = (ms: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const RECORD_LIMIT = 60;
const MAX_RECORD_ID = 31105274;

// For filters applied, maybe take a look at this: https://www.discogs.com/developers?srsltid=AfmBOooot3temCgy3IZkWQ-LZeYk-abmv7ON8JKNYOWG3Ipus4nP3GHF#page:database,header:database-search and https://www.discogs.com/developers?srsltid=AfmBOooot3temCgy3IZkWQ-LZeYk-abmv7ON8JKNYOWG3Ipus4nP3GHF#page:home,header:home-pagination
const getRecord = async (request: NextRequest) => {
    const session = getSession();
    let responseStatus = 404;
    let parsedRecord: DiscogsRecord | undefined = undefined;

    const queryString = request.nextUrl.searchParams;
    const yearStart = parseNumber(queryString.get("yearStart"));
    const yearEnd = parseNumber(queryString.get("yearEnd"));
    const genre = queryString.get("genre") ?? undefined;
    const apiToken = session.data.apiToken ?? process.env.DISCOGS_API_TOKEN;
    let recordsSearched = 0;

    const isFilterApplied =
        yearStart !== undefined || yearEnd !== undefined || genre !== undefined;

    if (isFilterApplied) {
        console.log("in filter applied");
        if (apiToken === undefined) {
            return NextResponse.json({
                errorMessage: "Filtering requires API token.",
            });
        }

        const isYearFilterApplied =
            yearStart !== undefined || yearEnd !== undefined;

        const searchedYears = new Set<number>();

        while (recordsSearched !== RECORD_LIMIT) {
            recordsSearched += 1;

            if (recordsSearched > 5) {
                await delay();
            }

            const randomYear = isYearFilterApplied
                ? generateRandomYear(searchedYears, yearStart, yearEnd)
                : undefined;

            if (isYearFilterApplied && randomYear === -1) {
                return NextResponse.json({
                    errorMessage: "Could not find record within year range.",
                });
            }

            const queryString = generateQueryString({
                per_page: 100,
                genre: genre?.toLowerCase(),
                year: randomYear,
            });

            const response = await fetch(
                `${ServerEndpoints.DISCOGS.BASE}${ServerEndpoints.DISCOGS.DATABASE.BASE}${ServerEndpoints.DISCOGS.DATABASE.SEARCH}${queryString}`,
            );
            const parsedResponse = await response.json();
            const castedResponse = parsedResponse as DiscogsDatabaseQuery;

            console.log(parsedResponse);

            const {
                pagination: { pages },
            } = castedResponse;

            if (pages === 0 && !isYearFilterApplied) {
                return NextResponse.json({
                    errorMessage: "Broaden your horizon...",
                });
            }

            const randomPage = Math.floor(Math.random() * pages + 1);
            const pageQuery = generateQueryString({
                per_page: 100,
                genre: genre?.toLowerCase(),
                year: randomYear,
                page: randomPage,
            });

            const pageResponse = await fetch(
                `${ServerEndpoints.DISCOGS.BASE}${ServerEndpoints.DISCOGS.DATABASE.BASE}${ServerEndpoints.DISCOGS.DATABASE.SEARCH}${pageQuery}`,
            );
            const parsedPageResponse = await pageResponse.json();
            const castedPageResponse =
                parsedPageResponse as DiscogsDatabaseQuery;
            const { results } = castedPageResponse;

            const castedResultsLength = results.length;
            const randomRecordIndex = Math.floor(
                Math.random() * castedResultsLength,
            );
            const randomRecord = results[randomRecordIndex];
            return NextResponse.json(randomRecord);
        }
    } else {
        while (responseStatus === 404) {
            try {
                if (recordsSearched === RECORD_LIMIT) {
                    break;
                }
                recordsSearched += 1;

                if (recordsSearched > 5) {
                    await delay();
                }

                const id = Math.floor(Math.random() * MAX_RECORD_ID);

                const queryString = generateQueryString({ token: apiToken });
                const response = await fetch(
                    `${ServerEndpoints.DISCOGS.BASE}${ServerEndpoints.DISCOGS.RELEASES.BASE}${id}${queryString}`,
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
    }

    if (parsedRecord !== undefined) {
        await prisma.historyrecord.create({
            data: {
                historyid: session.historyId,
                recordid: parsedRecord?.id,
                image_uri:
                    parsedRecord?.images.length > 0
                        ? parsedRecord.images[0].uri
                        : undefined,
                ...creationTimestamps(),
            },
        });
    } else {
        return NextResponse.json({ errorMessage: "Broaden your horizons..." });
    }

    return NextResponse.json(parsedRecord);
};

export { getRecord as GET };
