import { RandomFilter } from "@/types/api/RandomFilter";
import { DiscogsRecord } from "@/types/DiscogsRecord";

/**
 * Applies the record filter, which currently supports genre and year filtering
 *
 * @param filter - The filter to apply to the found record
 * @param record - The record found
 * @returns Whether the record matches the filter
 */
export const applyRecordFilter = (
    filter: RandomFilter,
    record?: DiscogsRecord,
) => {
    const { genre, yearStart, yearEnd } = filter;

    const genreMatch =
        record !== undefined &&
        ((genre !== undefined && record.genres.includes(genre)) ||
            genre === undefined);

    const yearStartWithEnd =
        record !== undefined &&
        yearStart !== undefined &&
        yearEnd !== undefined &&
        record.year >= yearStart &&
        record.year <= yearEnd;

    const yearStartWithoutEnd =
        record !== undefined &&
        yearStart !== undefined &&
        yearEnd === undefined &&
        record.year >= yearStart;

    const yearEndWithoutStart =
        record !== undefined &&
        yearStart === undefined &&
        yearEnd !== undefined &&
        record.year <= yearEnd;

    const yearMatch =
        yearStartWithEnd ||
        yearStartWithoutEnd ||
        yearEndWithoutStart ||
        (yearStart === undefined && yearEnd === undefined);

    return genreMatch && yearMatch;
};
