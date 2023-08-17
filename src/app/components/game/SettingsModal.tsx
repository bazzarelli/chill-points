"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import Link from "next/link";
import { useState } from "react";

export default function SettingsModal() {
  const { setCycleSpeed, setGameLength } = useBreathSessionStore();
  const [breathCycleRange, setBreathCycleRange] = useState(3);
  // const [gameLengthRange, setGameLengthRange] = useState(1);

  function handleBreathCycleRangeChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    console.log(event.target.value);
    const cycleSpeed = parseInt(event.target.value, 10);
    setBreathCycleRange(cycleSpeed); // update the UI
    setCycleSpeed(cycleSpeed); // update the state
  }

  // function handleGameLengthRangeChange(
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) {
  //   console.log(event.target.value);
  //   const gameLength = parseInt(event.target.value, 10);
  //   setGameLengthRange(gameLength); // update the UI
  //   setGameLength(gameLength); // update the state
  // }

  return (
    <dialog id="settings_modal" className="modal text-left">
      <form method="dialog" className="modal-box">
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
            className="range range-xs range-info"
            step={1}
          />
          <div className="w-full flex justify-between text-sm px-2">
            <span>short</span>
            <span>med</span>
            <span>long</span>
          </div>
        </section>

        {/* <section className="pb-4">
          <span className="mb-2 text-sm text font-semibold">Game minutes</span>
          <input
            onChange={handleGameLengthRangeChange}
            type="range"
            min={1}
            max={5}
            value={gameLengthRange}
            className="range range-xs range-info"
            step={1}
          />
          <div className="w-full flex justify-between text-sm px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </section> */}

        <section className="pb-4">
          <Link href="/history">
            <span>{msg.view_history}</span>
          </Link>
        </section>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
