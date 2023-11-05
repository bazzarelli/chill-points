import { TSurveySchema, surveySchema } from "@/app/types";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const surveyData: TSurveySchema = await req.json();
  const result = surveySchema.safeParse(surveyData);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

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
      surveyName,
      dailyHabit,
      dailyNotification,
      finishedGame,
      gameRating,
      additionalFeedback,
    },
  });

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true, result: surveyResults },
  );
}
