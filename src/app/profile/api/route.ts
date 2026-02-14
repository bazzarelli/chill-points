import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/app/types";
import { endOfWeekUTCToISO, startOfWeekUTCToISO } from "@/app/utils/date";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function hasAuthSessionCookie(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  return (
    cookieHeader.includes("next-auth.session-token=") ||
    cookieHeader.includes("__Secure-next-auth.session-token=")
  );
}

// SAVE USER GAME PREFERENCES
export async function POST(req: Request) {
  if (!hasAuthSessionCookie(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
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

  const existingPreference = await prisma.userGamePreference.findFirst({
    where: { userId: currentUserId },
    orderBy: { id: "asc" },
  });

  const gamePreferences = existingPreference
    ? await prisma.userGamePreference.update({
        where: { id: existingPreference.id },
        data: {
          userCycleSpeed,
          userGameLength,
          userMinutesGoal,
        },
      })
    : await prisma.userGamePreference.create({
        data: {
          userId: currentUserId,
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
  if (!session?.user?.email) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }
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
