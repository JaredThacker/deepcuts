import { randomBytes } from "node:crypto";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { ServerEndpoints } from "@/common/constants/ServerEndpoints";
import { cookies } from "next/headers";
import { getSession } from "@/helpers/api/session/getSession";
import prisma from "@/lib/prismaClient";

const getAccessToken = async (request: NextRequest): Promise<NextResponse> => {
    const queryParams = request.nextUrl.searchParams;

    const oauthToken = queryParams.get("oauth_token");
    const oauthVerifier = queryParams.get("oauth_verifier");
    const oauthTokenSecret = cookies().get("oauth_token_secret");

    if (
        oauthToken === null ||
        oauthVerifier === null ||
        oauthTokenSecret === undefined
    ) {
        return NextResponse.redirect("/authenticate?success=false");
    }

    const session = getSession();

    const url = `${ServerEndpoints.DISCOGS.BASE}${ServerEndpoints.DISCOGS.OAUTH.BASE}${ServerEndpoints.DISCOGS.OAUTH.ACCESS_TOKEN}`;
    const timestamp = dayjs().unix();
    const nonce = randomBytes(16).toString("hex");

    const oauthHeaderValues = [
        `oauth_consumer_key="${process.env.DISCOGS_CONSUMER_KEY}"`,
        `oauth_signature_method="PLAINTEXT"`,
        `oauth_timestamp="${timestamp}"`,
        `oauth_nonce="${nonce}"`,
        `oauth_version="1.0"`,
        `oauth_signature="${process.env.DISCOGS_CONSUMER_SECRET}&${oauthTokenSecret.value}"`,
        `oauth_verifier="${oauthVerifier}"`,
        `oauth_token="${oauthToken}"`,
    ];

    const customHeaders: HeadersInit = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `OAuth ${oauthHeaderValues.join(", ")}`,
        "User-Agent": request.headers.get("User-Agent") ?? "Firefox",
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { ...customHeaders },
    });
    const body = await response.text();
    console.log("body = ", body);

    const queriedResponse = new URLSearchParams(body);
    const accessToken = queriedResponse.get("oauth_token");
    const accessTokenSecret = queriedResponse.get("oauth_token_secret");
    cookies().delete("oauth_token_secret");

    const foundUser = await prisma.userinfo.findFirst({
        where: { id: session.data.id },
    });

    if (foundUser === null) {
        throw new Error("Invalid session");
    }

    await prisma.userinfo.update({
        data: {
            oauth_token: accessToken,
            oauth_token_secret: accessTokenSecret,
        },
        where: { id: session.data.id },
    });

    return NextResponse.redirect("/authenticate?success=true");
};

export { getAccessToken as GET };
