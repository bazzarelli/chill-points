"use client"

import { useEffect, useState, useRef, use } from "react";
import { motion, useAnimate } from "framer-motion";
import { inter } from "@/app/utils/fonts";
import { frogMsg } from "@/app/resources/frog-msg";
import CountdownTimer from "@/app/components/CountdownTimer";
import HelpModal from "@/app/components/HelpModal";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import InfoIcon from "@/app/components/svg/InfoIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import BreathCountDots from "@/app/components/BreathCountDots";

export default function Page() {
    const [boxscope, animate] = useAnimate();
    const [isPlaying, setIsPlaying] = useState(false);
    const hasStartedSession = useRef(false);
    const hasEndedSession = useRef(false);
    const [bannerText, setBannerText] = useState(frogMsg.welcome);
    const setInhaleTimes = useBreathSessionStore(state => state.setInhaleTimes);    
    const incrementCycleCount = useBreathSessionStore(state => state.incrementCycleCount);
    const isBreathSessionComplete = useBreathSessionStore(state => state.isComplete);
    if (isBreathSessionComplete) {
        hasEndedSession.current = true;
    }

    useEffect(() => {
        if (hasEndedSession.current) {
            setBannerText(frogMsg.finished);
        }
    }, [hasEndedSession.current]);

    // util to disable some long press browser defaults
    useEffect(() => {
        onContextMenuListener();
    }, []);

    function onFrogTapStart() {
        // only fire once to start the timer
        if (!hasStartedSession.current) {
            setIsPlaying(true);
        }

        setBannerText(frogMsg.inhale);
        setInhaleTimes(Date.now());

        // frog box animation
        animate(boxscope.current, {
            height: "12rem",
            backgroundColor: "rgb(125 211 252)",
            opacity: 0.8
        }, { duration: 5 });
        hasStartedSession.current = true;
    }

    function onFrogTapRelease() {
        setBannerText(frogMsg.exhale);
        setInhaleTimes(0);
        incrementCycleCount();

        // frog box animation
        animate(boxscope.current, {
            height: "0.4rem",
            backgroundColor: "rgb(255 0 0)",
            opacity: 0.2
        }, { duration: 5 });
    }

    return (
        <section className={`${inter.className} flex flex-wrap text-slate-900  text-center`}>
            <div className="w-full touch-none bg-gradient-to-b from-slate-700 via-sky-600 via-70% to-slate-700/20">
                <div className="md:w-1/3 mx-auto">
                    <button className="w-full text-right" onClick={() => (window as any).help_modal.showModal()}>
                        <InfoIcon className="inline-block mt-3 mr-4" width={28} height={28} fill={`#afe3fa`} />
                    </button>
                    <motion.h3
                        className="text-sky-300/70 text-2xl mb-4 opacity-0"
                        animate={{ opacity: 1 }}
                    >
                        {bannerText}
                    </motion.h3>
                    <div className="w-40 h-40 mx-auto">
                        <CountdownTimer isPlaying={isPlaying} duration={60} />
                    </div>
                </div>
                <BreathCountDots />
                {/* FROG TAP TARGET */}
                <motion.div
                    onPointerDown={onFrogTapStart}
                    onPointerUp={onFrogTapRelease}
                    className="relative w-64 h-48 mx-auto bg-[url(/images/buddha-belly-frog-sm.webp)] bg-center bg-contain bg-no-repeat"
                    id="frog-box"
                >
                    <div ref={boxscope} className="absolute bottom-0 left-0 right-0 h-0"></div>
                </motion.div>
            </div>
            <HelpModal />
        </section>

    );
}
