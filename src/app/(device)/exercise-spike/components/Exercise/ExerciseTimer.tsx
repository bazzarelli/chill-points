import React, { useState, useEffect } from "react";
import '../../CSS/ExerciseAnimation.css';

type ExerciseTimerProps = {
  instructions: string,
  duration: number,
}

export default function ExerciseTimer({ instructions, duration }: ExerciseTimerProps) {
  const durMS = (duration * 6000);

  const [clock, setClock] = useState(duration);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    intervalId = setInterval(() => setClock(clock + 1), 10);

    return () => clearInterval(intervalId);
  }, [clock]);

  const time = clock < 100 ? durMS : durMS - clock;
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  return (
    <div className="mx-auto w-1/3 text-center">
      <div className="card bg-base-100 shadow-xl text-center h-full">
        <div className="card-bod justify-center mt-4 mb-4 h-full">
          <h2 className="card-title text-slate-500 justify-center">Excercise Timer</h2>
          <h2 className="card-title text-slate-500 justify-center">{instructions}</h2>
          <div className="card-title text-8xl justify-center items-center h-full">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  )
}