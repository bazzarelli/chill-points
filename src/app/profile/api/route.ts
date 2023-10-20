import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import calculateInhaleTimeDiff from "@/app/utils/calculateInhaleTimeDiff";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;

  const gameSessionData = await req.json();
  const { gameName, inhaleTimes, cycleCount, gameLength } = gameSessionData;

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  // change this to be the preferences saved in the db
  // const preferences = await prisma.userGamePreference.upsert({
  //   where: { userId: currentUserId },
  //   userCycleSpeed: 5,
  //   userGameLength: 2,
  // });

  const gameSession = await prisma.gameSession.create({
    data: {
      userId: currentUserId,
      gameName: gameName,
      inhaleTimes: calculateInhaleTimeDiff(inhaleTimes),
      cycleCount: cycleCount,
      gameLength: gameLength,
    },
  });

  return NextResponse.json(gameSession);
}
