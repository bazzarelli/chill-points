import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { motion } from "framer-motion";

function BreathCountDots() {
  const { cycleCount, cycleSpeed, gameLength } = useBreathSessionStore();
  const breathCycleDotFull = () => (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="opacity-80"
    >
      ⚪️
    </motion.span>
  );
  const breathCycleDotEmpty = () => (
    <span className="text-base text-slate-100/30">◯</span>
  );
  const gameLengthSecs = gameLength * 60;
  const finalDotCount = Math.floor(gameLengthSecs / (cycleSpeed * 2));

  return (
    <div className="w-fit border border-slate-700/30 mx-auto pl-2 py-1 bg-slate-800/30 rounded-md shadow-lg">
      {Array.from({ length: finalDotCount }).map((_, index) => {
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
