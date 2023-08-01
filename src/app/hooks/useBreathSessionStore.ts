import { create } from "zustand";

export type Sessions = {
    cycleCount: number;
    incrementCycleCount: () => void;
    inhaleTimes: number[];
    setInhaleTimes: (inhaleTimes: number) => void;   
    isComplete: boolean;
    toggleSessionStatus: () => void;
    sessions: number[][];
}

export const useBreathSessionStore = create<Sessions>()((set) => ({
    cycleCount: 0,
    incrementCycleCount: () => set((state) => ({ cycleCount: state.cycleCount + 1 })),
    inhaleTimes: [],
    setInhaleTimes: (inhaleTimes) => set((state) => ({ inhaleTimes: [...state.inhaleTimes, inhaleTimes] })),
    isComplete: false,
    toggleSessionStatus: () => set((state) => ({ isComplete: !state.isComplete })),
    sessions: [],
}));
