"use client";

import Badge from "@/app/components/game/Badge";
import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleBack = () => router.back();
  const uniqueBadgeTypeCount = 5;
  const { breathSessionData } = useBreathSessionStore();

  const gameLengthData = breathSessionData
    .filter((session) => session.gameName === "Equal Breathing")
    .map((session) => ({
      gameLength: session.gameLength,
    }));

  function getBadgeCountByGameLength(gameLength: number) {
    return gameLengthData.filter((item) => item.gameLength === gameLength);
  }

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
      <div className="w-full bg-gray-300 text-left">
        <h2 className="p-2 text-2xl text-gray-500">{msg.your_badges}</h2>
        {[...Array(uniqueBadgeTypeCount)].map((_, i) => (
          <div
            key={i}
            tabIndex={0}
            className="collapse collapse-arrow rounded-none"
          >
            <div className="bg-gray-100 text-gray-400 text-sm border border-bottom border-gray-300 pl-2 py-1">
              {i + 1} minute breath session (
              {getBadgeCountByGameLength(i + 1).length})
            </div>
            <div className="p-4 bg-white">
              <Badge time={i + 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
