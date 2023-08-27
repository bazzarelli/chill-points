"use client";

import HistoryList from "@/app/components/game/HistoryList";
import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <section className={`${inter.className} h-screen`}>
      <button
        onClick={handleBack}
        className="my-4 ml-4 btn btn-sm btn-info btn-outline"
      >
        {msg.back}
      </button>

      <HistoryList />
    </section>
  );
}
