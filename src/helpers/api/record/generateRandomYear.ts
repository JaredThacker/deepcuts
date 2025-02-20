import dayjs from "dayjs";

const MIN_YEAR = 1936;
const currentYear = dayjs().year();

/**
 * Generates a random year to search for
 *
 * @param yearSet - The set of years that has already been searched, to avoid redundancy
 * @param yearStart - The start year for the filter
 * @param yearEnd - The end year for the filter
 * @returns The generated random year
 */
export const generateRandomYear = (
    yearSet: Set<number>,
    yearStart?: number,
    yearEnd?: number,
): number | undefined => {
    const isOnlyYearEnd = yearStart === undefined && yearEnd !== undefined;
    const isOnlyYearStart = yearEnd === undefined && yearStart !== undefined;
    let randomYear: number | undefined = undefined;

    const yearRange = isOnlyYearEnd
        ? yearEnd - MIN_YEAR
        : isOnlyYearStart
        ? currentYear - yearStart
        : (yearEnd as number) - (yearStart as number);

    if ([...yearSet].length === yearRange) {
        return -1;
    }

    do {
        randomYear = isOnlyYearEnd
            ? Math.floor(Math.random() * (yearEnd - MIN_YEAR + 1) + MIN_YEAR)
            : isOnlyYearStart
            ? Math.floor(Math.random() * (currentYear - yearStart) + yearStart)
            : Math.floor(
                  Math.random() *
                      ((yearEnd as number) - (yearStart as number)) +
                      (yearStart as number),
              );
    } while (randomYear !== undefined && yearSet.has(randomYear));

    if (randomYear !== undefined) {
        yearSet.add(randomYear);
    }

    return randomYear;
};
