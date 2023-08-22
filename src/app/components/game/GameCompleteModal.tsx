"use client";

import SnowflakeIcon from "@/app/components/svg/SnowflakeIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";

export default function HelpModal() {
  const { sessionsData } = useBreathSessionStore();

  function breathCycleCount() {
    return sessionsData.length > 0
      ? sessionsData[sessionsData.length - 1].cycleCount
      : 0;
  }

  function chillPointsCount() {
    return sessionsData.length > 0
      ? sessionsData[sessionsData.length - 1].minutes
      : 0;
  }

  return (
    <dialog id="game_complete_modal" className="modal text-left">
      <form method="dialog" className="modal-box bg-sky-300/90">
        {breathCycleCount() > 0 && (
          <div className="grid grid-cols-6 gap-4 gap-x-0">
            <button className="btn btn-sm btn-circle text-slate-200 border-none text-xl font-semibold bg-sky-700/80 mr-2">
              {breathCycleCount()}
            </button>
            <span className="text-lg text-slate-800 col-span-5">
              {msg.breath_cycles_completed}
            </span>
            <button className="btn btn-sm btn-circle ring-2 ring-sky-500 border-none  bg-gradient-to-b from-sky-500 to-sky-300 mr-2">
              <SnowflakeIcon width={32} height={32} fill={`rgb(226 232 240)`} />
            </button>
            <span className="text-lg text-slate-800 col-span-5">
              {chillPointsCount()}{" "}
              {chillPointsCount() > 1
                ? msg.chillpoints_earned
                : msg.chillpoint_earned}
            </span>
          </div>
        )}
      </form>
      <form method="dialog" className="modal-backdrop bg-slate-950/40">
        <button>close</button>
      </form>
    </dialog>
  );
}
