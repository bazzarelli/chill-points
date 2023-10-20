"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FEEDBACK_LENGTH = 2500;

const surveySchema = z.object({
  surveyName: z.string(),
  dailyHabit: z.string(),
  dailyNotification: z.string(),
  finishedGame: z.string(),
  gameRating: z.string(),
  additionalFeedback: z.string().max(MAX_FEEDBACK_LENGTH),
});

type TSurveySchema = z.infer<typeof surveySchema>;

export default function EqualBreathingSurvey() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSurveySchema>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TSurveySchema) => {
    console.log("survey form data", data);

    try {
      const res = await fetch("/survey/api", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.status);

      if (res.status === 200) {
        const data = await res.json();
        console.log("saved data:", data);
      } else {
        console.error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }

    reset();
    router.back();
  };

  return (
    <section className="w-full bg-gray-300 text-left p-4">
      <h2 className="text-2xl text-gray-800">What do you think?</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4"
      >
        <input
          type="hidden"
          {...register("surveyName")}
          value="equal-breathing"
        />
        {/* Question finished-game */}
        <section className="form-control border-2 border-slate-100 bg-slate-200 rounded-md p-2 mt-4">
          <h3 className="text-md">Did you make it to the end of the game?</h3>
          <div className="flex flex-row justify-start gap-4">
            <label className="label cursor-pointer flex flex-row gap-0 justify-start">
              <input
                {...register("finishedGame")}
                type="radio"
                value="yes"
                className="radio border-2 border-slate-800 checked:bg-slate-400"
              />
              <span className="text-slate-700 text-lg pl-2">Yes</span>
            </label>
            <label className="label cursor-pointer flex flex-row gap-0 justify-start">
              <input
                {...register("finishedGame")}
                type="radio"
                value="no"
                className="radio border-2 border-slate-800 checked:bg-slate-400"
              />
              <span className="text-slate-700 text-lg pl-2">No</span>
            </label>
          </div>
        </section>

        {/* Question daily-habit */}
        <section className="form-control border-2 border-slate-100 bg-slate-200 rounded-md p-2 mt-4">
          <h3 className="text-md">
            Would you use this game to build a daily breath habit?
          </h3>
          <div className="flex flex-row justify-start gap-4">
            <label className="label cursor-pointer flex flex-row gap-0 justify-start">
              <input
                {...register("dailyHabit")}
                type="radio"
                value="yes"
                className="radio border-2 border-slate-800 checked:bg-slate-400"
              />
              <span className="text-slate-700 text-lg pl-2">Yes</span>
            </label>
            <label className="label cursor-pointer flex flex-row gap-0 justify-start">
              <input
                {...register("dailyHabit")}
                type="radio"
                value="no"
                className="radio border-2 border-slate-800 checked:bg-slate-400"
              />
              <span className="text-slate-700 text-lg pl-2">No</span>
            </label>
          </div>
        </section>

        {/* Question daily-notification */}
        <section className="form-control border-2 border-slate-100 bg-slate-200 rounded-md p-2 mt-4">
          <h3 className="text-md">
            Would you find it helpful to get notifications/reminders?
          </h3>
          <div className="flex flex-row justify-start gap-4">
            <label className="label cursor-pointer flex flex-row gap-0 justify-start">
              <input
                {...register("dailyNotification")}
                type="radio"
                value="yes"
                className="radio border-2 border-slate-800 checked:bg-slate-400"
              />
              <span className="text-slate-700 text-lg pl-2">Yes</span>
            </label>
            <label className="label cursor-pointer flex flex-row gap-0 justify-start">
              <input
                {...register("dailyNotification")}
                type="radio"
                value="no"
                className="radio border-2 border-slate-800 checked:bg-slate-400"
              />
              <span className="text-slate-700 text-lg pl-2">No</span>
            </label>
          </div>
        </section>

        {/* Question game-rating */}
        <section className="form-control border-2 border-slate-100 bg-slate-200 rounded-md p-2 mt-4">
          <h3 className="text-md">How would you rate the game?</h3>
          <div className="rating rating-md my-2 gap-2">
            {/* <input type="radio" name="game-rating" className="rating-hidden" /> */}
            <input
              {...register("gameRating")}
              type="radio"
              value="1"
              className="mask mask-star-2 bg-sky-500"
            />
            <input
              {...register("gameRating")}
              type="radio"
              value="2"
              className="mask mask-star-2 bg-sky-500"
            />
            <input
              {...register("gameRating")}
              type="radio"
              value="3"
              className="mask mask-star-2 bg-sky-500"
            />
            <input
              {...register("gameRating")}
              type="radio"
              value="4"
              className="mask mask-star-2 bg-sky-500"
            />
            <input
              {...register("gameRating")}
              type="radio"
              value="5"
              className="mask mask-star-2 bg-sky-500"
            />
          </div>
        </section>

        {/* additional-feedback */}
        <section className="form-control border-2 border-slate-100 bg-slate-200 rounded-md p-2 mt-4">
          <h3 className="text-md pb-2">What could be improved?</h3>
          {errors.additionalFeedback && (
            <span className="text-red-700 text-sm">
              maximum length {MAX_FEEDBACK_LENGTH} characters
            </span>
          )}
          <textarea
            {...register("additionalFeedback")}
            className="textarea textarea-bordered textarea-neutral w-full max-w-xs bg-slate-100"
          ></textarea>
        </section>

        <button
          disabled={isSubmitting}
          type="submit"
          className="btn btn-square w-1/2 px-4 my-4 bg-fuchsia-400/80 text-slate-800"
        >
          Submit feedback
        </button>
      </form>
    </section>
  );
}
