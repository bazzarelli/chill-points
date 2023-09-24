"use client";

import BadgeMinter from "@/app/components/game/BadgeMinter";
import BreathCountDots from "@/app/components/game/BreathCountDots";
import CountdownTimer from "@/app/components/game/CountdownTimer";
import GameBanner from "@/app/components/game/GameBanner";
import GameComplete from "@/app/components/game/GameComplete";
import SettingsModal from "@/app/components/game/SettingsModal";
import ReplayIcon from "@/app/components/svg/ReplayIcon";
import SettingsIcon from "@/app/components/svg/SettingsIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import BOX_ANIM, { BoxAnim } from "@/app/utils/boxAnimation";
import { inter } from "@/app/utils/fonts";
import getHumanDelay from "@/app/utils/humanDelay";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import rotatingCongrats from "@/app/utils/rotatingCongrats";
import { useAnimate } from "framer-motion";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { LongPressReactEvents, useLongPress } from "use-long-press";
import useSound from "use-sound";

export default function Page() {
  const TXT_COLORS = {
    BLUE: "text-sky-300",
    ORANGE: "text-orange-500",
    GREEN: "text-green-500",
  };

  const [boxscope, animate] = useAnimate();
  const [banner, setBanner] = useState({
    bannerText: msg.welcome,
    bannerTextColor: TXT_COLORS.BLUE,
  });
  const [clockCoords, setClockCoords] = useState({ x: -300, y: -300 });
  const [clockKey, setClockKey] = useState(0);
  const [playAwardSound] = useSound("/sounds/retro-award.mp3", {
    volume: 0.65,
  });
  const [playErrorSound] = useSound("/sounds/retro-error.mp3", {
    volume: 0.5,
  });
  // used to tell in-flight/async parts of the game
  // towards the final momments that the game is over
  const gameOver = useRef(false); // does not trigger re-render
  const clockRef = useRef<HTMLDivElement | null>(null);

  const {
    userCycleSpeed,
    humanDelay,
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
    setIsCompleteStatus,
    setIsInProgressStatus,
    setIsCancelledStatus,
    setHumanDelay,
    setBreathSessionDataCache,
  } = useBreathSessionStore();

  async function dbSaveSessionData() {
    try {
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
      setBreathSessionDataCache([data]);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  // isComplete is triggered by the countdown timer
  useEffect(() => {
    if (isComplete && cycleCount) {
      gameOver.current = true; // set the game over reference
      setIsInProgressStatus(false);
      handleFrogAction("finish");
      setBanner({
        bannerTextColor: TXT_COLORS.BLUE,
        bannerText: rotatingCongrats(),
      });
      dbSaveSessionData();
    }

    return () => {
      if (isComplete) {
        setIsCompleteStatus(false);
      }
    };
  }, [isComplete]);

  useEffect(() => {
    setHumanDelay(getHumanDelay(userGameLength));
  }, [userGameLength]);

  useEffect(() => {
    // disable long press browser defaults
    onContextMenuListener();
    handleFrogAction("reset");
    const clockEl = clockRef.current;
    if (clockEl) {
      const clockRect = clockEl.getBoundingClientRect();
      setClockCoords({
        x: clockRect.left + window.scrollX,
        y: clockRect.top + window.scrollY,
      });
    }
  }, []);

  function handleFrogAction(action: string) {
    const animation = (duration: number, boxAnim: BoxAnim) => {
      return animate(boxscope.current, { ...boxAnim }, { duration: duration });
    };

    switch (action) {
      case "start":
        setBanner({
          bannerText: msg.inhale,
          bannerTextColor: TXT_COLORS.BLUE,
        });
        !isInProgress && setClockKey((prevKey) => prevKey + 1);
        setIsInProgressStatus(true);
        setInhaleTimes(Date.now());
        setIsCancelledStatus(false);
        setIsInProgressStatus(true);
        animation(userCycleSpeed - humanDelay, BOX_ANIM.GROW);
        break;
      case "release":
        setInhaleTimes(Date.now());
        if (!isComplete) {
          incrementCycleCount();
          playAwardSound();
          animation(userCycleSpeed - humanDelay, BOX_ANIM.SHRINK).then(() => {
            if (!gameOver.current) {
              setBanner({
                bannerText: msg.inhale,
                bannerTextColor: TXT_COLORS.BLUE,
              });
            }
          });
        }
        break;
      case "cancel":
        setBanner({
          bannerText: msg.cancelled,
          bannerTextColor: TXT_COLORS.ORANGE,
        });
        playErrorSound();
        setIsInProgressStatus(false);
        resetCycleCount();
        setIsCancelledStatus(true);
        animation(1, BOX_ANIM.CANCEL);
        break;
      case "reset":
        resetGame();
        setIsCancelledStatus(false);
        setBanner({
          bannerText: msg.welcome,
          bannerTextColor: TXT_COLORS.BLUE,
        });
        setClockKey((prevKey) => prevKey + 1); // key to reset the clock
        setIsInProgressStatus(false);
        gameOver.current = false;
        animation(1, BOX_ANIM.RESET);
        break;
      case "disable":
        animation(1, BOX_ANIM.CANCEL);
        break;
      case "finish":
        animation(1, BOX_ANIM.FINISH);
        break;
      default:
        break;
    }
  }

  const longPressCallback = useCallback(
    (event: LongPressReactEvents<Element>) => {
      setBanner({
        bannerText: msg.exhale,
        bannerTextColor: TXT_COLORS.GREEN,
      });
    },
    [],
  );

  const bind = useLongPress(longPressCallback, {
    onStart: (event: LongPressReactEvents<Element>) => {
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
          <div ref={clockRef} className="mx-auto h-24 w-24">
            {gameOver.current ? (
              <BadgeMinter isPlaying={gameOver.current} coords={clockCoords} />
            ) : (
              <CountdownTimer
                isPlaying={isInProgress}
                duration={userGameLength * 60}
                key={clockKey}
              />
            )}
          </div>
          {/* BANNER TEXT */}
          <GameBanner banner={banner} />
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
      {isComplete && <GameComplete />}
    </section>
  );
}
