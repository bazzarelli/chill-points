"use client";

import HistoryListRow from "@/app/components/game/HistoryListRow";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import userMeasure from "react-use-measure";

// import RarrowIcon from "@/app/components/svg/RarrowIcon";

export default function HistoryList() {
  const sessionsData = useBreathSessionStore((state) => state.sessionsData);
  let transition = { type: "ease", duration: 0.5, ease: "easeInOut" };
  let [ref, bounds] = userMeasure();

  return (
    <MotionConfig transition={transition}>
      <div className="mx-auto w-full bg-gray-400 text-left opacity-80 md:w-1/2  lg:w-1/3">
        <h2 className="p-2 text-2xl text-gray-800">Your sessions</h2>
        <div className="flex bg-gray-300 font-semibold text-gray-500">
          <div className="h-7 w-1/2 pl-2">Date</div>
          <div className="h-7 w-1/2 pr-2">respiratory rate</div>
        </div>
        <motion.div
          animate={{ height: bounds.height > 0 ? bounds.height : 0 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
        >
          <div ref={ref}>
            <AnimatePresence mode="popLayout">
              {sessionsData.map((session) => (
                <div
                  key={session.id}
                  className="flex border border-b-0 border-slate-400 bg-gray-200 py-1 text-gray-500"
                >
                  <div className="h-5 w-6/12 pl-2">{session.date}</div>
                  <div className="h-5 w-5/12 pl-2">
                    {session.cycleCount} bpm
                  </div>
                  <div className="h-5 w-1/12">
                    {/* <RarrowIcon className="inline-block" width={15} height={15} /> */}
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
