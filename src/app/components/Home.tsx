import { msg } from "@/app/i18n/frog-msg";
import { Link } from "nextjs13-progress";

import GameInstructions from "./game/GameInstructions";

export default function Home() {
  return (
    <main className="text-slate-400 px-2 border-sky-300 border-t-[10px]">
      <div className="px-4">
        <h1 className="text-2xl text-sky-300 py-4 text-right">
          {msg.intro_hook}
        </h1>

        <Link href="/game">
          <div className="text-right">
            <button className="btn btn-sm btn-primary">{msg.start}</button>
          </div>
        </Link>

        <GameInstructions />
      </div>
    </main>
  );
}
