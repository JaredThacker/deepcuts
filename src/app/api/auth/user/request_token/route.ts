import { ClientEndpoints } from "@/common/constants/ClientEndpoints";
import { ServerEndpoints } from "@/common/constants/ServerEndpoints";
import { generateQueryString } from "@/helpers/api/generateQueryString";
import { getSession } from "@/helpers/api/session/getSession";
import { OAuthTokenResponse } from "@/types/api/dto/OAuthTokenResponse";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

const getRequestToken = async (
    request: NextRequest,
): Promise<NextResponse<OAuthTokenResponse>> => {
    getSession();
    const url = `${ServerEndpoints.DISCOGS.BASE}${ServerEndpoints.DISCOGS.OAUTH.BASE}${ServerEndpoints.DISCOGS.OAUTH.REQUEST_TOKEN}`;
    const timestamp = dayjs().unix();

    const nonce = randomBytes(16).toString("hex");

    const oauthHeaderValues = [
        `oauth_consumer_key="${process.env.DISCOGS_CONSUMER_KEY}"`,
        `oauth_signature_method="PLAINTEXT"`,
        `oauth_timestamp="${timestamp}"`,
        `oauth_nonce="${nonce}"`,
        `oauth_version="1.0"`,
        `oauth_signature="${process.env.DISCOGS_CONSUMER_SECRET}&"`,
        `oauth_callback="http://localhost:3000/api/auth/user/access_token"`,
    ];

    const customHeaders: HeadersInit = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `OAuth ${oauthHeaderValues.join(", ")}`,
        "User-Agent": request.headers.get("User-Agent") ?? "Firefox",
    };

    const response = await fetch(url, { headers: { ...customHeaders } });
    const body = await response.text();
    const queriedResponse = new URLSearchParams(body);
    const oauthToken = queriedResponse.get("oauth_token");
    const oauthTokenSecret = queriedResponse.get("oauth_token_secret");

    if (oauthToken === null || oauthTokenSecret === null) {
        throw new Error("Request token unsuccessful");
    }

    cookies().set("oauth_token_secret", oauthTokenSecret);

    return NextResponse.json({ oauthToken, oauthTokenSecret });
};

export { getRequestToken as GET };
