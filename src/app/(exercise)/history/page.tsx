"use client";

import HistoryList from "@/app/components/history/HistoryList";
import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import { inter } from "@/app/utils/fonts";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <section
      className={`${inter.className} h-screen mx-auto w-full md:w-1/2 lg:w-1/3`}
    >
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
