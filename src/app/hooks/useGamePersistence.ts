"use client";

import calculateInhaleTimeDiff from "@/app/utils/calculateInhaleTimeDiff";
import { useCallback } from "react";

type SaveSessionParams = {
  gameName: string;
  inhaleTimes: number[];
  cycleCount: number;
  userGameLength: number;
};

type SaveUserPreferencesParams = {
  userMinutesGoal: number;
  userCycleSpeed: number;
  userGameLength: number;
};

export function useGamePersistence() {
  const saveSessionData = useCallback(
    async ({ gameName, inhaleTimes, cycleCount, userGameLength }: SaveSessionParams) => {
      await fetch("/game/api", {
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
    },
    [],
  );

  const saveUserPreferencesData = useCallback(
    async ({
      userMinutesGoal,
      userCycleSpeed,
      userGameLength,
    }: SaveUserPreferencesParams) => {
      await fetch("/profile/api", {
        method: "POST",
        body: JSON.stringify({
          userMinutesGoal,
          userCycleSpeed,
          userGameLength,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    [],
  );

  return {
    saveSessionData,
    saveUserPreferencesData,
  };
}
