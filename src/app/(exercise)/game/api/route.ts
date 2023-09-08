import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import inhaleTimeDiff from "@/app/utils/inhaleTimeDiff";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type User = {
  id: string;
  name: string | null;
  bio: string | null;
  age: number | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;
  const gameSessionData = await req.json();
  const { gameName, inhaleTimes, cycleCount, gameLength } = gameSessionData;

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user: User | null) => {
      if (!user) {
        throw new Error("User not found");
      }
      return user.id!;
    });

  // check for valid currentUserId
  if (!currentUserId) {
    return NextResponse.error();
  }

  const gameSession = await prisma.gameSession.create({
    data: {
      userId: currentUserId,
      gameName: gameName,
      // when saving to db, we compact the inhaleTimes array
      // so the postgres datatype can be regular Int[]
      inhaleTimes: inhaleTimeDiff(inhaleTimes),
      cycleCount: cycleCount,
      gameLength: gameLength,
    },
  });

  return NextResponse.json(gameSession);
}

export async function GET() {
  const gameSessions = await prisma.gameSession.findMany({
    take: 20,
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

  // could delete individual game sessions by id
  // const { id } = await req.json();
  if (!userId) {
    return NextResponse.error();
  }

  const deletedGameSession = await prisma.gameSession.deleteMany();

  return NextResponse.json(deletedGameSession);
}
