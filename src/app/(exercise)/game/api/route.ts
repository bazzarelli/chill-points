import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
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
  // Make sure to await cookies() before using it
  const cookieStore = await cookies();

  const anonUserId = "anonymous";
  const anonUserEmail = "anonymous@example.com";
  const session = await getServerSession(authOptions);
  const currentUserEmail = (session?.user?.email as string) || anonUserEmail;
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

  const gameSession = await prisma.gameSession.create({
    data: {
      userId: currentUserId ? currentUserId : anonUserId,
      gameName,
      inhaleTimes,
      cycleCount,
      gameLength,
    },
  });

  return NextResponse.json(gameSession);
}

// GET FULL GAME SESSION HISTORY
export async function GET() {
  // Make sure to await cookies() before using it
  const cookieStore = await cookies();

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
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(gameSessions);
}

export async function DELETE(req: Request) {
  // Make sure to await cookies() before using it
  const cookieStore = await cookies();

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

  const deletedGameSession = await prisma.gameSession.deleteMany({
    where: { userId },
  });

  return NextResponse.json(deletedGameSession);
}
