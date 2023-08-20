"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";

export default function HelpModal() {
  const { sessionsData } = useBreathSessionStore();

  function breathCycleCount() {
    return sessionsData.length > 0
      ? sessionsData[sessionsData.length - 1].cycleCount
      : 0;
  }

  return (
    <dialog id="game_complete_modal" className="modal text-left">
      <form method="dialog" className="modal-box bg-sky-300/90">
        {breathCycleCount() > 0 && (
          <section>
            <button className="btn btn-circle text-slate-200 border-none text-2xl font-semibold bg-sky-700/80 mr-2">
              {breathCycleCount()}
            </button>
            <span className="text-lg text-slate-800">
              {msg.breath_cycles_completed}
            </span>
          </section>
        )}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
