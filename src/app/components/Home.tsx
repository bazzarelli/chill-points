import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import Link from "next/link";

import GameInstructions from "./game/GameInstructions";

export default function Home() {
  return (
    <main className={`${inter.className} w-96 mx-auto text-slate-400 px-4`}>
      <h1 className="text-2xl text-sky-300 ml-0 m-4 pt-4 border-sky-300 border-t-[10px] text-right">
        {msg.intro_hook}
      </h1>

      <Link href="/game">
        <div className="text-right pr-4">
          <button className="btn btn-sm btn-info drop-shadow-md">
            {msg.start}
          </button>
        </div>
      </Link>

      <GameInstructions />
    </main>
  );
}
