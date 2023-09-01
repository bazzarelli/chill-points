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
    .then((user: JSX.IntrinsicAttributes & User) => user?.id!);

  const gameSession = await prisma.gameSession.create({
    data: {
      userId: currentUserId,
      gameName: gameName,
      inhaleTimes: inhaleTimeDiff(inhaleTimes),
      cycleCount: cycleCount,
      gameLength: gameLength,
    },
  });

  return NextResponse.json(gameSession);
}

export async function GET() {
  const gameSessions = await prisma.gameSession.findMany();

  return NextResponse.json(gameSessions);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;
  const userId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user: JSX.IntrinsicAttributes & User) => user?.id!);

  // could delete individual game sessions by id
  // const { id } = await req.json();
  if (!userId) {
    return NextResponse.error();
  }

  const deletedGameSession = await prisma.gameSession.deleteMany();

  return NextResponse.json(deletedGameSession);
}
