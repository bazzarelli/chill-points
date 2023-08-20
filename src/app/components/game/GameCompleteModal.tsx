"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { motion } from "framer-motion";

export default function HelpModal() {
  const { sessionsData } = useBreathSessionStore();

  function breathCycleCount() {
    return sessionsData.length > 0
      ? sessionsData[sessionsData.length - 1].cycleCount
      : 0;
  }

  return (
    <dialog id="game_complete_modal" className="modal text-left">
      <motion.form
        method="dialog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="modal-box bg-sky-300/90"
      >
        {breathCycleCount() > 0 && (
          <section className="mb-4">
            <button className="btn btn-circle text-slate-200 border-none text-2xl font-semibold bg-sky-700/80 mr-1">
              {breathCycleCount()}
            </button>
            <span className="text-lg text-slate-800">
              {msg.breath_cycles_completed}
            </span>
          </section>
        )}
      </motion.form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
