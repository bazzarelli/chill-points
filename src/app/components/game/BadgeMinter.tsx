"use client";

import Badge from "@/app/components/game/Badge";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import triggerExplosionAnimation from "@/app/utils/explosionAnimation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useSound from "use-sound";

type RenderTimeProps = {
  remainingTime: number;
};

type CountdownTimerProps = {
  isPlaying: boolean;
  coords: {
    x: number;
    y: number;
  };
};

export default function BadgeMinter({
  isPlaying,
  coords,
}: CountdownTimerProps) {
  const { userGameLength, cycleCount, dotCountTotal } = useBreathSessionStore();
  const [isWorthy, setIsWorthy] = useState(false);

  const [playGongSound] = useSound("/sounds/gong.mp3", {
    volume: 0.65,
  });

  useEffect(() => {
    if (cycleCount / dotCountTotal > 0.8) {
      setIsWorthy(true);
    }
  }, [cycleCount, dotCountTotal]);

  const badgeAward = ({ remainingTime }: RenderTimeProps) => {
    if (remainingTime === 0) {
      return (
        <Link href="/badges">
          <div className="w-20 h-20 bg-gradient-radial from-yellow-200 from-40% via-red-500 via-50% to-amber-900 to-95% rounded-full flex items-center justify-center">
            {isWorthy ? <Badge time={userGameLength} /> : <Badge time={0} />}
          </div>
        </Link>
      );
    }

    return (
      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-red-600"></span>
      </div>
    );
  };

  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={2}
      updateInterval={0}
      strokeWidth={4}
      trailStrokeWidth={4}
      size={88}
      trailColor={"#E2C2FF"}
      colors={"#B3001B"}
      onComplete={() => {
        playGongSound();
        triggerExplosionAnimation(coords);
        ({ shouldRepeat: false });
      }}
    >
      {badgeAward}
    </CountdownCircleTimer>
  );
}
