"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { useState } from "react";

export default function SettingsModal() {
  const {
    userCycleSpeed,
    userGameLength,
    setUserCycleSpeed,
    setUserGameLength,
  } = useBreathSessionStore();
  const [breathCycleRange, setBreathCycleRange] = useState(userCycleSpeed);
  const [gameLengthRange, setGameLengthRange] = useState(userGameLength);

  function handleBreathCycleRangeChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    console.log(event.target.value);
    const cycleSpeed = parseInt(event.target.value, 10);
    setBreathCycleRange(cycleSpeed); // update the UI
    setUserCycleSpeed(cycleSpeed); // update the state
  }

  function handleGameLengthRangeChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    console.log(event.target.value);
    const gameLength = parseInt(event.target.value, 10);
    setGameLengthRange(gameLength); // update the UI
    setUserGameLength(gameLength); // update the state
  }

  return (
    <dialog id="settings_modal" className="modal text-left">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Game settings</h3>

        <section className="py-4">
          <span className="mb-2 text-sm">Breath cycle (inhale/exhale)</span>
          <input
            onChange={handleBreathCycleRangeChange}
            type="range"
            min={3}
            max={5}
            value={breathCycleRange}
            className="range range-xs range-info"
            step={1}
            aria-labelledby="Breath cycle range picker"
          />
          <div className="w-full flex justify-between text-sm px-2">
            <span>{msg.short}</span>
            <span>{msg.med}</span>
            <span>{msg.long}</span>
          </div>
        </section>

        <section className="pb-4">
          <span className="mb-2 text-sm text capitalize">
            {msg.game_minutes}
          </span>
          <input
            onChange={handleGameLengthRangeChange}
            type="range"
            min={1}
            max={5}
            value={gameLengthRange}
            className="range range-xs range-info"
            step={1}
            aria-labelledby="Game length range picker"
          />
          <div className="w-full flex justify-between text-sm px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </section>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
