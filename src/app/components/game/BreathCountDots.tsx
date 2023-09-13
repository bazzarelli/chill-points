import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { motion } from "framer-motion";
import { useEffect } from "react";

function BreathCountDots() {
  const {
    cycleCount,
    userCycleSpeed,
    userGameLength,
    dotCountTotal,
    setDotCountTotal,
  } = useBreathSessionStore();
  const breathCycleDotFull = () => (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="opacity-80 text-xs"
    >
      ⚪️
    </motion.span>
  );
  const breathCycleDotEmpty = () => (
    <span className="text-slate-100/40 text-xs">◯</span>
  );

  useEffect(() => {
    const gameLengthSecs = userGameLength * 60;
    const calculatedDotCount = Math.floor(
      gameLengthSecs / (userCycleSpeed * 2),
    );
    setDotCountTotal(calculatedDotCount);
  }, [userCycleSpeed, userGameLength]);

  return (
    <div className="w-fit border border-slate-700/30 mx-auto pl-2 pb-1 bg-slate-800/30 rounded-md shadow-lg">
      {Array.from({ length: dotCountTotal }).map((_, index) => {
        const isFull = index < cycleCount;
        const dot = isFull ? breathCycleDotFull() : breathCycleDotEmpty();

        return (
          <span key={index} className="mr-2 inline-block">
            {dot}
          </span>
        );
      })}
    </div>
  );
}

export default BreathCountDots;
