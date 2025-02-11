import prisma from "@/lib/prismaClient";
import { HealthResult } from "@/types/api/HealthResult";
import { NextRequest, NextResponse } from "next/server";

const healthCheck = async (
    request: NextRequest,
): Promise<NextResponse<HealthResult>> => {
    return NextResponse.json({ prismaUp: prisma !== undefined });
};

export { healthCheck as GET };
