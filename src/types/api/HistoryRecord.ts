export type HistoryRecord = {
    id: number;
    historyid: number;
    image_uri: string;
    recordid: number;
    created_at: Date;
    updated_at: Date;
    artist?: string;
    title?: string;
    year?: number;
};
