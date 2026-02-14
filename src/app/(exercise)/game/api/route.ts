import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const ANON_USER_EMAIL = "anonymous@example.com";

function hasAuthSessionCookie(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  return (
    cookieHeader.includes("next-auth.session-token=") ||
    cookieHeader.includes("__Secure-next-auth.session-token=")
  );
}

async function getAnonymousUserId() {
  const anonUser = await prisma.user.upsert({
    where: { email: ANON_USER_EMAIL },
    update: {},
    create: {
      email: ANON_USER_EMAIL,
      name: "Anonymous",
    },
  });
  return anonUser.id;
}

async function resolveCurrentUserId(req: Request) {
  let currentUserEmail = ANON_USER_EMAIL;

  if (hasAuthSessionCookie(req)) {
    try {
      const session = await getServerSession(authOptions);
      currentUserEmail = (session?.user?.email as string) || ANON_USER_EMAIL;
    } catch (error) {
      console.warn("Session lookup failed in /game/api, defaulting to anonymous.");
      currentUserEmail = ANON_USER_EMAIL;
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });

  if (existingUser?.id) {
    return existingUser.id;
  }

  if (currentUserEmail === ANON_USER_EMAIL) {
    return getAnonymousUserId();
  }

  const createdUser = await prisma.user.create({
    data: { email: currentUserEmail },
  });
  return createdUser.id;
}

export async function POST(req: Request) {
  const gameSessionData = await req.json();
  const { gameName, inhaleTimes, cycleCount, gameLength } = gameSessionData;
  const currentUserId = await resolveCurrentUserId(req);

  const gameSession = await prisma.gameSession.create({
    data: {
      userId: currentUserId,
      gameName,
      inhaleTimes,
      cycleCount,
      gameLength,
    },
  });

  return NextResponse.json(gameSession);
}

// GET FULL GAME SESSION HISTORY
export async function GET(req: Request) {
  if (!hasAuthSessionCookie(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;
  const userId = await prisma.user.findUnique({ where: { email: currentUserEmail } });

  if (!userId?.id) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const gameSessions = await prisma.gameSession.findMany({
    where: { userId: userId.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(gameSessions);
}

export async function DELETE(req: Request) {
  if (!hasAuthSessionCookie(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email as string;
  const userId = await prisma.user.findUnique({ where: { email: currentUserEmail } });

  // could delete individual game sessions by id
  // const { id } = await req.json();
  if (!userId?.id) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const deletedGameSession = await prisma.gameSession.deleteMany({
    where: { userId: userId.id },
  });

  return NextResponse.json(deletedGameSession);
}
