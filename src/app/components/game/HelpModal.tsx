"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { useState } from "react";

export default function HelpModal() {
  const { setCycleSpeed, setGameLength, resetAll } = useBreathSessionStore();
  const [breathCycleRange, setBreathCycleRange] = useState(5);
  const [gameLengthRange, setGameLengthRange] = useState(1);

  function handleBreathCycleRangeChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    console.log(event.target.value);
    const cycleSpeed = parseInt(event.target.value, 10);
    setBreathCycleRange(cycleSpeed); // update the UI
    setCycleSpeed(cycleSpeed); // update the state
  }

  function handleGameLengthRangeChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    console.log(event.target.value);
    const gameLength = parseInt(event.target.value, 10);
    setGameLengthRange(gameLength); // update the UI
    setGameLength(gameLength); // update the state
  }

  return (
    <dialog id="help_modal" className="modal text-left">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>

        <h3 className="font-bold text-lg">Game settings</h3>

        <section className="py-4">
          <span className="mb-2 text-sm font-semibold">
            Breath cycle speed (inhale/exhale)
          </span>
          <input
            onChange={handleBreathCycleRangeChange}
            type="range"
            min={3}
            max={5}
            value={breathCycleRange}
            className="range range-xs range-accent"
            step={1}
          />
          <div className="w-full flex justify-between text-sm px-2">
            <span>short</span>
            <span>med</span>
            <span>long</span>
          </div>
        </section>

        <section className="pb-4">
          <span className="mb-2 text-sm text font-semibold">Game minutes</span>
          <input
            onChange={handleGameLengthRangeChange}
            type="range"
            min={1}
            max={5}
            value={gameLengthRange}
            className="range range-xs range-accent"
            step={1}
          />
          <div className="w-full flex justify-between text-sm px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </section>

        <section className="pb-4">
          <p className="mb-2 text-sm text-red-700 font-semibold">
            Erase game sessions from history.
          </p>
          <button onClick={resetAll} className="btn btn-sm btn-outline">
            Clear History
          </button>
        </section>
      </form>
    </dialog>
  );
}
