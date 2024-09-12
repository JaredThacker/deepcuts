import { getSession } from "@/helpers/api/session/getSession";
import prisma from "@/lib/prismaClient";
import { HistoryRecord } from "@/types/api/HistoryRecord";
import { NextRequest, NextResponse } from "next/server";

const addHistoryRecord = async (
    request: NextRequest,
): Promise<NextResponse<HistoryRecord>> => {
    const {
        data: { id },
    } = getSession();

    const bodyJson = await request.json();

    const parsedBody = bodyJson as HistoryRecord;

    const addedRecord = await prisma.historyrecord.create({ data: parsedBody });

    return NextResponse.json(addedRecord as HistoryRecord);
};

export { addHistoryRecord as POST };
