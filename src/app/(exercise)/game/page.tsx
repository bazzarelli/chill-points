"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import { inter } from "@/app/utils/fonts";
import { frogMsg } from "@/app/resources/frog-msg";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import CountdownTimer from "@/app/components/CountdownTimer";
import HelpModal from "@/app/components/HelpModal";
import InfoIcon from "@/app/components/svg/InfoIcon";
import BreathCountDots from "@/app/components/BreathCountDots";
import HistoryList from "@/app/components/HistoryList";

export default function Page() {
  const [boxscope, animate] = useAnimate();
  const hasStartedSession = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bannerText, setBannerText] = useState(frogMsg.welcome);
  const setInhaleTimes = useBreathSessionStore((state) => state.setInhaleTimes);
  const setSessionsData = useBreathSessionStore(
    (state) => state.setSessionsData,
  );
  const incrementCycleCount = useBreathSessionStore(
    (state) => state.incrementCycleCount,
  );
  const resetGame = useBreathSessionStore((state) => state.resetGame);

  // checking if the session is complete
  const isBreathSessionComplete = useBreathSessionStore(
    (state) => state.isComplete,
  );

  useEffect(() => {
    if (isBreathSessionComplete) {
      console.log("isBreathSessionComplete", isBreathSessionComplete);
      setBannerText(frogMsg.finished);
      // save the session data
      setSessionsData();
      // reset the game for next play
      resetGame();
      hasStartedSession.current = false;
    }
  }, [isBreathSessionComplete]);

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
    animate(
      boxscope.current,
      {
        height: "12rem",
        backgroundColor: "rgb(125 211 252)",
        opacity: 0.8,
      },
      { duration: 5 },
    );
    hasStartedSession.current = true;
  }

  function onFrogTapRelease() {
    setBannerText(frogMsg.exhale);
    setInhaleTimes(0);
    incrementCycleCount();

    // frog box animation
    animate(
      boxscope.current,
      {
        height: "0.4rem",
        backgroundColor: "rgb(255 0 0)",
        opacity: 0.2,
      },
      { duration: 5 },
    );
  }

  return (
    <section
      className={`${inter.className} flex flex-wrap text-center  text-slate-900`}
    >
      <div className="w-full touch-none bg-gradient-to-b from-slate-700 via-sky-600 via-70% to-slate-700/20">
        <div className="mx-auto md:w-1/3">
          <button
            className="w-full text-right"
            onClick={() => {
              resetGame();
              (window as any).help_modal.showModal();
            }}
          >
            <InfoIcon
              className="mr-4 mt-3 inline-block"
              width={28}
              height={28}
              fill={`#afe3fa`}
            />
          </button>
          <motion.h3
            className="mb-4 text-2xl text-sky-300/70 opacity-0"
            animate={{ opacity: 1 }}
          >
            {bannerText}
          </motion.h3>
          <div className="mx-auto h-40 w-40">
            <CountdownTimer isPlaying={isPlaying} duration={60} />
          </div>
        </div>
        <BreathCountDots />
        {/* FROG TAP TARGET */}
        <motion.div
          onPointerDown={onFrogTapStart}
          onPointerUp={onFrogTapRelease}
          className="relative mx-auto h-48 w-64 bg-[url(/images/buddha-belly-frog-sm.webp)] bg-contain bg-center bg-no-repeat"
          id="frog-box"
        >
          <div
            ref={boxscope}
            className="absolute bottom-0 left-0 right-0 h-0"
          ></div>
        </motion.div>
      </div>
      <HelpModal />
      <HistoryList />
    </section>
  );
}
