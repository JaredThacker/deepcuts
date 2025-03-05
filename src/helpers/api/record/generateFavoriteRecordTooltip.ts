import { Favorite } from "@/types/api/Favorite";

export const generateFavoriteRecordTooltip = (
    favoriteRecord: Favorite,
): string => {
    const hasArtist = Boolean(favoriteRecord.record?.artist);
    const hasYear = Boolean(favoriteRecord.record?.year);
    const hasTitle = Boolean(favoriteRecord.record?.title);
    const hasMetadata = hasArtist && hasYear && hasTitle;

    return hasMetadata
        ? `${favoriteRecord.record?.artist} - ${favoriteRecord.record?.title} (${favoriteRecord.record?.year})`
        : "N/A";
};
