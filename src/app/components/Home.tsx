import { msg } from "@/app/i18n/frog-msg";
import { Link } from "nextjs13-progress";

import GameInstructions from "./game/GameInstructions";

export default function Home() {
  return (
    <main className="text-slate-400 px-2 border-sky-300 border-t-[10px]">
      <div className="px-4">
        <h1 className="text-2xl text-sky-300 py-4 text-center px-10">
          {msg.intro_hook}
        </h1>

        <GameInstructions />

        <Link href="/game">
          <div className="text-center mt-10">
            <button className="btn btn-primary w-full">{msg.start}</button>
          </div>
        </Link>
      </div>
    </main>
  );
}
