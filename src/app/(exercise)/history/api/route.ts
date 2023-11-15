import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/app/types";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Exampe usage in a component
 * 
  const { gameHistory, isLoading, error } = useFetchHistoryData({
    skip: skip,
    take: take,
  });
 * 
 */

// GET FULL GAME SESSION HISTORY
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const take = Number(searchParams.get("take"));
  const skip = Number(searchParams.get("skip"));
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;
  const userId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user: User | null) => {
      if (!user) {
        throw new Error("User not found");
      }
      return user.id!;
    });

  if (!userId) {
    return NextResponse.error();
  }

  const gameSessions = await prisma.gameSession.findMany({
    skip,
    take,
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(gameSessions);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;
  const userId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user: User | null) => {
      if (!user) {
        throw new Error("User not found");
      }
      return user.id!;
    });

  if (!userId) {
    return NextResponse.error();
  }

  const deletedGameSession = await prisma.gameSession.deleteMany({
    where: { userId },
  });

  return NextResponse.json(deletedGameSession);
}
