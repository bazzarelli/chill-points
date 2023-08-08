"use client";

import BreathCountDots from "@/app/components/BreathCountDots";
import CountdownTimer from "@/app/components/CountdownTimer";
import HelpModal from "@/app/components/HelpModal";
import InfoIcon from "@/app/components/svg/InfoIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { frogMsg } from "@/app/resources/frog-msg";
import { inter } from "@/app/utils/fonts";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLongPress } from "use-long-press";

const BOX_ANIM = {
  GROW: {
    bgColor: "rgb(125, 211, 252)",
    height: "12rem",
    opacity: 0.8,
  },
  SHRINK: {
    bgColor: "#43AA8B",
    height: "0.4rem",
    opacity: 0.2,
  },
  CANCEL: {
    bgColor: "rgb(255, 0, 0)",
    height: "0.4rem",
    opacity: 0.5,
  },
  START: {
    bgColor: "rgb(125, 211, 252)",
    height: "0.4rem",
    opacity: 0.2,
  },
} as const;

type ObjectValues<T> = T[keyof T];
type BoxAnim = ObjectValues<typeof BOX_ANIM>;

export default function Page() {
  const [boxscope, animate] = useAnimate();
  const hasStartedSession = useRef(false);
  const isCancelled = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bannerText, setBannerText] = useState(frogMsg.welcome);
  const [key, setKey] = useState(0);
  const setInhaleTimes = useBreathSessionStore((state) => state.setInhaleTimes);
  // const getInhaleTimes = useBreathSessionStore((state) => state.inhaleTimes);
  const getCycleCount = useBreathSessionStore((state) => state.cycleCount);
  const incrementCycleCount = useBreathSessionStore(
    (state) => state.incrementCycleCount,
  );
  const resetCycleCount = useBreathSessionStore(
    (state) => state.resetCycleCount,
  );
  const setSessionsData = useBreathSessionStore(
    (state) => state.setSessionsData,
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
    resetGame();
  }, []);

  function boxAnimation(duration: number, boxAnim: BoxAnim) {
    animate(boxscope.current, { ...boxAnim }, { duration: duration });
  }

  function onFrogTapStart() {
    // only fire once to start the timer
    if (!hasStartedSession.current) {
      setIsPlaying(true);
    }

    setBannerText(frogMsg.inhale);
    setInhaleTimes(Date.now());

    // frog box animation
    boxAnimation(5, BOX_ANIM.GROW);
    isCancelled.current = false;
    hasStartedSession.current = true;
  }

  function onFrogTapRelease() {
    setBannerText(frogMsg.exhale);
    setInhaleTimes(0);
    incrementCycleCount();
    // frog box animation
    boxAnimation(5, BOX_ANIM.SHRINK);
  }

  function onFrogTapCancel() {
    console.log("Press cancelled cycle count: ", getCycleCount);
    setBannerText(frogMsg.cancelled);
    setIsPlaying(false);
    resetCycleCount();
    isCancelled.current = true;
    // frog box animation
    boxAnimation(5, BOX_ANIM.CANCEL);
  }

  function startOver() {
    console.log("startOver");
    //! check isCancelled
    // setKey resets the clock
    setKey((prevKey) => prevKey + 1);
    // frog box animation
    boxAnimation(5, BOX_ANIM.START);
    isCancelled.current = false;
    resetGame();
  }

  const callback = useCallback((event: any) => {
    console.log("Long pressed!");
  }, []);

  const bind = useLongPress(callback, {
    onStart: (event) => onFrogTapStart(),
    onFinish: (event) => onFrogTapRelease(),
    onCancel: (event) => onFrogTapCancel(), // called if long press is aborted (touch is released before the threshold)
    onMove: (event) => console.log("Detected mouse or touch movement"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 2000, // Time threshold before long press callback is fired
    captureEvent: true,
    cancelOnMovement: false,
  });

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
            <CountdownTimer isPlaying={isPlaying} duration={60} key={key} />
          </div>
        </div>
        <div className="my-3 h-6 w-full text-center">
          {getCycleCount ? (
            <BreathCountDots />
          ) : (
            <button onClick={startOver} className="text-xl text-sky-300/80">
              {isCancelled.current ? "Start over?" : ""}
            </button>
          )}
        </div>

        {/* THE FROG */}
        <button
          {...bind()}
          className="relative mx-auto h-48 w-64 bg-[url(/images/buddha-belly-frog-sm.webp)] bg-contain bg-center bg-no-repeat"
          id="frog-box"
        >
          <div
            ref={boxscope}
            className="absolute bottom-0 left-0 right-0 h-1 bg-sky-300/50"
          ></div>
        </button>
      </div>

      <div className="w-full text-center mt-4 text-white">
        {!hasStartedSession.current ? (
          <Link href="/history">
            <button className="btn btn-sm btn-secondary">view history</button>
          </Link>
        ) : (
          <span>{`hasStartedSession: ${hasStartedSession.current}`}</span>
        )}
      </div>

      <HelpModal />
    </section>
  );
}
