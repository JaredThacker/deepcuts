import { UserRecord } from "./UserRecord";

export type Favorite = {
    id: number;
    userid: number;
    recordid: number;
    created_at: Date;
    updated_at: Date;
    record?: UserRecord;
};
