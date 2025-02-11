/**
 * Attempts to parse the value supplied, returns undefined if parsing fails
 *
 * @param value - The value to parse
 * @returns The parsed value, undefined if parsing fails
 */
export const parseNumber = (
    value?: string | number | null,
): number | undefined => {
    try {
        const result = Number.parseInt(value as string);

        if (Number.isNaN(result)) {
            return undefined;
        }

        return result;
    } catch {
        return undefined;
    }
};
