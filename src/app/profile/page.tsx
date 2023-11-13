"use client";

import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import UserCard from "@/app/components/user/UserCard";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { GameLengthData } from "@/app/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import WeeklyGoal from "../components/history/WeeklyGoal";

async function dbGetSessionData() {
  const res = await fetch("/profile/api");
  return res.json();
}

export default function UserProfile() {
  const router = useRouter();
  const handleBack = () => router.back();
  const isCancelledRef = useRef(false);
  const { userMinutesGoal, setUserMinutesGoal } = useBreathSessionStore();
  const [gameLengthTotalForWeek, setGameLengthTotalForWeek] =
    useState<GameLengthData>({ gameLength: 0 });

  // Check if visitor is logged in
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/profile");
    },
  });

  function handleMinutesGoalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const goalLength = parseInt(event.target.value, 10);
    setUserMinutesGoal(goalLength);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await dbGetSessionData();
      if (!isCancelledRef.current) {
        setGameLengthTotalForWeek(data);
      }
    };

    fetchData();

    return () => {
      isCancelledRef.current = true;
    };
  }, []);

  return (
    <>
      <button onClick={handleBack} className="my-2 btn btn-sm btn-link">
        <NavArrowBackIcon
          className="inline-block fill-info"
          width={32}
          height={32}
        />
      </button>

      <section className="flex flex-col gap-6 bg-sky-300/80">
        <UserCard user={session?.user} />
      </section>

      <WeeklyGoal
        handleMinutesGoalChange={handleMinutesGoalChange}
        gameLengthTotal={gameLengthTotalForWeek.gameLength}
        userMinutesGoal={userMinutesGoal}
      />
    </>
  );
}
