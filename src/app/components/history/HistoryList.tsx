"use client";

import RarrowIcon from "@/app/components/svg/RarrowIcon";
import { msg } from "@/app/i18n/frog-msg";
import { BreathSessionData } from "@/app/types";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import userMeasure from "react-use-measure";

async function dbGetSessionData() {
  const res = await fetch("/history/api");
  return res.json();
}

export default function HistoryList() {
  let transition = { type: "ease", duration: 0.5, ease: "easeInOut" };
  let [ref, bounds] = userMeasure();

  // Check if visitor is logged in
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const [breathSessionData, setBreathSessionData] = useState<
    BreathSessionData[]
  >([]);

  function calculateBreathRate(session: BreathSessionData) {
    const { gameLength, cycleCount } = session;
    return Math.floor(cycleCount / gameLength);
  }

  useEffect(() => {
    let isCancelled = false;

    dbGetSessionData().then((data) => {
      if (isCancelled) return;
      setBreathSessionData(data);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <MotionConfig transition={transition}>
      <div className="w-full bg-gray-400 text-left opacity-80">
        <h2 className="p-2 text-2xl text-gray-800">{msg.your_sessions}</h2>
        <div className="flex bg-gray-300 font-semibold text-gray-500">
          <div className="h-7 w-5/12 pl-2">{msg.date}</div>
          <div className="h-7 w-3/12">{msg.rate}</div>
          <div className="h-7 w-2/12">{msg.mins}</div>
          <div className="h-7 w-2/12"></div>
        </div>
        <motion.div
          animate={{ height: bounds.height > 0 ? bounds.height : 0 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
        >
          {breathSessionData && breathSessionData.length > 0 && (
            <div ref={ref}>
              <AnimatePresence mode="sync">
                {breathSessionData
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .map((session) => (
                    <Link
                      key={session.createdAt}
                      href={`/history/session/${DateTime.fromISO(
                        session.createdAt,
                      )}?data=${JSON.stringify(session)}`}
                    >
                      <div
                        key={session.createdAt}
                        className="flex border border-b-0 border-slate-400 bg-gray-200 py-1 text-gray-500"
                      >
                        <div className="h-7 w-5/12 pl-2">
                          {DateTime.fromISO(session.createdAt).toLocaleString()}
                        </div>
                        <div className="h-7 w-3/12">
                          {calculateBreathRate({
                            gameName: session.gameName,
                            createdAt: session.createdAt,
                            inhaleTimes: session.inhaleTimes,
                            cycleCount: session.cycleCount,
                            gameLength: session.gameLength,
                          })}{" "}
                          {msg.bpm}
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
      {/* <div className="flex pt-5 pl-4 md:pl-0">
        <button
          onClick={}
          className="btn btn-sm btn-outline btn-error"
        >
          {msg.delete_history}
        </button>
      </div> */}
    </MotionConfig>
  );
}
