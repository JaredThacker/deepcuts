/**
 * Parses the value to json if successful, if not returns undefined
 *
 * @param value - The value to parse
 * @returns The parsed json, undefined otherwise
 */
export const parseJson = <T>(value: string): T | undefined => {
    try {
        return JSON.parse(value) as T;
    } catch {
        return undefined;
    }
};
