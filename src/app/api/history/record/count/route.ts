import prisma from "@/lib/prismaClient";
import { HistoryRecordCount } from "@/types/api/dto/HistoryRecordCount";
import { NextRequest, NextResponse } from "next/server";

const getHistoryRecordCount = async (
    request: NextRequest,
): Promise<NextResponse<HistoryRecordCount>> => {
    const allHistoryRecords = await prisma.historyrecord.count();

    return NextResponse.json({ count: allHistoryRecords });
};

export { getHistoryRecordCount as GET };
