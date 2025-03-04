import { HistoryRecord } from "@/types/api/HistoryRecord";

export const generateHistoryRecordTooltip = (
    historyRecord: HistoryRecord,
): string => {
    const hasArtist = Boolean(historyRecord.artist);
    const hasYear = Boolean(historyRecord.year);
    const hasTitle = Boolean(historyRecord.title);
    const hasMetadata = hasArtist && hasYear && hasTitle;

    return hasMetadata
        ? `${historyRecord.artist}-${historyRecord.title} (${historyRecord.year})`
        : "N/A";
};
