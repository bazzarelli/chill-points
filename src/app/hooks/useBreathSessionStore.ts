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
  breathSessionData: BreathSessionData[];
};

type BreathSessionData = {
  gameName: string;
  createdAt: string;
  inhaleTimes: number[];
  cycleCount: number;
  gameLength: number;
};

type BreathSessionDataCache = {
  breathSessionData: BreathSessionData[];
};

type Actions = {
  incrementCycleCount: () => void;
  resetCycleCount: () => void;
  setHumanDelay: (humanDelay: number) => void;
  setDotCountTotal: (dotCountTotal: number) => void;
  setUserCycleSpeed: (userCycleSpeed: number) => void;
  setUserGameLength: (userGameLength: number) => void;
  setInhaleTimes: (inhaleTimes: number) => void;
  setIsCompleteStatus: (isComplete: boolean) => void;
  setIsCancelledStatus: (isCancelled: boolean) => void;
  setIsInProgressStatus: (isInProgress: boolean) => void;
  setBreathSessionDataCache: (breathSessionData: BreathSessionData[]) => void;
  clearBreathSessionDataCache: () => void;
  resetGame: () => void;
};

const initialGameState: InitialGameState & BreathSessionDataCache = {
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
  breathSessionData: [],
};

export const useBreathSessionStore = create<
  InitialGameState & Actions & BreathSessionDataCache
>()(
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
        setBreathSessionDataCache: (breathSessionData: BreathSessionData[]) =>
          set((state) => ({
            breathSessionData: [
              ...state.breathSessionData,
              ...breathSessionData,
            ],
          })),
        clearBreathSessionDataCache: () =>
          set(() => ({ breathSessionData: [] })),
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
