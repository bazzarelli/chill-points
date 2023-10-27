"use client";

// Remember you must use an AuthProvider from
// client components to useSession
import UserCard from "@/app/components/user/UserCard";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function UserProfile() {
  const { userMinutesGoal, setUserMinutesGoal } = useBreathSessionStore();
  const [minutesGoal, setMinutesGoal] = useState(userMinutesGoal);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  function handleMinutesGoalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const goalLength = parseInt(event.target.value, 10);
    setMinutesGoal(goalLength); // update the UI
    setUserMinutesGoal(goalLength); // update the state
  }

  return (
    <>
      <section className="flex flex-col gap-6">
        <UserCard user={session?.user} />
      </section>
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
          value={minutesGoal}
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
      </section>
    </>
  );
}
