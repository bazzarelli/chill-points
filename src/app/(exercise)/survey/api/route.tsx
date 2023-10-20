import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const surveyData = await req.json();
  const {
    surveyName,
    dailyHabit,
    dailyNotification,
    finishedGame,
    gameRating,
    additionalFeedback,
  } = surveyData;

  const surveyResults = await prisma.feedbackSurvey.create({
    data: {
      surveyName: surveyName,
      dailyHabit: dailyHabit,
      dailyNotification: dailyNotification,
      finishedGame: finishedGame,
      gameRating: gameRating,
      additionalFeedback: additionalFeedback,
    },
  });

  return NextResponse.json(surveyResults);
}
