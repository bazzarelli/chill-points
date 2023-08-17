import { inter } from "@/app/utils/fonts";
import Link from "next/link";

import GameInstructions from "./game/GameInstructions";

export default function Home() {
  return (
    <main
      className={`${inter.className} w-96 mx-auto mt-1 md:mt-12 text-slate-400 p-4`}
    >
      <h1 className="text-xl mb-4">
        Calm your mind and body with a short breathing game.
      </h1>

      <Link href="/game">
        <button className="btn btn-sm btn-info drop-shadow-md">Start</button>
      </Link>

      <GameInstructions />
    </main>
  );
}
