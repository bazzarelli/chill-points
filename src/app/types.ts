import { z } from "zod";

export const surveySchema = z.object({
  surveyName: z.string().max(32),
  dailyHabit: z.string().max(3).optional(),
  dailyNotification: z.string().max(3).optional(),
  finishedGame: z.string().max(3).optional(),
  gameRating: z.string().max(1).optional(),
  additionalFeedback: z
    .string()
    .max(2500, `*maximum length ${2500} characters`)
    .optional(),
});

export type TSurveySchema = z.infer<typeof surveySchema>;

export type BreathSessionData = {
  createdAt: string;
  gameName: string;
  inhaleTimes: number[];
  cycleCount: number;
  gameLength: number;
};
