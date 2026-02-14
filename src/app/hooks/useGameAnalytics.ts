"use client";

import * as ga from "@/lib/gtag";
import { useCallback } from "react";

type GameAnalyticsParams = {
  gameName: string;
  userGameLength: number;
  cycleCount: number;
};

export function useGameAnalytics() {
  const track = useCallback(
    (action: string, { gameName, userGameLength, cycleCount }: GameAnalyticsParams) => {
      ga.event({
        action,
        params: {
          event_category: "game",
          event_label: gameName,
          event_length: userGameLength,
          event_cycles: cycleCount,
        },
      });
    },
    [],
  );

  const trackGameStart = useCallback(
    (params: GameAnalyticsParams) => track("game_start", params),
    [track],
  );

  const trackGameCancel = useCallback(
    (params: GameAnalyticsParams) => track("game_cancel", params),
    [track],
  );

  const trackGameReset = useCallback(
    (params: GameAnalyticsParams) => track("game_reset", params),
    [track],
  );

  const trackGameComplete = useCallback(
    (params: GameAnalyticsParams) => track("game_complete", params),
    [track],
  );

  return {
    trackGameStart,
    trackGameCancel,
    trackGameReset,
    trackGameComplete,
  };
}
