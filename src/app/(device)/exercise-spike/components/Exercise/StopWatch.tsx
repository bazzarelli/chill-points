import React, { useState, useEffect } from "react";
import '../../CSS/ExerciseAnimation.css';

enum WATCH_STATUS {
  READY,
  RUNNING,
  DONE,
};

type StopWatchProps = {
  duration: number,
};

export default function StopWatch({ duration }: StopWatchProps) {
  const durMS = (duration * 6000);
  const [clock, setClock] = useState(duration);
  const [clockStatus, setClockStatus] = useState(WATCH_STATUS.READY);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    intervalId = setInterval(() => {
      if (clock > durMS) {
        setClockStatus(WATCH_STATUS.DONE);
        return;
      }

      if (clock > 100) setClockStatus(WATCH_STATUS.RUNNING);

      setClock(clock + 1);
    }, 10);

    return () => clearInterval(intervalId);
  }, [clock]);

  const getDisplayTime = (time: number): string => {
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const WatchContent = {
    [WATCH_STATUS.READY]: getDisplayTime(durMS),
    [WATCH_STATUS.RUNNING]: getDisplayTime(durMS - clock),
    [WATCH_STATUS.DONE]: getDisplayTime(0),
  }

  return (
    <div className="card-title text-8xl justify-center items-center h-full">
      {WatchContent[clockStatus]}
    </div>
  )
}