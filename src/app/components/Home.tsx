import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import Link from "next/link";

import GameInstructions from "./game/GameInstructions";

export default function Home() {
  return (
    <main
      className={`${inter.className} w-96 mx-auto mt-1 md:mt-12 text-slate-400 p-4`}
    >
      <h1 className="text-2xl mb-4">{msg.intro_hook}</h1>

      <Link href="/game">
        <button className="btn btn-sm btn-info drop-shadow-md">
          {msg.start}
        </button>
      </Link>

      <GameInstructions />
    </main>
  );
}
