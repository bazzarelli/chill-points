"use client";

import Badge from "@/app/components/game/Badge";
import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { inter } from "@/app/utils/fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleBack = () => router.back();
  const NUM_BADGE_TYPES = 5;
  const DAYS_IN_WEEK = 7;
  const { breathSessionData, userMinutesGoal } = useBreathSessionStore();

  /**
   * Returns array of gameLength objs
   * [{gameLength: 2},{gameLength: 1}]
   */
  const gameLengthData: { gameLength: number }[] = breathSessionData
    .filter((session) => session.gameName === "Equal Breathing")
    .map((session) => ({
      gameLength: session.gameLength,
    }));

  const gameLengthTotal = gameLengthData.reduce((acc, cur) => {
    return cur.gameLength + acc;
  }, 0);

  /**
   * Returns the badge count data
   * {1:1, 2:3, 3:2}
   * means 1 badge of 1 min, 3 badges of 2 min, 2 badges of 3 min
   */
  const badgeCountData: { [key: number]: number } = gameLengthData.reduce(
    (acc: { [key: number]: number }, cur) => {
      acc[cur.gameLength] = (acc[cur.gameLength] || 0) + 1;
      return acc;
    },
    {},
  );

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
      <div className="w-full bg-gray-300">
        <h2 className="p-2 text-2xl text-gray-500">{msg.your_badges}</h2>
        <div className="flex flex-row flex-wrap bg-white justify-start">
          {[...Array(NUM_BADGE_TYPES)].map((_, i) => (
            <>
              {badgeCountData[i + 1] && (
                <div key={i} className="w-24 p-4 text-center">
                  <Badge time={i + 1} count={badgeCountData[i + 1]} />
                  <span className="text-gray-400 text-sm inline-block">
                    {i + 1} min
                  </span>
                </div>
              )}
            </>
          ))}
        </div>
        {status === "authenticated" && (
          <>
            <h2 className="py-1 pl-2 text-gray-500">
              {msg.badge_goal_progress}
            </h2>
            <div className="bg-white pl-2 py-3">
              <progress
                className="progress progress-primary w-56"
                value={gameLengthTotal}
                max={userMinutesGoal * DAYS_IN_WEEK}
              ></progress>
              <span className="text-gray-500 pl-4">
                {gameLengthTotal} of {userMinutesGoal * DAYS_IN_WEEK}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
