import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type UserPreferences = {
  cycleSpeed: number;
  gameLength: number;
};

type InitialGameState = {
  cycleCount: number;
  inhaleTimes: number[];
  isComplete: boolean;
  isInProgress: boolean;
  isCancelled: boolean;
  userPreferences: UserPreferences;
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
    id: number;
  }[];
};

type Actions = {
  incrementCycleCount: () => void;
  resetCycleCount: () => void;
  setCycleSpeed: (cycleSpeed: number) => void;
  setGameLength: (gameLength: number) => void;
  setInhaleTimes: (inhaleTimes: number) => void;
  setSessionsData: () => void;
  setIsCompleteStatus: (isComplete: boolean) => void;
  setIsCancelledStatus: (isCancelled: boolean) => void;
  setIsInProgressStatus: (isInProgress: boolean) => void;
  resetGame: () => void;
  resetAll: () => void;
};

const initialGameState: InitialGameState & SessionsData = {
  userPreferences: {
    cycleSpeed: 3,
    gameLength: 1,
  },
  cycleCount: 0,
  inhaleTimes: [],
  isComplete: false,
  isCancelled: false,
  isInProgress: false,
  sessionsData: [],
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
        setCycleSpeed: (cycleSpeed) =>
          set(() => ({
            userPreferences: {
              ...get().userPreferences,
              cycleSpeed: cycleSpeed,
            },
          })),
        setGameLength: (gameLength) =>
          set(() => ({
            userPreferences: {
              ...get().userPreferences,
              gameLength: gameLength,
            },
          })),
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
        resetAll: () => set(initialGameState),
      }),
      {
        name: "breath-session-storage",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { enabled: true, name: "breath-session-storage" },
  ),
);
