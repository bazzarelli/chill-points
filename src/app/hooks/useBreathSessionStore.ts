import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type InitialGameState = {
  cycleCount: number;
  inhaleTimes: number[];
  isComplete: boolean;
  isInProgress: boolean;
  isCancelled: boolean;
  userCycleSpeed: number;
  userGameLength: number;
};

type NewGameState = {
  cycleCount: number;
  inhaleTimes: number[];
  isComplete: boolean;
  isInProgress: boolean;
  isCancelled: boolean;
};

type SessionsData = {
  sessionsData: {
    date: string;
    inhaleTimes: number[];
    cycleCount: number;
    minutes: number;
  }[];
};

type Actions = {
  incrementCycleCount: () => void;
  resetCycleCount: () => void;
  setUserCycleSpeed: (userCycleSpeed: number) => void;
  setUserGameLength: (userGameLength: number) => void;
  setInhaleTimes: (inhaleTimes: number) => void;
  setSessionsData: () => void;
  setIsCompleteStatus: (isComplete: boolean) => void;
  setIsCancelledStatus: (isCancelled: boolean) => void;
  setIsInProgressStatus: (isInProgress: boolean) => void;
  resetGame: () => void;
  resetAll: () => void;
};

const initialGameState: InitialGameState & SessionsData = {
  cycleCount: 0,
  inhaleTimes: [],
  isComplete: false,
  isCancelled: false,
  isInProgress: false,
  sessionsData: [],
  userCycleSpeed: 3,
  userGameLength: 1,
};

const newGameState: NewGameState = {
  cycleCount: 0,
  inhaleTimes: [],
  isComplete: false,
  isCancelled: false,
  isInProgress: false,
};

export const useBreathSessionStore = create<
  InitialGameState & SessionsData & Actions
>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialGameState,
        incrementCycleCount: () =>
          set((state) => ({ cycleCount: state.cycleCount + 1 })),
        resetCycleCount: () => set(() => ({ cycleCount: 0 })),
        setUserCycleSpeed: (userCycleSpeed) => set(() => ({ userCycleSpeed })),
        setUserGameLength: (userGameLength) => set(() => ({ userGameLength })),
        setInhaleTimes: (inhaleTimes) =>
          set((state) => ({
            inhaleTimes: [...state.inhaleTimes, inhaleTimes],
          })),
        setSessionsData: () =>
          set((state) => ({
            sessionsData: [
              ...state.sessionsData,
              {
                date: new Date().toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                }),
                inhaleTimes: get().inhaleTimes,
                cycleCount: get().cycleCount,
                id: Date.now(),
                minutes: get().userGameLength,
              },
            ],
          })),
        setIsCompleteStatus: (isComplete) =>
          set(() => ({ isComplete: isComplete })),
        setIsCancelledStatus: (isCancelled) =>
          set(() => ({ isCancelled: isCancelled })),
        setIsInProgressStatus: (isInProgress) =>
          set(() => ({ isInProgress: isInProgress })),
        resetGame: () => set(newGameState),
        resetAll: () =>
          set(() => ({
            cycleCount: 0,
            inhaleTimes: [],
            isComplete: false,
            isCancelled: false,
            isInProgress: false,
            sessionsData: [],
          })),
      }),
      {
        name: "breath-session-storage",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { enabled: true, name: "breath-session-storage" },
  ),
);
