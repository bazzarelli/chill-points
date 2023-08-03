import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  cycleCount: number;
  inhaleTimes: number[];
  isComplete: boolean;
  sessionsData: { date: string; inhaleTimes: number[] }[];
};

type Actions = {
  incrementCycleCount: () => void;
  setInhaleTimes: (inhaleTimes: number) => void;
  setSessionsData: () => void;
  setSessionStatus: (isComplete: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  cycleCount: 0,
  inhaleTimes: [],
  isComplete: false,
  sessionsData: [],
};

export const useBreathSessionStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        incrementCycleCount: () =>
          set((state) => ({ cycleCount: state.cycleCount + 1 })),
        setInhaleTimes: (inhaleTimes) =>
          set((state) => ({
            inhaleTimes: [...state.inhaleTimes, inhaleTimes],
          })),
        setSessionsData: () =>
          set((state) => ({
            sessionsData: [
              ...state.sessionsData,
              {
                date: new Date().toLocaleDateString(),
                inhaleTimes: get().inhaleTimes,
                cycleCount: get().cycleCount,
              },
            ],
          })),
        setSessionStatus: (isComplete) =>
          set(() => ({ isComplete: isComplete })),
        reset: () => set(initialState),
      }),
      { name: "breath-session-storage" },
    ),
    { enabled: true, name: "breath-session-storage" },
  ),
);
