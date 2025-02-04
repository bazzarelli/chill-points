import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalGameLength = await prisma.gameSession.aggregate({
      _sum: {
        gameLength: true,
      },
    });

    return NextResponse.json({ 
      totalGameLength: totalGameLength._sum.gameLength || 0 
    });
  } catch (error) {
    console.error('Error fetching total game length:', error);
    return NextResponse.json({ totalGameLength: 0 }, { status: 500 });
  }
}