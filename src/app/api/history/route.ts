import { getSession } from "@/helpers/api/session/getSession";
import prisma from "@/lib/prismaClient";
import { History } from "@/types/api/History";
import { NextRequest, NextResponse } from "next/server";

const getHistory = async (
    request: NextRequest,
): Promise<NextResponse<History[]>> => {
    const {
        data: { id },
    } = getSession();

    const foundHistory = await prisma.history.findMany({
        include: {
            historyrecord: {
                select: {
                    id: true,
                    image_uri: true,
                    recordid: true,
                    title: true,
                    artist: true,
                    year: true,
                },
            },
        },
        where: { userid: id },
        orderBy: { created_at: "desc" },
    });

    const filteredHistory = foundHistory.filter(
        (eachHistory) => eachHistory.historyrecord.length > 0,
    );

    return NextResponse.json(filteredHistory as History[]);
};

export { getHistory as GET };
