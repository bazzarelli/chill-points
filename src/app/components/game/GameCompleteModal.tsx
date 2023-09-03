"use client";

import Badge from "@/app/components/game/Badge";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GameCompleteModal() {
  const { cycleCount, userGameLength, gameName, dotCountTotal } =
    useBreathSessionStore();
  const [isWorthy, setIsWorthy] = useState(false);

  useEffect(() => {
    if (cycleCount / dotCountTotal > 0.8) {
      setIsWorthy(true);
    }
  }, [cycleCount, dotCountTotal]);

  return (
    <dialog id="game_complete_modal" className="modal text-left">
      <form method="dialog" className="modal-box bg-sky-300/90 rounded-md">
        {cycleCount > 0 && (
          <>
            <h2 className="text-xl text-slate-800 col-span-6">{`${gameName} exercise`}</h2>
            <section className="my-2">
              {isWorthy ? <Badge time={userGameLength} /> : <Badge time={0} />}
            </section>
            <p className="text-slate-800">
              {userGameLength}{" "}
              {userGameLength > 1
                ? msg.chillpoints_earned
                : msg.chillpoint_earned}
            </p>
            {/* <p className="text-slate-800">
              {cycleCount} {msg.breath_cycles_completed}
            </p> */}
            <button className="border-slate-800/70 border-2 px-2 py-1 mt-2 rounded-lg text-sm text-slate-800 bg-sky-200/50">
              <Link href="/history">{msg.view_history}</Link>
            </button>
          </>
        )}
      </form>
      <form method="dialog" className="modal-backdrop bg-slate-950/30">
        <button>close</button>
      </form>
    </dialog>
  );
}
