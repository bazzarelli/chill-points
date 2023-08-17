"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const { sessionsData, resetGame } = useBreathSessionStore();
  const [modalOpen, setModalOpen] = useState(true);

  function breathCycleCount() {
    return sessionsData.length > 0
      ? sessionsData[sessionsData.length - 1].cycleCount
      : 0;
  }

  return (
    <dialog
      id="game_complete_modal"
      className={`modal text-left {modalOpen && "modal-open"}`}
    >
      <motion.form
        method="dialog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="modal-box bg-sky-300/80"
      >
        <h3 className="text-lg text-slate-800">Session complete</h3>

        {breathCycleCount() > 0 && (
          <section className="mb-4">
            <span className=" text-sm text-slate-800">
              {breathCycleCount()} breath cycles in one minute
            </span>
          </section>
        )}

        <section className="mb-4">
          <button
            onClick={() => {
              setModalOpen(false);
              resetGame();
            }}
          >
            <span className="text-slate-800 underline">{msg.replay}</span>
          </button>
        </section>

        <section className="mb-4">
          <Link href="/history">
            <span className="text-slate-800 underline">{msg.view_history}</span>
          </Link>
        </section>
      </motion.form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
