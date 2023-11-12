import { authOptions } from "@/app/api/auth/[...nextauth]/options";
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
