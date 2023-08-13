import HistoryList from "@/app/components/game/HistoryList";
import { inter } from "@/app/utils/fonts";
import Link from "next/link";

export default function Page() {
  return (
    <section className={`${inter.className} h-screen bg-slate-300`}>
      <Link href="/game">
        <button className="my-5 ml-4 btn btn-sm btn-outline">back</button>
      </Link>

      <HistoryList />
    </section>
  );
}
