import { UserRecord } from "./UserRecord";

export type HistoryRecord = {
    id: number;
    historyid: number;
    recordid: number;
    created_at: Date;
    updated_at: Date;
    record?: UserRecord;
};
