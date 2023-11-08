"use client";

import UserCard from "@/app/components/user/UserCard";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import WeeklyGoal from "../components/history/WeeklyGoal";

export default function UserProfile() {
  const { breathSessionData, userMinutesGoal, setUserMinutesGoal } =
    useBreathSessionStore();

  // Check if visitor is logged in
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/game");
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

      <WeeklyGoal
        handleMinutesGoalChange={handleMinutesGoalChange}
        gameLengthTotal={gameLengthTotal}
        userMinutesGoal={userMinutesGoal}
      />
    </>
  );
}
