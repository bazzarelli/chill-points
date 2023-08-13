"use client";

import BreathCountDots from "@/app/components/game/BreathCountDots";
import CountdownTimer from "@/app/components/game/CountdownTimer";
import BOX_ANIM from "@/app/components/game/FrogBoxAnim";
import GameInstructions from "@/app/components/game/GameInstructions";
import HelpModal from "@/app/components/game/HelpModal";
import SettingsIcon from "@/app/components/svg/SettingsIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { frogMsg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LongPressReactEvents, useLongPress } from "use-long-press";

type ObjectValues<T> = T[keyof T];
type BoxAnim = ObjectValues<typeof BOX_ANIM>;

export default function Page() {
  const [boxscope, animate] = useAnimate();
  const [bannerText, setBannerText] = useState(frogMsg.welcome);
  const [clockKey, setClockKey] = useState(0);

  const {
    cycleCount,
    cycleSpeed,
    sessionsData,
    isCancelled,
    isComplete,
    isInProgress,
    incrementCycleCount,
    resetGame,
    resetCycleCount,
    setInhaleTimes,
    setIsInProgressStatus,
    setIsCancelledStatus,
    setSessionsData,
  } = useBreathSessionStore();

  //* things to take care of when the session is complete
  useEffect(() => {
    if (isComplete) {
      setBannerText(frogMsg.finished); // set the banner text
      setSessionsData(); // save the session data
      resetGame(); // reset the game for next play
      setIsInProgressStatus(false); // the session is not in progress
      setClockKey((prevKey) => prevKey + 1); // reset the clock
    }
  }, [isComplete]);

  useEffect(() => {
    // util to disable some long press browser defaults
    onContextMenuListener();
    resetGame();
  }, []);

  async function handleFrogAction(action: string) {
    const boxAnimation = (duration: number, boxAnim: BoxAnim) => {
      animate(boxscope.current, { ...boxAnim }, { duration: duration });
    };

    switch (action) {
      case "start":
        setBannerText(frogMsg.inhale);
        !isInProgress && setClockKey((prevKey) => prevKey + 1);
        setIsInProgressStatus(true);
        setInhaleTimes(Date.now());
        setIsCancelledStatus(false);
        setIsInProgressStatus(true);
        boxAnimation(cycleSpeed, BOX_ANIM.GROW);
        break;
      case "release":
        setInhaleTimes(0);
        incrementCycleCount();
        await boxAnimation(cycleSpeed, BOX_ANIM.SHRINK);
        setTimeout(() => {
          setBannerText(frogMsg.inhale);
        }, cycleSpeed * 1000);
        break;
      case "cancel":
        setBannerText(frogMsg.cancelled);
        setIsInProgressStatus(false);
        resetCycleCount();
        setIsCancelledStatus(true);
        boxAnimation(1, BOX_ANIM.CANCEL);
        break;
      case "reset":
        setIsCancelledStatus(false);
        resetGame();
        setBannerText(frogMsg.welcome);
        setClockKey((prevKey) => prevKey + 1); // key to reset the clock
        setIsInProgressStatus(false);
        boxAnimation(1, BOX_ANIM.RESET);
        break;
      case "disable":
        boxAnimation(1, BOX_ANIM.CANCEL);
        break;
      default:
        break;
    }
  }

  const longPressCallback = useCallback(
    (event: LongPressReactEvents<Element>) => {
      setBannerText(frogMsg.exhale);
    },
    [],
  );

  const bind = useLongPress(longPressCallback, {
    onStart: (event) => {
      isCancelled ? handleFrogAction("disable") : handleFrogAction("start");
    },
    onFinish: (event) => handleFrogAction("release"),
    onCancel: (event) => handleFrogAction("cancel"),
    // onMove: (event) => console.log("Detected mouse or touch movement"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: cycleSpeed * 1000, // Time threshold before long press callback is fired
    captureEvent: true, // Capture event on the target element, not the child elements
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
              handleFrogAction("reset");
              (window as any).help_modal.showModal();
            }}
          >
            <SettingsIcon
              className="mr-4 mt-3 inline-block"
              width={28}
              height={28}
              fill={`#afe3fa`}
            />
          </button>
          <motion.h3
            className={`mb-4 text-2xl ${
              isCancelled ? "text-orange-500/70" : "text-sky-300/70"
            } opacity-0`}
            animate={{ opacity: 1 }}
          >
            {bannerText}
          </motion.h3>
          {/* THE COUNTDOWN CLOCK */}
          <div className="mx-auto h-40 w-40">
            <CountdownTimer
              isPlaying={isInProgress}
              duration={60}
              key={clockKey}
            />
          </div>
        </div>
        {/* THE DOTS */}
        <div className="my-3 h-6 w-full text-center">
          {cycleCount ? (
            <BreathCountDots />
          ) : (
            isCancelled && (
              <button
                onClick={() => handleFrogAction("reset")}
                className="text-xl text-sky-300/80"
              >
                Start over?
              </button>
            )
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

      <div className="w-full text-center mt-4 mx-4">
        {!isInProgress && sessionsData.length > 0 && (
          <Link href="/history">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl mb-4 text-slate-800 btn btn-sm btn-accent"
            >
              view history
            </motion.button>
          </Link>
        )}
        <GameInstructions />
      </div>
      <HelpModal />
    </section>
  );
}
