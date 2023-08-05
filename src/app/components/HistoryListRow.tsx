"use client";

import RarrowIcon from "@/app/components/svg/RarrowIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";

export default function HistoryListRow() {
  const sessionsData = useBreathSessionStore((state) => state.sessionsData);

  return (
    <>
      {sessionsData.map((session) => (
        <div
          key={session.id}
          className="flex border border-b-0 border-slate-400 bg-gray-200 py-1 text-gray-500"
        >
          <div className="h-5 w-6/12 pl-2">{session.date}</div>
          <div className="h-5 w-5/12 pl-2">{session.cycleCount} bpm</div>
          <div className="h-5 w-1/12">
            <RarrowIcon className="inline-block" width={15} height={15} />
          </div>
        </div>
      ))}
    </>
  );
}
