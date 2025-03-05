import { HistoryRecord } from "@/types/api/HistoryRecord";

export const generateHistoryRecordTooltip = (
    historyRecord: HistoryRecord,
): string => {
    const hasArtist = Boolean(historyRecord.record?.artist);
    const hasYear = Boolean(historyRecord.record?.year);
    const hasTitle = Boolean(historyRecord.record?.title);
    const hasMetadata = hasArtist && hasYear && hasTitle;

    return hasMetadata
        ? `${historyRecord.record?.title}-${historyRecord.record?.artist} (${historyRecord.record?.year})`
        : "N/A";
};
