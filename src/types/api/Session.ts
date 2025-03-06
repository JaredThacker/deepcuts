import { UserInfo } from "./UserInfo";

type SessionUserInfo = Pick<UserInfo, "apiToken" | "id" | "oauthToken">;

type Session = {
    data: SessionUserInfo;
    historyId: number;
};

export type { Session, SessionUserInfo };
