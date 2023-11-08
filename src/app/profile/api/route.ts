import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;

  const gamePreferencesData = await req.json();
  const { userCycleSpeed, userGameLength, userMinutesGoal } =
    gamePreferencesData;

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  // const gamePreferences = await prisma.userGamePreference.upsert({
  //   where: { userId: currentUserId },
  //   create: {
  //     userId: currentUserId,
  //     userCycleSpeed,
  //     userGameLength,
  //     userMinutesGoal,
  //   },
  //   update: {
  //     userCycleSpeed,
  //     userGameLength,
  //     userMinutesGoal,
  //   },
  // });

  // return NextResponse.json(gamePreferences);
}
