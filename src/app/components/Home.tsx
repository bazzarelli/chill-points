import { inter } from "@/app/utils/fonts";
import Link from "next/link";

import GameInstructions from "./game/GameInstructions";

export default function Home() {
  return (
    <main
      className={`${inter.className} w-96 mx-auto mt-1 md:mt-12 text-slate-400 p-4`}
    >
      <h1 className="text-2xl">Chill-a-minute</h1>
      <p className="mb-4">A short breathing game.</p>

      <Link href="/game">
        <button className="btn btn-sm btn-info drop-shadow-md">
          <span className="text-base">Start</span>
          <svg
            fill="rgb(48,28,39)"
            viewBox="0 -960 960 960"
            width="16"
            height="16"
          >
            <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
          </svg>
        </button>
      </Link>

      <GameInstructions />
    </main>
  );
}
