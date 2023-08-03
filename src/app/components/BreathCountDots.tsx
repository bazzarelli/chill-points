import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { motion } from "framer-motion";

function BreathCountDots() {
  const cycleCount = useBreathSessionStore((state) => state.cycleCount);
  const breathCycleDot = "⚪️";

  return (
    <div className="my-3 h-6 w-full text-center">
      {Array.from({ length: cycleCount }).map((_, index) => (
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.9,
          }}
          transition={{ duration: 3.5 }}
          key={index}
          className="mr-2"
        >
          {breathCycleDot}
        </motion.span>
      ))}
    </div>
  );
}

export default BreathCountDots;
