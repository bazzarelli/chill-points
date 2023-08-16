import RarrowIcon from "@/app/components/svg/RarrowIcon";
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
          <RarrowIcon width={16} height={16} fill={`rgb(48,28,39)`} />
        </button>
      </Link>

      <GameInstructions />
    </main>
  );
}
