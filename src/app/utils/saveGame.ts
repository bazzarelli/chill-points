import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { cache } from "react";
import "server-only";

export default function useSaveGameSession() {
  const {
    userGameLength,
    gameName,
    inhaleTimes,
    cycleCount,
    setBreathSessionDataCache,
  } = useBreathSessionStore();

  return async function dbSaveSessionData() {
    try {
      const res = await fetch("/game/api", {
        method: "POST",
        body: JSON.stringify({
          gameName,
          inhaleTimes,
          cycleCount,
          gameLength: userGameLength,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setBreathSessionDataCache([data]);
        console.log("game id:", data.id);
      } else {
        console.error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
}
