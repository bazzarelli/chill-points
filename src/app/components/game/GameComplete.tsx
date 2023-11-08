"use client";

import BreathSessionGraph from "@/app/components/history/BreathSessionGraph";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import calculateInhaleTimeDiff from "@/app/utils/calculateInhaleTimeDiff";
// import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GameCompleteModal() {
  // const { data: session, status } = useSession();
  const { cycleCount, userGameLength, gameName, inhaleTimes } =
    useBreathSessionStore();

  return (
    <>
      {cycleCount && (
        <div className="relative bg-gradient-to-b from-slate-700 via-sky-600 via-40% to-slate-700 p-6 w-full text-slate-300 text-left">
          <h2 className="text-lg">{`${gameName} ${msg.exercise}`}</h2>
          <p>
            {userGameLength} {msg.badge_earned}
          </p>
          <p>
            {cycleCount} {msg.breath_cycles_completed}
          </p>
          {inhaleTimes ? (
            <div className="relative -left-6">
              <BreathSessionGraph data={calculateInhaleTimeDiff(inhaleTimes)} />
            </div>
          ) : (
            <div>
              <progress className="progress progress-info w-56"></progress>
            </div>
          )}
          <div className="flex justify-between">
            <button className="border-orange-400/80 border-2 px-2 py-1 my-5 rounded-lg text-sm text-slate-800 bg-fuchsia-200/80">
              <Link href="/survey">Feedback</Link>
            </button>
            {/* {status === "authenticated" && (
              <button className="border-slate-800/70 border-2 px-2 py-1 my-5 rounded-lg text-sm text-slate-800 bg-sky-200/80">
                <Link href="/history">{msg.view_history}</Link>
              </button>
            )} */}
          </div>
        </div>
      )}
    </>
  );
}
