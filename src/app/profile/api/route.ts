import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/app/types";
import { endOfWeekUTCToISO, startOfWeekUTCToISO } from "@/app/utils/date";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// SAVE USER GAME PREFERENCES
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }
  const currentUserEmail = session?.user?.email as string;
  const gamePreferencesData = await req.json();
  const { userCycleSpeed, userGameLength, userMinutesGoal } =
    gamePreferencesData;

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user: User | null) => {
      if (!user) {
        throw new Error("User not found");
      }
      return user.id!;
    });

    //! This is a bug
  const gamePreferences = await prisma.userGamePreference.upsert({
    where: { id: 1 },
    create: {
      userId: currentUserId,
      userCycleSpeed,
      userGameLength,
      userMinutesGoal,
    },
    update: {
      userCycleSpeed,
      userGameLength,
      userMinutesGoal,
    },
  });

  return NextResponse.json(gamePreferences);
}

// GET GAME SESSIONS FOR THE WEEK
export async function GET() {
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

  const gameLengthCount = await prisma.gameSession.count({
    where: {
      AND: [
        { userId },
        { createdAt: { gte: startOfWeekUTCToISO || new Date(0) } },
        { createdAt: { lte: endOfWeekUTCToISO || new Date() } },
      ],
    },
    select: { gameLength: true },
  });

  return NextResponse.json(gameLengthCount);
}
