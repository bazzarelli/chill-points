"use client";

import BreathSessionGraph from "@/app/components/history/BreathSessionGraph";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import Link from "next/link";

export default function GameCompleteModal() {
  const { cycleCount, userGameLength, gameName, breathSessionData } =
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
          {breathSessionData.length ? (
            <div className="relative -left-6">
              <BreathSessionGraph
                data={
                  breathSessionData[breathSessionData.length - 1].inhaleTimes
                }
              />
            </div>
          ) : (
            <div>
              <progress className="progress progress-info w-56"></progress>
            </div>
          )}
          <div className="flex justify-between">
            {/* <button className="border-slate-800/70 border-2 px-2 py-1 my-5 rounded-lg text-sm text-slate-800 bg-sky-200/80">
              <Link href="/history">{msg.view_history}</Link>
            </button> */}
            <button className="border-slate-800/70 border-2 px-2 py-1 my-5 rounded-lg text-sm text-slate-800 bg-fuchsia-200/80">
              <Link href="/survey">Feedback</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
