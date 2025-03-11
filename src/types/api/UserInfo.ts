export type UserInfo = {
    id: number;
    name: string;
    email: string;
    password: string;
    password_salt: string;
    created_at: Date;
    updated_at: Date;
    apiToken?: string;
    oauthToken?: string;
    oauthTokenSecret?: string;
    emailToken?: string;
    passwordToken?: string;
};
