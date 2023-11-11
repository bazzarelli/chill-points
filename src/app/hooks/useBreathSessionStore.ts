import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type InitialGameState = {
  cycleCount: number;
  humanDelay: number;
  dotCountTotal: number;
  inhaleTimes: number[];
  isComplete: boolean;
  isInProgress: boolean;
  isCancelled: boolean;
  gameName: string;
  userCycleSpeed: number;
  userGameLength: number;
  userMinutesGoal: number;
};

type Actions = {
  incrementCycleCount: () => void;
  resetCycleCount: () => void;
  setHumanDelay: (humanDelay: number) => void;
  setDotCountTotal: (dotCountTotal: number) => void;
  setUserCycleSpeed: (userCycleSpeed: number) => void;
  setUserGameLength: (userGameLength: number) => void;
  setUserMinutesGoal: (userMinutesGoal: number) => void;
  setInhaleTimes: (inhaleTimes: number) => void;
  setIsCompleteStatus: (isComplete: boolean) => void;
  setIsCancelledStatus: (isCancelled: boolean) => void;
  setIsInProgressStatus: (isInProgress: boolean) => void;
  resetGame: () => void;
};

const initialGameState: InitialGameState = {
  cycleCount: 0,
  humanDelay: 0,
  dotCountTotal: 10,
  inhaleTimes: [],
  isComplete: false,
  isCancelled: false,
  isInProgress: false,
  gameName: "Equal Breathing",
  userCycleSpeed: 3,
  userGameLength: 1,
  userMinutesGoal: 2,
};

export const useBreathSessionStore = create<InitialGameState & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialGameState,
        incrementCycleCount: () =>
          set((state) => ({ cycleCount: state.cycleCount + 1 })),
        resetCycleCount: () => set(() => ({ cycleCount: 0 })),
        setDotCountTotal: (dotCountTotal) =>
          set(() => ({
            dotCountTotal,
          })),
        setHumanDelay: (humanDelay) => set(() => ({ humanDelay })),
        setUserCycleSpeed: (userCycleSpeed) => set(() => ({ userCycleSpeed })),
        setUserGameLength: (userGameLength) => set(() => ({ userGameLength })),
        setUserMinutesGoal: (userMinutesGoal) =>
          set(() => ({ userMinutesGoal })),
        setInhaleTimes: (inhaleTimes) =>
          set((state) => ({
            inhaleTimes: [...state.inhaleTimes, inhaleTimes],
          })),
        setIsCompleteStatus: (isComplete) =>
          set(() => ({ isComplete: isComplete })),
        setIsCancelledStatus: (isCancelled) =>
          set(() => ({ isCancelled: isCancelled })),
        setIsInProgressStatus: (isInProgress) =>
          set(() => ({ isInProgress: isInProgress })),
        resetGame: () =>
          set(() => ({
            cycleCount: 0,
            inhaleTimes: [],
            isComplete: false,
            isCancelled: false,
            isInProgress: false,
          })),
      }),
      {
        name: "breath-session-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { enabled: true, name: "breath-session-storage" },
  ),
);
