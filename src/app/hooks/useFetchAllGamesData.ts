import { BreathSessionData } from "@/app/types";
import { useEffect, useState } from "react";

export default function useFetchAllGamesData() {
  const [breathSessionData, setBreathSessionData] = useState<
    BreathSessionData[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    async function fetchProfileData() {
      setIsLoading(true);
      try {
        const response = await fetch("/badges/api");
        const data = await response.json();
        setBreathSessionData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  return { breathSessionData, isLoading, error };
}
