import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";

type RenderTimeProps = {
  remainingTime: number;
};

const ClockText = function ({ children }: { children: string }) {
  return <div className="text-4xl text-sky-300/90">{children}</div>;
};

const renderTime = ({ remainingTime }: RenderTimeProps) => {
  if (remainingTime === 0) {
    return <ClockText>Done</ClockText>;
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
  const timerComplete = useBreathSessionStore(
    (state) => state.setSessionStatus,
  );

  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      updateInterval={0}
      strokeWidth={4}
      trailStrokeWidth={10}
      size={160}
      trailColor={"#1b2533"}
      colors={"#10b981"}
      onComplete={() => {
        timerComplete(true); // set state
        ({ shouldRepeat: false });
      }}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}
