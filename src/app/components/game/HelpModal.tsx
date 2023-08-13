"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { useState } from "react";

export default function HelpModal() {
  const { setCycleSpeed, resetAll } = useBreathSessionStore();
  const [range, setRange] = useState(5);

  function handleRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    const cycleSpeed = parseInt(event.target.value, 10);
    setRange(cycleSpeed);
    setCycleSpeed(cycleSpeed);
  }

  return (
    <dialog id="help_modal" className="modal">
      <form method="dialog" className="modal-box text-left">
        <h3 className="font-bold text-lg">Game settings</h3>

        <section className="py-4">
          <span className="mb-2 text-sm">
            Breath cycle speed (inhale/exhale)
          </span>
          <input
            onChange={handleRangeChange}
            type="range"
            min={3}
            max={5}
            value={range}
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
          <p className="mb-2 text-sm">Erase game sessions from history.</p>
          <button onClick={resetAll} className="btn btn-sm btn-outline">
            Clear History
          </button>
        </section>

        <div className="modal-action">
          <button className="btn btn-sm btn-outline">Close</button>
        </div>
      </form>
    </dialog>
  );
}
