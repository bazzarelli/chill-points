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
import calculateInhaleTimeDiff from "@/app/utils/calculateInhaleTimeDiff";
import { inter } from "@/app/utils/fonts";
import calculateHumanDelay from "@/app/utils/humanDelay";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import rotatingCongrats from "@/app/utils/rotatingCongrats";
import * as ga from "@/lib/gtag";
import { useAnimate } from "framer-motion";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { LongPressReactEvents, useLongPress } from "use-long-press";
import useSound from "use-sound";

export default function Page() {
  const TXT_COLOR = {
    BLUE: "text-sky-300",
    ORANGE: "text-orange-500",
    FUCHSIA: "text-fuchsia-300",
  };

  const BOX_BG_COLOR = {
    BLUE: "bg-sky-300",
    FUCHSIA: "bg-fuchsia-300",
    ORANGE: "bg-orange-500",
  };

  const [boxscope, animate] = useAnimate();
  const [banner, setBanner] = useState({
    bannerText: msg.welcome,
    bannerTextColor: TXT_COLOR.BLUE,
  });
  const [boxBg, setBoxBg] = useState(BOX_BG_COLOR.BLUE);
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
  const gameOver = useRef(false); // when changed, does not trigger re-render
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
    const res = await fetch("/game/api", {
      method: "POST",
      body: JSON.stringify({
        gameName,
        inhaleTimes: calculateInhaleTimeDiff(inhaleTimes),
        cycleCount,
        gameLength: userGameLength,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // after saving to db save to local storage
    const data = await res.json();
    setBreathSessionDataCache([data]);
  }

  // isComplete is triggered by the countdown timer
  useEffect(() => {
    if (isComplete && cycleCount) {
      gameOver.current = true; // set the game over reference
      setIsInProgressStatus(false);
      handleAction("finish");
      setBanner({
        bannerTextColor: TXT_COLOR.BLUE,
        bannerText: rotatingCongrats(),
      });
      dbSaveSessionData();
      ga.event({
        action: "game_complete",
        params: {
          event_category: "game",
          event_label: gameName,
          event_length: userGameLength,
          event_cycles: cycleCount,
        },
      });
    }

    return () => {
      if (isComplete) {
        setIsCompleteStatus(false);
      }
    };
  }, [isComplete]);

  useEffect(() => {
    setHumanDelay(calculateHumanDelay(userGameLength));
  }, [userGameLength]);

  useEffect(() => {
    // disable long press browser defaults
    onContextMenuListener();
    handleAction("reset");
    const clockEl = clockRef.current;
    if (clockEl) {
      const clockRect = clockEl.getBoundingClientRect();
      setClockCoords({
        x: clockRect.left + window.scrollX,
        y: clockRect.top + window.scrollY,
      });
    }
  }, []);

  function handleAction(action: string) {
    const animation = (duration: number, boxAnim: BoxAnim) => {
      return animate(boxscope.current, { ...boxAnim }, { duration: duration });
    };

    switch (action) {
      case "start":
        setBanner({
          bannerText: msg.inhale,
          bannerTextColor: TXT_COLOR.BLUE,
        });
        !isInProgress && setClockKey((prevKey) => prevKey + 1);
        setIsInProgressStatus(true);
        setInhaleTimes(Date.now());
        setIsCancelledStatus(false);
        setIsInProgressStatus(true);
        setBoxBg(BOX_BG_COLOR.BLUE);
        animation(userCycleSpeed - humanDelay, BOX_ANIM.GROW);
        ga.event({
          action: "game_start",
          params: {
            event_category: "game",
            event_label: gameName,
            event_length: userGameLength,
            event_cycles: cycleCount,
          },
        });
        break;
      case "release":
        setInhaleTimes(Date.now());
        playAwardSound();
        if (!isComplete) {
          incrementCycleCount();
          setBoxBg(BOX_BG_COLOR.FUCHSIA);
          animation(userCycleSpeed - humanDelay, BOX_ANIM.SHRINK).then(() => {
            if (!gameOver.current) {
              setBanner({
                bannerText: msg.inhale,
                bannerTextColor: TXT_COLOR.BLUE,
              });
            }
          });
        }
        break;
      case "cancel":
        setBanner({
          bannerText: msg.cancelled,
          bannerTextColor: TXT_COLOR.ORANGE,
        });
        playErrorSound();
        setIsInProgressStatus(false);
        resetCycleCount();
        setIsCancelledStatus(true);
        animation(1, BOX_ANIM.CANCEL);
        ga.event({
          action: "game_cancel",
          params: {
            event_category: "game",
            event_label: gameName,
            event_length: userGameLength,
            event_cycles: cycleCount,
          },
        });
        break;
      case "reset":
        resetGame();
        setIsCancelledStatus(false);
        setBanner({
          bannerText: msg.welcome,
          bannerTextColor: TXT_COLOR.BLUE,
        });
        setClockKey((prevKey) => prevKey + 1); // key to reset the clock
        setIsInProgressStatus(false);
        gameOver.current = false;
        animation(1, BOX_ANIM.RESET);
        ga.event({
          action: "game_reset",
          params: {
            event_category: "game",
            event_label: gameName,
            event_length: userGameLength,
            event_cycles: cycleCount,
          },
        });
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
        bannerTextColor: TXT_COLOR.FUCHSIA,
      });
      setBoxBg(BOX_BG_COLOR.FUCHSIA);
    },
    [],
  );

  const bind = useLongPress(longPressCallback, {
    onStart: (event: LongPressReactEvents<Element>) => {
      if (isComplete) return;
      isCancelled ? handleAction("disable") : handleAction("start");
    },
    onFinish: (event) => {
      if (isComplete) return;
      handleAction("release");
    },
    onCancel: (event) => {
      if (isComplete) return;
      handleAction("cancel");
    },
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: userCycleSpeed * 1000, // Time threshold before long press callback is fired
    captureEvent: true, // Capture event on the target element, not the child elements
    cancelOnMovement: false,
  });

  return (
    <section
      className={`${inter.className} flex flex-wrap text-center text-slate-900`}
    >
      <Head>
        <title>Chill Points: game</title>
      </Head>
      <div
        className="w-full touch-none select-none bg-gradient-to-b 
        from-slate-700 via-sky-600 via-80% to-slate-700/20 relative z-10"
      >
        <div className="mx-auto">
          <div className="flex">
            <button
              aria-label="Reset game"
              className="w-1/2 text-left pt-2"
              onClick={() => {
                handleAction("reset");
              }}
            >
              <ReplayIcon
                className="ml-4 mt-3 inline-block fill-sky-300/80"
                width={28}
                height={28}
              />
            </button>
            <button
              aria-label="Game settings"
              data-testid="settingsButton"
              className="w-1/2 text-right pt-2"
              onClick={() => {
                handleAction("reset");
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
          {/* COMPLETION DOTS */}
          <div className="mt-2 h-6 w-full text-center">
            {isCancelled ? (
              <button
                aria-label="Reset game"
                onClick={() => handleAction("reset")}
                className="text-md border-slate-100/30 border-2 px-3 py-1 rounded-lg 
                text-sky-300"
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
          aria-label="Finger print breath button"
          className="finger-print relative mt-5 mx-auto h-48 w-64
          bg-[url(/images/finger-print-blue.webp)]
          bg-no-repeat bg-center"
          id="frog-box"
        >
          <div
            ref={boxscope}
            className={`absolute bottom-0 left-0 right-0 h-1 rounded-sm -z-10 ${boxBg}`}
          ></div>
        </button>
      </div>
      <SettingsModal />
      {isComplete && <GameComplete />}
    </section>
  );
}
