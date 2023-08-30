"use client";

import BreathSessionGraph from "@/app/components/history/BreathSessionGraph";
import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import { isoDateToLocale, isoDateToLocaleWithTime } from "@/app/utils/time";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SessionDetail() {
  const router = useRouter();
  const handleBack = () => router.back();
  const searchParams = useSearchParams();
  const data: string | null = searchParams.get("data");
  let parsedData;
  if (data) parsedData = JSON.parse(data);

  return (
    <main
      className={`${inter.className} h-screen mx-auto w-full md:w-1/2 lg:w-1/3`}
    >
      <button onClick={handleBack} className="my-2 md:ml-0 btn btn-sm btn-link">
        <NavArrowBackIcon
          className="inline-block fill-info"
          width={32}
          height={32}
        />
      </button>
      <section className="flex flex-col p-4 pt-0 text-slate-200">
        <h3>
          {parsedData.gameName} {msg.exercise}
        </h3>
        <p className="text-slate-400 text-sm">
          {isoDateToLocale(parsedData.createdAt)} at{" "}
          {isoDateToLocaleWithTime(parsedData.createdAt)}
        </p>
        <p className="text-slate-400 text-sm">
          {parsedData.gameLength} {msg.minute_session}
        </p>
      </section>
      <BreathSessionGraph data={parsedData.inhaleTimes} />
    </main>
  );
}
