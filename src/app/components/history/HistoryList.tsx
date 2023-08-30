"use client";

import RarrowIcon from "@/app/components/svg/RarrowIcon";
import { msg } from "@/app/i18n/frog-msg";
import { isoDateToLocale } from "@/app/utils/time";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import userMeasure from "react-use-measure";

type SessionData = {
  id: number;
  gameName: string;
  inhaleTimes: number[];
  cycleCount: number;
  gameLength: number;
  createdAt: string;
};

export default function HistoryList() {
  let transition = { type: "ease", duration: 0.5, ease: "easeInOut" };
  let [ref, bounds] = userMeasure();
  const [sessionData, setSessionData] = useState<SessionData[]>([]);

  async function dbGetSessionData() {
    const res = await fetch("/game/api", {
      method: "GET",
    });
    return res.json();
  }

  async function dbDeleteSessionData() {
    const res = await fetch("/game/api", {
      method: "DELETE",
    });
    const data = await res.json();
    setSessionData(data);
    return data;
  }

  function calculateBreathRate(session: SessionData) {
    const { gameLength, cycleCount } = session;
    return Math.floor(cycleCount / gameLength);
  }

  useEffect(() => {
    dbGetSessionData().then((data) => {
      setSessionData(data);
    });
  }, []);

  return (
    <MotionConfig transition={transition}>
      <div className="w-full bg-gray-400 text-left opacity-80">
        <h2 className="p-2 text-2xl text-gray-800">{msg.your_sessions}</h2>
        <div className="flex bg-gray-300 font-semibold text-gray-500">
          <div className="h-7 w-5/12 pl-2">{msg.date}</div>
          <div className="h-7 w-3/12">{msg.rate}</div>
          <div className="h-7 w-2/12">{msg.points}</div>
          <div className="h-7 w-2/12"></div>
        </div>
        <motion.div
          animate={{ height: bounds.height > 0 ? bounds.height : 0 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
        >
          {sessionData && sessionData.length > 0 && (
            <div ref={ref}>
              <AnimatePresence mode="sync">
                {sessionData.map((session: SessionData) => (
                  <Link
                    key={session.id}
                    href={`/history/session/${session.id}?data=${JSON.stringify(
                      session,
                    )}`}
                  >
                    <div
                      key={session.id}
                      className="flex border border-b-0 border-slate-400 bg-gray-200 py-1 text-gray-500"
                    >
                      <div className="h-7 w-5/12 pl-2">
                        {isoDateToLocale(session.createdAt)}
                      </div>
                      <div className="h-7 w-3/12">
                        {calculateBreathRate(session)} {msg.bpm}
                      </div>
                      <div className="h-7 w-2/12">{session.gameLength}</div>
                      <div className="h-7 w-2/12 pr-2 text-right">
                        <RarrowIcon
                          className="inline-block"
                          width={15}
                          height={15}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
      <div className="flex pt-5 pl-4 md:pl-0">
        <button
          onClick={dbDeleteSessionData}
          className="btn btn-sm btn-outline btn-error"
        >
          {msg.delete_history}
        </button>
      </div>
    </MotionConfig>
  );
}
