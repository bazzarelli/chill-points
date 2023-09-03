"use client";

import BreathCountDots from "@/app/components/game/BreathCountDots";
import CountdownTimer from "@/app/components/game/CountdownTimer";
import GameCompleteModal from "@/app/components/game/GameCompleteModal";
import SettingsModal from "@/app/components/game/SettingsModal";
import ReplayIcon from "@/app/components/svg/ReplayIcon";
import SettingsIcon from "@/app/components/svg/SettingsIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import BOX_ANIM, { BoxAnim } from "@/app/utils/boxAnimation";
import { inter } from "@/app/utils/fonts";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import rotatingCongrats from "@/app/utils/rotatingCongrats";
import { motion, useAnimate } from "framer-motion";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { LongPressReactEvents, useLongPress } from "use-long-press";
import useSound from "use-sound";

export default function Page() {
  const HUMAN_DELAY = 0.3;
  const [boxscope, animate] = useAnimate();
  const [bannerText, setBannerText] = useState(msg.welcome);
  const [clockKey, setClockKey] = useState(0);
  const [playAwardSound] = useSound("/sounds/retro-award.mp3", {
    volume: 0.75,
  });
  const [playErrorSound] = useSound("/sounds/retro-error.mp3", {
    volume: 0.5,
  });
  const gameOver = useRef(false);

  const {
    userCycleSpeed,
    userGameLength,
    isCancelled,
    isComplete,
    isInProgress,
    gameName,
    inhaleTimes,
    cycleCount,
    incrementCycleCount,
    resetGame,
    resetCycleCount,
    setInhaleTimes,
    setIsInProgressStatus,
    setIsCancelledStatus,
  } = useBreathSessionStore();

  async function dbSaveSessionData() {
    const res = await fetch("/game/api", {
      method: "POST",
      body: JSON.stringify({
        gameName,
        inhaleTimes,
        cycleCount,
        gameLength: userGameLength,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("dbSaveSessionData game id:", data.id);
  }

  useEffect(() => {
    if (gameOver.current && cycleCount) {
      dbSaveSessionData(); // save the session data to db
      (window as any).game_complete_modal.showModal();
    }
  }, [gameOver.current]);

  // when the session is completed
  useEffect(() => {
    if (isComplete && !gameOver.current) {
      gameOver.current = true; // set the game over reference
      setIsInProgressStatus(false); // the session is not in progress
      handleFrogAction("release");
      setBannerText(rotatingCongrats()); // set the banner text
    }
  }, [isComplete]);

  useEffect(() => {
    // disable long press browser defaults
    onContextMenuListener();
    handleFrogAction("reset");
  }, []);

  function handleFrogAction(action: string) {
    const animation = (duration: number, boxAnim: BoxAnim) => {
      return animate(boxscope.current, { ...boxAnim }, { duration: duration });
    };

    switch (action) {
      case "start":
        setBannerText(msg.inhale);
        !isInProgress && setClockKey((prevKey) => prevKey + 1);
        setIsInProgressStatus(true);
        setInhaleTimes(Date.now());
        setIsCancelledStatus(false);
        setIsInProgressStatus(true);
        animation(userCycleSpeed - HUMAN_DELAY, BOX_ANIM.GROW);
        break;
      case "release":
        setInhaleTimes(Date.now());
        if (!isComplete) {
          incrementCycleCount();
          playAwardSound();
        }
        animation(userCycleSpeed - HUMAN_DELAY, BOX_ANIM.SHRINK).then(() => {
          !gameOver.current && setBannerText(msg.inhale);
        });
        break;
      case "cancel":
        setBannerText(msg.cancelled);
        playErrorSound();
        setIsInProgressStatus(false);
        resetCycleCount();
        setIsCancelledStatus(true);
        animation(1, BOX_ANIM.CANCEL);
        break;
      case "reset":
        resetGame();
        setIsCancelledStatus(false);
        setBannerText(msg.welcome);
        setClockKey((prevKey) => prevKey + 1); // key to reset the clock
        setIsInProgressStatus(false);
        gameOver.current = false;
        animation(1, BOX_ANIM.RESET);
        break;
      case "disable":
        animation(1, BOX_ANIM.CANCEL);
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
    onFinish: (event) => {
      if (isComplete) return;
      handleFrogAction("release");
    },
    onCancel: (event) => {
      if (isComplete) return;
      handleFrogAction("cancel");
    },
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: userCycleSpeed * 1000, // Time threshold before long press callback is fired
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
      <div className="w-full touch-none select-none bg-gradient-to-b from-slate-700 via-sky-600 via-70% to-slate-700/20 relative z-10">
        <div className="mx-auto md:w-1/3">
          <div className="flex">
            <button
              className="w-1/2 text-left"
              onClick={() => {
                handleFrogAction("reset");
              }}
            >
              <ReplayIcon
                className="ml-4 mt-3 inline-block fill-sky-300/80"
                width={28}
                height={28}
              />
            </button>
            <button
              className="w-1/2 text-right"
              onClick={() => {
                handleFrogAction("reset");
                (window as any).settings_modal.showModal();
              }}
            >
              <SettingsIcon
                className="mr-4 mt-3 inline-block fill-sky-300/80"
                width={28}
                height={28}
              />
            </button>
          </div>
          {/* COUNTDOWN CLOCK */}
          <div className="mx-auto h-24 w-24">
            <CountdownTimer
              isPlaying={isInProgress}
              duration={userGameLength * 60}
              key={clockKey}
            />
          </div>
          {/* BANNER TEXT */}
          <motion.h3
            className={`mt-2 text-2xl ${
              isCancelled ? "text-orange-500/70" : "text-sky-300/70"
            } opacity-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {bannerText}
          </motion.h3>
          {/* COMPLETION PEARLS */}
          <div className="mt-2 h-6 w-full text-center">
            {isCancelled ? (
              <button
                onClick={() => handleFrogAction("reset")}
                className="text-xl text-sky-300/80"
              >
                {msg.restart}
              </button>
            ) : (
              <BreathCountDots />
            )}
          </div>
        </div>
        {/* FROG */}
        <button
          {...bind()}
          className="relative mt-5 mx-auto h-48 w-64 bg-[url(/images/buddha-belly-frog-sm.webp)] bg-contain bg-center bg-no-repeat"
          id="frog-box"
        >
          <div
            ref={boxscope}
            className="absolute bottom-0 left-0 right-0 h-1 bg-sky-300/50 rounded-sm -z-10"
          ></div>
        </button>
      </div>
      <SettingsModal />
      <GameCompleteModal />
    </section>
  );
}
