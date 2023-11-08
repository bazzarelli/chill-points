import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import "server-only";

export default function useSaveGameSession() {
  const { userGameLength, gameName, inhaleTimes, cycleCount } =
    useBreathSessionStore();

  return async function dbSaveSessionData() {
    try {
      await fetch("/game/api", {
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
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
}
