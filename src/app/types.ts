import { z } from "zod";

export const surveySchema = z.object({
  surveyName: z.string().max(32),
  dailyHabit: z.string().max(3),
  dailyNotification: z.string().max(3),
  finishedGame: z.string().max(3),
  gameRating: z.string().max(1),
  additionalFeedback: z
    .string()
    .max(2500, `*maximum length ${2500} characters`),
});

export type TSurveySchema = z.infer<typeof surveySchema>;
