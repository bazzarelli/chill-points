import { create } from "zustand";

export type Sessions = {
    inhaleTimes: number[];
    setInhaleTimes: (inhaleTimes: number) => void;   
    isComplete: boolean;
    toggleSessionStatus: () => void;
    sessions: number[][];
}

export const useBreathSessionStore = create<Sessions>()((set) => ({
    inhaleTimes: [],
    setInhaleTimes: (inhaleTimes) => set((state) => ({ inhaleTimes: [...state.inhaleTimes, inhaleTimes] })),
    isComplete: false,
    toggleSessionStatus: () => set((state) => ({ isComplete: !state.isComplete })),
    sessions: [],
}));
