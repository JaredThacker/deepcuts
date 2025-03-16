import { Favorite } from "@/types/api/Favorite";
import { HistoryRecord } from "@/types/api/HistoryRecord";

export const generateRecordTooltip = (
    databaseEntry: HistoryRecord | Favorite,
): string => {
    const hasArtist = Boolean(databaseEntry.record?.artist);
    const hasYear = Boolean(databaseEntry.record?.year);
    const hasTitle = Boolean(databaseEntry.record?.title);
    const hasMetadata = hasArtist && hasTitle;

    return hasMetadata
        ? `${databaseEntry.record?.artist} - ${databaseEntry.record?.title} (${
              hasYear ? databaseEntry.record?.year : "N/A"
          })`
        : "N/A";
};
