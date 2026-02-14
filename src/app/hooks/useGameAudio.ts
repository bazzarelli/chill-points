"use client";

import useSound from "use-sound";

export function useGameAudio() {
  const [playAwardSound] = useSound("/sounds/retro-award.mp3", {
    volume: 0.4,
  });
  const [playErrorSound] = useSound("/sounds/retro-error.mp3", {
    volume: 0.4,
  });

  return {
    playAwardSound,
    playErrorSound,
  };
}
