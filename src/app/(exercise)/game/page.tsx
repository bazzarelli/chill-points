"use client";

import BreathCountDots from "@/app/components/game/BreathCountDots";
import CountdownTimer from "@/app/components/game/CountdownTimer";
import GameCompleteModal from "@/app/components/game/GameCompleteModal";
import SettingsModal from "@/app/components/game/SettingsModal";
import SettingsIcon from "@/app/components/svg/SettingsIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import BOX_ANIM from "@/app/utils/frogBoxAnim";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import { motion, useAnimate } from "framer-motion";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { LongPressReactEvents, useLongPress } from "use-long-press";
import useSound from "use-sound";

type ObjectValues<T> = T[keyof T];
type BoxAnim = ObjectValues<typeof BOX_ANIM>;

export default function Page() {
  const [boxscope, animate] = useAnimate();
  const [bannerText, setBannerText] = useState(msg.welcome);
  const [clockKey, setClockKey] = useState(0);
  const [playBellSound] = useSound("/sounds/notification-bell.mp3");
  const gameOver = useRef(false);

  const {
    cycleCount,
    cycleSpeed,
    gameLength,
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

  //* when the session is complete
  useEffect(() => {
    if (isComplete) {
      // handleFrogAction("cancel");
      setSessionsData(); // save the session data
      (window as any).game_complete_modal.showModal();
      handleFrogAction("reset");
      gameOver.current = true; // set the game over reference
      // setBannerText(msg.finished); // set the banner text
      setIsInProgressStatus(false); // the session is not in progress
    }
  }, [isComplete]);

  useEffect(() => {
    // util to disable some long press browser defaults
    onContextMenuListener();
    handleFrogAction("reset");
    console.log("game page mounted");
  }, []);

  async function handleFrogAction(action: string) {
    const boxAnimation = (duration: number, boxAnim: BoxAnim) => {
      animate(boxscope.current, { ...boxAnim }, { duration: duration });
    };

    switch (action) {
      case "start":
        setBannerText(msg.inhale);
        !isInProgress && setClockKey((prevKey) => prevKey + 1);
        setIsInProgressStatus(true);
        setInhaleTimes(Date.now());
        setIsCancelledStatus(false);
        setIsInProgressStatus(true);
        boxAnimation(cycleSpeed, BOX_ANIM.GROW);
        break;
      case "release":
        setInhaleTimes(Date.now());
        !isComplete && incrementCycleCount();
        await boxAnimation(cycleSpeed, BOX_ANIM.SHRINK);
        playBellSound();
        setTimeout(() => {
          !gameOver.current && setBannerText(msg.inhale);
        }, cycleSpeed * 1000);
        break;
      case "cancel":
        setBannerText(msg.cancelled);
        setIsInProgressStatus(false);
        resetCycleCount();
        setIsCancelledStatus(true);
        boxAnimation(1, BOX_ANIM.CANCEL);
        break;
      case "reset":
        resetGame();
        setIsCancelledStatus(false);
        setBannerText(msg.welcome);
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
      setBannerText(msg.exhale);
    },
    [],
  );

  const bind = useLongPress(longPressCallback, {
    onStart: (event) => {
      if (isComplete) return;
      isCancelled ? handleFrogAction("disable") : handleFrogAction("start");
    },
    onFinish: (event) => handleFrogAction("release"),
    onCancel: (event) => handleFrogAction("cancel"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: cycleSpeed * 1000, // Time threshold before long press callback is fired
    captureEvent: true, // Capture event on the target element, not the child elements
    cancelOnMovement: false,
  });

  return (
    <section
      className={`${inter.className} flex flex-wrap text-center  text-slate-900`}
    >
      <Head>
        <title>Chill a minute: game</title>
      </Head>
      <div className="w-full touch-none bg-gradient-to-b from-slate-700 via-sky-600 via-70% to-slate-700/20">
        <div className="mx-auto md:w-1/3">
          <button
            className="w-full text-right"
            onClick={() => {
              handleFrogAction("reset");
              (window as any).settings_modal.showModal();
            }}
          >
            <SettingsIcon
              className="mr-4 mt-3 inline-block"
              width={28}
              height={28}
              fill={`#7be5fa`}
            />
          </button>
          {/* <audio src="/sounds/notification-bell.mp3" controls /> */}

          {/* COUNTDOWN CLOCK */}
          <div className="mx-auto h-24 w-24">
            <CountdownTimer
              isPlaying={isInProgress}
              duration={gameLength * 60}
              key={clockKey}
            />
          </div>
          {/* PEARLS */}
          <div className="my-3 h-6 w-full text-center">
            {cycleCount ? (
              <BreathCountDots />
            ) : (
              isCancelled && (
                <button
                  onClick={() => handleFrogAction("reset")}
                  className="text-xl text-sky-300/80"
                >
                  {msg.restart}
                </button>
              )
            )}
          </div>
          {/* BANNER TEXT */}
          <motion.h3
            className={`my-2 text-2xl ${
              isCancelled ? "text-orange-500/70" : "text-sky-300/70"
            } opacity-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {bannerText}
          </motion.h3>
        </div>
        {/* FROG */}
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

      <SettingsModal />
      <GameCompleteModal />
    </section>
  );
}
