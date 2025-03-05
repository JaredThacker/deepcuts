import { creationTimestamps } from "@/common/constants/timestamps";
import { getSession } from "@/helpers/api/session/getSession";
import prisma from "@/lib/prismaClient";
import { Favorite } from "@/types/api/Favorite";
import { NextRequest, NextResponse } from "next/server";

const getFavorites = async (
    _request: NextRequest,
): Promise<NextResponse<Favorite[]>> => {
    const {
        data: { id },
    } = getSession();

    const favoriteRecords = await prisma.favorite.findMany({
        include: {
            record: {
                select: {
                    artist: true,
                    image_uri: true,
                    title: true,
                    year: true,
                },
            },
        },
        where: { userid: id },
        orderBy: { created_at: "desc" },
    });

    return NextResponse.json(favoriteRecords as Favorite[]);
};

const addFavorite = async (
    request: NextRequest,
): Promise<NextResponse<Favorite>> => {
    const {
        data: { id },
    } = getSession();

    const body = await request.json();
    const { recordId } = body as {
        recordId: number;
    };

    const addedRecord = await prisma.favorite.create({
        data: {
            userid: id,
            recordid: recordId,
            ...creationTimestamps(),
        },
    });

    return NextResponse.json(addedRecord as Favorite);
};

const removeFavorite = async (
    request: NextRequest,
): Promise<NextResponse<Favorite>> => {
    const {
        data: { id: userId },
    } = getSession();

    const body = await request.json();
    const { id } = body as { id: number; recordId: number };

    const removedRecord = await prisma.favorite.delete({
        where: { id, userid: userId },
    });

    return NextResponse.json(removedRecord as Favorite);
};

export { removeFavorite as DELETE, getFavorites as GET, addFavorite as POST };
