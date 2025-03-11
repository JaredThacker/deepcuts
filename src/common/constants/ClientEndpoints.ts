export const ClientEndpoints = {
    AUTH: {
        BASE: "auth/",
        USER: {
            BASE: "user/",
            EMAIL: {
                BASE: "email/",
                CONFIRM: "confirm",
            },
            REQUEST_TOKEN: "request_token",
        },
    },
    DISCOGS: {
        BASE: "https://discogs.com/",
        OAUTH: {
            AUTHORIZE: "authorize",
            BASE: "oauth/",
        },
    },
};
