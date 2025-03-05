export type UserRecord = {
    id: number;
    recordid: number;
    created_at: Date;
    updated_at: Date;
    title?: string;
    artist?: string;
    year?: number;
    image_uri?: string;
    genre?: string;
    style?: string;
    country?: string;
};
