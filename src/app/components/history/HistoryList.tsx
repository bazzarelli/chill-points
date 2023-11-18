"use client";

import RarrowIcon from "@/app/components/svg/RarrowIcon";
import { msg } from "@/app/i18n/frog-msg";
import { BreathSessionData } from "@/app/types";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function HistoryList() {
  const [gameHistory, setGameHistory] = useState<BreathSessionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const take = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * take;
  // Check if visitor is logged in
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  useEffect(() => {
    async function fetchHistoryData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/history/api?skip=${skip}&take=${take}`);
        const data = await response.json();
        setGameHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistoryData();
  }, [skip]);

  function calculateBreathRate(session: BreathSessionData) {
    const { gameLength, cycleCount } = session;
    return Math.floor(cycleCount / gameLength);
  }

  return (
    <>
      <div className="w-full bg-gray-400 text-left opacity-80">
        {isLoading ? (
          <div className="text-center pt-1">
            <span className="loading text-neutral loading-spinner loading-sm"></span>
          </div>
        ) : (
          <>
            <h2 className="p-2 py-1 text-xl text-gray-800">
              {msg.your_sessions}
            </h2>
            <div className="flex bg-gray-300 font-semibold text-gray-500">
              <div className="h-7 w-5/12 pl-2">{msg.date}</div>
              <div className="h-7 w-3/12">{msg.rate}</div>
              <div className="h-7 w-2/12">{msg.mins}</div>
              <div className="h-7 w-2/12"></div>
            </div>
            <div>
              {gameHistory && gameHistory.length > 0 && (
                <div>
                  {gameHistory
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )
                    .map((session) => (
                      <Link
                        key={session.createdAt}
                        href={`/history/session/${DateTime.fromISO(
                          session.createdAt,
                        )}?data=${JSON.stringify(session)}`}
                      >
                        <div
                          key={session.createdAt}
                          className="flex border border-b-0 border-slate-400 bg-gray-200 py-1 text-gray-500"
                        >
                          <div className="h-7 w-5/12 pl-2">
                            {DateTime.fromISO(
                              session.createdAt,
                            ).toLocaleString()}
                          </div>
                          <div className="h-7 w-3/12">
                            {calculateBreathRate({
                              gameName: session.gameName,
                              createdAt: session.createdAt,
                              inhaleTimes: session.inhaleTimes,
                              cycleCount: session.cycleCount,
                              gameLength: session.gameLength,
                            })}{" "}
                            {msg.bpm}
                          </div>
                          <div className="h-7 w-2/12">{session.gameLength}</div>
                          <div className="h-7 w-2/12 pr-2 text-right">
                            <RarrowIcon
                              className="inline-block"
                              width={15}
                              height={15}
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {gameHistory && gameHistory.length === 20 && (
        <div className="py-2 text-center">
          <div className="join">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="join-item btn btn-outline btn-sm"
            >
              ←
            </button>

            <button className="join-item btn btn-outline btn-sm lowercase">
              page {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="join-item btn btn-outline btn-sm"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
