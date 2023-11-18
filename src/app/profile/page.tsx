"use client";

import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import UserCard from "@/app/components/user/UserCard";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import useFetchProfileData from "@/app/hooks/useFetchProfileData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import WeeklyGoal from "../components/history/WeeklyGoal";

export default function UserProfile() {
  const router = useRouter();
  const handleBack = () => router.back();
  const { userMinutesGoal, setUserMinutesGoal } = useBreathSessionStore();
  const { gameLengthCount, isLoading, error } = useFetchProfileData();

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

  return (
    <>
      <button onClick={handleBack} className="my-2 btn btn-sm btn-link">
        <NavArrowBackIcon
          className="inline-block fill-sky-300"
          width={32}
          height={32}
        />
      </button>

      <section className="flex flex-col gap-6 bg-sky-300/80">
        <UserCard user={session?.user} />
      </section>

      {error && (
        <div className="alert alert-error mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{`Error: ${error}`}</span>
        </div>
      )}
      {isLoading ? (
        <div className="pl-3 pt-6 text-center">
          <span className="loading text-info loading-spinner"></span>
        </div>
      ) : (
        <WeeklyGoal
          handleMinutesGoalChange={handleMinutesGoalChange}
          gameLengthTotal={gameLengthCount.gameLength}
          userMinutesGoal={userMinutesGoal}
        />
      )}
    </>
  );
}
