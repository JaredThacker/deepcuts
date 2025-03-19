/**
 * Visits the supplied record
 *
 * @param recordId - The record id to visit
 */
export const visitRecord = (recordId: number): void => {
    if (window !== undefined) {
        window.open(
            `https://discogs.com/release/${recordId}`,
            "_blank",
            "noreferrer",
        );
    }
};
