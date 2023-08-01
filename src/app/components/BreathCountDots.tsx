import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { motion } from "framer-motion";


function BreathCountDots() {
    const cycleCount = useBreathSessionStore(state => state.cycleCount);
    const breathCycleDot = "⚪️";

    return (
        <div className="w-full h-6 text-center my-3">
            {Array.from({ length: cycleCount }).map((_, index) =>
                <motion.span 
                    initial={{ 
                        opacity: 0,
                    }}
                    animate={{ 
                        opacity: 0.8,
                    }}
                    transition={{ duration: 3.5 }}
                    key={index}
                    className="mr-2"
                >
                    {breathCycleDot}
                </motion.span>
            )}
        </div>
    )
}

export default BreathCountDots;