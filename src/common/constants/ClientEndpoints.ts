export const ClientEndpoints = {
    AUTH: {
        BASE: "auth/",
        USER: {
            BASE: "user/",
            EMAIL: {
                BASE: "email/",
                CONFIRM: "confirm",
            },
            PASSWORD: {
                BASE: "password/",
                FORGOT: "forgot",
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
    USER: {
        BASE: "user/",
        FORGOT: {
            BASE: "forgot/",
            PASSWORD: "password",
        },
    },
};
