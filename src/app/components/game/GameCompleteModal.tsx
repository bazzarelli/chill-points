"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HelpModal() {
  const { sessionsData } = useBreathSessionStore();
  const [modalOpen, setModalOpen] = useState(true);

  function breathCycleCount() {
    return sessionsData.length > 0
      ? sessionsData[sessionsData.length - 1].cycleCount
      : 0;
  }

  const router = useRouter();
  const handleRefresh = () => router.refresh();

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
        {breathCycleCount() > 0 && (
          <section className="mb-4">
            <button className="btn btn-circle text-slate-200 border-none text-2xl font-semibold bg-sky-700/80 mr-1">
              {breathCycleCount()}
            </button>
            <span className="text-lg text-slate-800">
              breath cycles completed
            </span>
          </section>
        )}

        <section className="mb-4">
          <button
            className="btn btn-outline btn-sm border-slate-800 text-slate-800"
            onClick={() => {
              handleRefresh();
              setModalOpen(false);
            }}
          >
            {msg.replay}
          </button>
        </section>

        <section className="mb-4">
          <Link href="/history">
            <button className="btn btn-outline btn-sm border-slate-800 text-slate-800">
              {msg.view_history}
            </button>
          </Link>
        </section>
      </motion.form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
