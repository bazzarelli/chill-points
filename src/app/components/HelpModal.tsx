"use client";

import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";

export default function HelpModal() {
  const clearHistory = useBreathSessionStore((state) => state.resetAll);

  return (
    <dialog id="help_modal" className="modal">
      <form method="dialog" className="modal-box text-left">
        <h3 className="font-bold text-lg">Game settings</h3>
        <div className="py-4">
          <p className="mb-2 text-sm">Erase game sessions from history.</p>
          <button onClick={clearHistory} className="btn btn-sm btn-outline">
            Clear History
          </button>
        </div>
        <p className="pb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="modal-action">
          <button className="btn btn-sm btn-outline">Close</button>
        </div>
      </form>
    </dialog>
  );
}
