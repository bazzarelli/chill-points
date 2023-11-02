"use client";

import UserCard from "@/app/components/user/UserCard";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserProfile() {
  const { breathSessionData, userMinutesGoal, setUserMinutesGoal } =
    useBreathSessionStore();
  const DAYS_IN_WEEK = 7;

  // Check if visitor is logged in
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  /**
   * Returns array of gameLength objs
   * [{gameLength: 2},{gameLength: 1}]
   */
  const gameLengthData: { gameLength: number }[] = breathSessionData
    .filter((session) => session.gameName === "Equal Breathing")
    .map((session) => ({
      gameLength: session.gameLength,
    }));

  const gameLengthTotal = gameLengthData.reduce((acc, cur) => {
    return cur.gameLength + acc;
  }, 0);

  function handleMinutesGoalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const goalLength = parseInt(event.target.value, 10);
    setUserMinutesGoal(goalLength);
  }

  return (
    <>
      <section className="flex flex-col gap-6">
        <UserCard user={session?.user} />
      </section>

      {/* 
      <section className="p-4 text-slate-300">
        <h3 className="mb-2 font-semibold text-lg">{msg.my_goal}</h3>
        <div className="mb-2 mt-4 text-sm text capitalize">
          {msg.minutes_per_day}
        </div>
        <input
          onChange={handleMinutesGoalChange}
          type="range"
          min={1}
          max={5}
          value={userMinutesGoal}
          className="range range-xs range-info"
          step={1}
        />
        <div className="w-full flex justify-between text-sm px-2">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <h2 className="py-1 pl-2 text-gray-500">{msg.badge_goal_progress}</h2>
        <div className="bg-white pl-2 py-3">
          <progress
            className="progress progress-primary w-56"
            value={gameLengthTotal}
            max={userMinutesGoal * DAYS_IN_WEEK}
          ></progress>
          <span className="text-gray-500 pl-4">
            {gameLengthTotal} of {userMinutesGoal * DAYS_IN_WEEK} completed
          </span>
        </div>
      </section>
       */}
    </>
  );
}
