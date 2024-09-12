import { UserInfo } from "./UserInfo";

export type Session = {
    data: Pick<UserInfo, "id">;
    historyId: number;
};
