"use client";

import Badge from "@/app/components/game/Badge";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import Link from "next/link";
import { useEffect, useState } from "react";

import BreathSessionGraph from "../history/BreathSessionGraph";

export default function GameCompleteModal() {
  const {
    cycleCount,
    userGameLength,
    gameName,
    dotCountTotal,
    breathSessionData,
  } = useBreathSessionStore();
  const [isWorthy, setIsWorthy] = useState(false);

  useEffect(() => {
    if (cycleCount / dotCountTotal > 0.8) {
      setIsWorthy(true);
    }
  }, [cycleCount, dotCountTotal]);

  return (
    <>
      {cycleCount && (
        <div className="relative bg-gradient-to-b from-slate-700 via-sky-600 via-40% to-slate-700 p-6 w-full text-slate-300 text-left">
          <section className="mb-4 text-center">
            {isWorthy ? <Badge time={userGameLength} /> : <Badge time={0} />}
          </section>
          <h2 className="text-lg">{`${gameName} ${msg.exercise_completed}`}</h2>
          <p>
            {userGameLength} {msg.badge_earned}
          </p>
          <p>
            {cycleCount} {msg.breath_cycles_completed}
          </p>
          {breathSessionData.length ? (
            <div className="relative -left-6">
              <BreathSessionGraph data={breathSessionData[0].inhaleTimes} />
            </div>
          ) : (
            <div>
              <progress className="progress progress-info w-56"></progress>
            </div>
          )}
          <button className="border-slate-800/70 border-2 px-2 py-1 mt-5 rounded-lg text-sm text-slate-800 bg-sky-200/80">
            <Link href="/history">{msg.view_history}</Link>
          </button>
        </div>
      )}
    </>
  );
}
