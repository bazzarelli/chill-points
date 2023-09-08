import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const gameSessions = await prisma.gameSession.findMany({
    where: { gameName: "Equal Breathing" },
    select: { gameLength: true },
  });

  return NextResponse.json(gameSessions);
}
