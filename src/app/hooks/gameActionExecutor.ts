import { msg } from "@/app/i18n/frog-msg";
import type { GamePhaseEvent } from "@/app/hooks/gamePhaseReducer";

const TXT_COLOR = {
  BLUE: "text-sky-300",
  ORANGE: "text-orange-500",
  FUCHSIA: "text-fuchsia-300",
} as const;

const BOX_BG_COLOR = {
  BLUE: "bg-sky-300",
  FUCHSIA: "bg-fuchsia-300",
} as const;

export type GameAction =
  | "start"
  | "release"
  | "cancel"
  | "reset"
  | "disable"
  | "finish";

type GameAnalyticsParams = {
  gameName: string;
  userGameLength: number;
  cycleCount: number;
};

type RunGameActionDeps = {
  action: GameAction;
  allowGraceRelease?: boolean;
  dispatch: (event: GamePhaseEvent) => void;
  isInProgress: boolean;
  isComplete: boolean;
  isCancelled: boolean;
  humanDelay: number;
  userCycleSpeed: number;
  userGameLength: number;
  cycleCount: number;
  gameName: string;
  gameOverRef: { current: boolean };
  setBanner: (banner: {
    bannerText: string;
    bannerTextColor: (typeof TXT_COLOR)[keyof typeof TXT_COLOR];
  }) => void;
  setClockKey: (updater: (prevKey: number) => number) => void;
  setInhaleTimes: (timestamp: number) => void;
  setIsCancelledStatus: (isCancelled: boolean) => void;
  setIsInProgressStatus: (isInProgress: boolean) => void;
  setBoxBg: (color: (typeof BOX_BG_COLOR)[keyof typeof BOX_BG_COLOR]) => void;
  incrementCycleCount: () => void;
  resetCycleCount: () => void;
  resetGame: () => void;
  playAwardSound: () => void;
  playErrorSound: () => void;
  animateGrow: (duration: number) => void;
  animateShrink: (duration: number) => any;
  animateCancel: () => void;
  animateReset: () => void;
  animateFinish: () => void;
  trackGameStart: (params: GameAnalyticsParams) => void;
  trackGameCancel: (params: GameAnalyticsParams) => void;
  trackGameReset: (params: GameAnalyticsParams) => void;
};

export function runGameAction({
  action,
  allowGraceRelease = false,
  dispatch,
  isInProgress,
  isComplete,
  isCancelled,
  humanDelay,
  userCycleSpeed,
  userGameLength,
  cycleCount,
  gameName,
  gameOverRef,
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
}: RunGameActionDeps) {
  switch (action) {
    case "start":
      dispatch({ type: "START" });
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
      animateGrow(userCycleSpeed - humanDelay);
      trackGameStart({
        gameName,
        userGameLength,
        cycleCount,
      });
      break;
    case "release":
      dispatch({ type: "RELEASE" });
      setInhaleTimes(Date.now());
      playAwardSound();
      if (!isComplete || allowGraceRelease) {
        incrementCycleCount();
        setBoxBg(BOX_BG_COLOR.FUCHSIA);
        animateShrink(userCycleSpeed - humanDelay).then(() => {
          if (!gameOverRef.current) {
            setBanner({
              bannerText: msg.inhale,
              bannerTextColor: TXT_COLOR.BLUE,
            });
          }
        });
      }
      break;
    case "cancel":
      dispatch({ type: "CANCEL" });
      setBanner({
        bannerText: msg.cancelled,
        bannerTextColor: TXT_COLOR.ORANGE,
      });
      playErrorSound();
      setIsInProgressStatus(false);
      resetCycleCount();
      setIsCancelledStatus(true);
      animateCancel();
      trackGameCancel({
        gameName,
        userGameLength,
        cycleCount,
      });
      break;
    case "reset":
      dispatch({ type: "RESET" });
      resetGame();
      setIsCancelledStatus(false);
      setBanner({
        bannerText: msg.welcome,
        bannerTextColor: TXT_COLOR.BLUE,
      });
      setClockKey((prevKey) => prevKey + 1);
      setIsInProgressStatus(false);
      gameOverRef.current = false;
      animateReset();
      trackGameReset({
        gameName,
        userGameLength,
        cycleCount,
      });
      break;
    case "disable":
      dispatch({ type: "DISABLE" });
      animateCancel();
      break;
    case "finish":
      dispatch({ type: "COMPLETE" });
      animateFinish();
      break;
    default:
      break;
  }

}
