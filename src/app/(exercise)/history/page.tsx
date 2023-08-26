"use client";

import HistoryList from "@/app/components/game/HistoryList";
import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleBack = () => router.back();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/history");
    },
  });

  return (
    <section className={`${inter.className} h-screen`}>
      <button
        onClick={handleBack}
        className="my-5 ml-4 btn btn-sm btn-info btn-outline"
      >
        {msg.back}
      </button>

      <HistoryList />
    </section>
  );
}
