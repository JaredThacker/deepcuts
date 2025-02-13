import { ClientEndpoints } from "@/common/constants/ClientEndpoints";
import { ServerEndpoints } from "@/common/constants/ServerEndpoints";
import { OAuthTokenResponse } from "@/types/api/dto/OAuthTokenResponse";
import { generateQueryString } from "../generateQueryString";

export const oauth = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${ClientEndpoints.AUTH.BASE}${ClientEndpoints.AUTH.USER.BASE}${ClientEndpoints.AUTH.USER.REQUEST_TOKEN}`,
    );

    const responseJson = await response.json();
    const castedResponse = responseJson as OAuthTokenResponse;
    const redirectQueryString = generateQueryString({
        oauth_token: castedResponse.oauthToken,
    });

    if (window !== undefined) {
        console.log("opening window");
        window
            .open(
                `${ClientEndpoints.DISCOGS.BASE}${ClientEndpoints.DISCOGS.OAUTH.BASE}${ClientEndpoints.DISCOGS.OAUTH.AUTHORIZE}${redirectQueryString}`,
                "_blank",
            )
            ?.focus();
    }

    return responseJson;
};
