"use client";

import HistoryListRow from "@/app/components/HistoryListRow";

export default function HistoryList() {
  return (
    <div className="mx-auto w-full bg-gray-400 text-left opacity-80 md:w-1/2  lg:w-1/3">
      <h2 className="p-2 text-2xl text-gray-100">Chill-a-min History</h2>
      <div className="flex bg-gray-300 font-semibold text-gray-500">
        <div className="h-7 w-1/2 pl-2">Date</div>
        <div className="h-7 w-1/2 pr-2">respiratory rate</div>
      </div>
      <HistoryListRow />
    </div>
  );
}
