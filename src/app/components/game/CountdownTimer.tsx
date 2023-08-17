"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { ReactNode } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type RenderTimeProps = {
  remainingTime: number;
};

const ClockText = function ({ children }: { children: string | ReactNode }) {
  return <div className="text-2xl text-sky-300/70">{children}</div>;
};

const renderTime = ({ remainingTime }: RenderTimeProps) => {
  if (remainingTime === 0) {
    return <ClockText>done</ClockText>;
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
  const timeFormatted = minutes
    ? `${minutes}:${secondsFormatted}`
    : `${secondsFormatted}`;

  return <ClockText>{timeFormatted}</ClockText>;
};

type CountdownTimerProps = {
  duration: number;
  isPlaying: boolean;
};

export default function CountdownTimer({
  duration,
  isPlaying,
}: CountdownTimerProps) {
  const { setIsCompleteStatus } = useBreathSessionStore();
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      updateInterval={0}
      strokeWidth={3}
      trailStrokeWidth={8}
      size={96}
      trailColor={"#1b2533"}
      colors={"#4eacd5"}
      onComplete={() => {
        setIsCompleteStatus(true); // set state
        ({ shouldRepeat: false });
      }}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}
