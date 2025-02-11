import { UserInfo } from "./UserInfo";

type SessionUserInfo = Pick<UserInfo, "apiToken" | "id">;

type Session = {
    data: SessionUserInfo;
    historyId: number;
};

export type { Session, SessionUserInfo };
