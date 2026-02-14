"use client";

import { type GameAction, runGameAction } from "@/app/hooks/gameActionExecutor";
import {
  type GamePhase,
  type GamePhaseEvent,
  gamePhaseReducer,
  initialGamePhase,
} from "@/app/hooks/gamePhaseReducer";
import {
  type GamePreferences,
  createPreferencesSaveScheduler,
} from "@/app/hooks/preferencesSaveScheduler";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { useGameAnalytics } from "@/app/hooks/useGameAnalytics";
import { useGameAudio } from "@/app/hooks/useGameAudio";
import { useGameBoxAnimation } from "@/app/hooks/useGameBoxAnimation";
import { useGamePersistence } from "@/app/hooks/useGamePersistence";
import { msg } from "@/app/i18n/frog-msg";
import calculateHumanDelay from "@/app/utils/humanDelay";
import onContextMenuListener from "@/app/utils/onContextMenuListener";
import rotatingCongrats from "@/app/utils/rotatingCongrats";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import useWebShare from "react-use-web-share";
import { LongPressReactEvents, useLongPress } from "use-long-press";

const TXT_COLOR = {
  BLUE: "text-sky-300",
  ORANGE: "text-orange-500",
  FUCHSIA: "text-fuchsia-300",
} as const;

const BOX_BG_COLOR = {
  BLUE: "bg-sky-300",
  FUCHSIA: "bg-fuchsia-300",
  ORANGE: "bg-orange-500",
} as const;

type BannerTextColor = (typeof TXT_COLOR)[keyof typeof TXT_COLOR];
type BoxBgColor = (typeof BOX_BG_COLOR)[keyof typeof BOX_BG_COLOR];
type BannerState = {
  bannerText: string;
  bannerTextColor: BannerTextColor;
};

export const gamePageShareInfo = {
  title: "Chill Points",
  text: "Play the game and learn breath control.",
  url: "https://chillpoints.app/game",
};

export function useGameController() {
  const { isSupported, loading, share } = useWebShare();
  const {
    boxscope,
    animateGrow,
    animateShrink,
    animateCancel,
    animateReset,
    animateFinish,
  } = useGameBoxAnimation();
  const [phase, dispatch] = useReducer(
    (currentPhase: GamePhase, event: GamePhaseEvent) =>
      gamePhaseReducer(currentPhase, event),
    initialGamePhase,
  );
  const [banner, setBanner] = useState<BannerState>({
    bannerText: msg.welcome,
    bannerTextColor: TXT_COLOR.BLUE,
  });
  const [boxBg, setBoxBg] = useState<BoxBgColor>(BOX_BG_COLOR.BLUE);
  const [clockCoords, setClockCoords] = useState({ x: -300, y: -300 });
  const [clockKey, setClockKey] = useState(0);
  const { playAwardSound, playErrorSound } = useGameAudio();
  const { saveSessionData, saveUserPreferencesData } = useGamePersistence();
  const { trackGameStart, trackGameCancel, trackGameReset, trackGameComplete } =
    useGameAnalytics();
  const gameOver = useRef(false);
  const clockRef = useRef<HTMLDivElement | null>(null);
  const preferencesSchedulerRef = useRef(
    createPreferencesSaveScheduler((preferences: GamePreferences) => {
      saveUserPreferencesData(preferences);
    }),
  );

  const {
    userMinutesGoal,
    userCycleSpeed,
    userGameLength,
    humanDelay,
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
  } = useBreathSessionStore();

  const handleAction = useCallback(
    (action: GameAction) => {
      runGameAction({
        action,
        dispatch,
        isInProgress,
        isComplete,
        isCancelled,
        humanDelay,
        userCycleSpeed,
        userGameLength,
        cycleCount,
        gameName,
        gameOverRef: gameOver,
        setBanner,
        setClockKey,
        setInhaleTimes,
        setIsCancelledStatus,
        setIsInProgressStatus,
        setBoxBg,
        incrementCycleCount,
        resetCycleCount,
        resetGame,
        playAwardSound,
        playErrorSound,
        animateGrow,
        animateShrink,
        animateCancel,
        animateReset,
        animateFinish,
        trackGameStart,
        trackGameCancel,
        trackGameReset,
      });
    },
    [
      animateCancel,
      animateFinish,
      animateGrow,
      animateReset,
      animateShrink,
      cycleCount,
      gameName,
      humanDelay,
      incrementCycleCount,
      isComplete,
      isInProgress,
      playAwardSound,
      playErrorSound,
      resetCycleCount,
      resetGame,
      setInhaleTimes,
      setIsCancelledStatus,
      setIsInProgressStatus,
      trackGameCancel,
      trackGameReset,
      trackGameStart,
      userCycleSpeed,
      userGameLength,
    ],
  );

  const completeGame = useCallback(() => {
    if (!isComplete || !cycleCount) {
      return;
    }

    gameOver.current = true;
    setIsInProgressStatus(false);
    handleAction("finish");
    setBanner({
      bannerTextColor: TXT_COLOR.BLUE,
      bannerText: rotatingCongrats(),
    });
    saveSessionData({
      gameName,
      inhaleTimes,
      cycleCount,
      userGameLength,
    });
    trackGameComplete({
      gameName,
      userGameLength,
      cycleCount,
    });
  }, [
    cycleCount,
    gameName,
    handleAction,
    inhaleTimes,
    isComplete,
    saveSessionData,
    setIsInProgressStatus,
    trackGameComplete,
    userGameLength,
  ]);

  useEffect(() => {
    completeGame();

    return () => {
      if (isComplete) {
        setIsCompleteStatus(false);
      }
    };
  }, [completeGame, isComplete, setIsCompleteStatus]);

  useEffect(() => {
    setHumanDelay(calculateHumanDelay(userGameLength));
    const pendingPreferences: GamePreferences = {
      userMinutesGoal,
      userCycleSpeed,
      userGameLength,
    };

    preferencesSchedulerRef.current.schedule(pendingPreferences);

    return () => {
      preferencesSchedulerRef.current.cancelPending();
    };
  }, [setHumanDelay, userCycleSpeed, userGameLength, userMinutesGoal]);

  useEffect(() => {
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

  const longPressCallback = useCallback(() => {
    dispatch({ type: "THRESHOLD_REACHED" });
    setBanner({
      bannerText: msg.exhale,
      bannerTextColor: TXT_COLOR.FUCHSIA,
    });
    setBoxBg(BOX_BG_COLOR.FUCHSIA);
  }, []);

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
    filterEvents: (event) => true,
    threshold: userCycleSpeed * 1000,
    captureEvent: true,
    cancelOnMovement: false,
  });

  return {
    banner,
    bind,
    boxBg,
    boxscope,
    clockCoords,
    clockKey,
    clockRef,
    gameOver,
    handleAction,
    isComplete,
    isInProgress,
    isSupported,
    isCancelled,
    loading,
    phase,
    share,
    userGameLength,
  };
}
