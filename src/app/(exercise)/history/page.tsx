"use client";

import HistoryList from "@/app/components/history/HistoryList";
import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <section className="h-screen mx-auto w-full">
      <button
        onClick={handleBack}
        className="my-2 ml-1 md:ml-0 btn btn-sm btn-link"
      >
        <NavArrowBackIcon
          className="inline-block fill-info"
          width={32}
          height={32}
        />
      </button>

      <HistoryList />
    </section>
  );
}
