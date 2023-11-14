import { GameLengthData } from "@/app/types";
import { useEffect, useState } from "react";

export default function useFetchProfileData() {
  const [gameLengthCount, setGameLengthCount] = useState<GameLengthData>(
    {} as GameLengthData,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    async function fetchProfileData() {
      setIsLoading(true);
      try {
        const response = await fetch("/profile/api");
        const data = await response.json();
        console.log("Fetched profile data~~~>", data);
        setGameLengthCount(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  return { gameLengthCount, isLoading, error };
}
