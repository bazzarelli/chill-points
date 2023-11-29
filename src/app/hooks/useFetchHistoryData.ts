import { BreathSessionData } from "@/app/types";
import { useEffect, useState } from "react";

type PaginationParams = {
  skip: number;
  take: number;
};

export default function useFetchHistoryData({ skip, take }: PaginationParams) {
  const [gameHistory, setGameHistory] = useState<BreathSessionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    async function fetchHistoryData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/history/api?skip=${skip}&take=${take}`);
        const data = await response.json();
        setGameHistory(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistoryData();
  }, [skip, take]);

  return { gameHistory, isLoading, error };
}
