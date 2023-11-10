"use client";

import Badge from "@/app/components/game/Badge";
import WeeklyGoal from "@/app/components/history/WeeklyGoal";
import NavArrowBackIcon from "@/app/components/svg/NavArrowBackIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Link } from "nextjs13-progress";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleBack = () => router.back();
  const NUM_BADGE_TYPES = 5;
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
      className="h-screen mx-auto w-full
        bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] 
      from-sky-600 to-slate-700/20"
    >
      <button onClick={handleBack} className="my-2 btn btn-sm btn-link">
        <NavArrowBackIcon
          className="inline-block fill-info"
          width={32}
          height={32}
        />
      </button>
      <div className="w-full bg-gray-300">
        <h2 className="p-2 text-xl text-gray-500">{msg.your_badges}</h2>
        {badgeCountData && Object.keys(badgeCountData).length > 0 ? (
          <>
            <div className="flex flex-row flex-wrap bg-white justify-start">
              {[...Array(NUM_BADGE_TYPES)].map((_, i) => (
                <div key={i}>
                  {badgeCountData[i + 1] && (
                    <div className="w-24 p-4 text-center">
                      <Badge time={i + 1} count={badgeCountData[i + 1]} />
                      <span className="text-gray-400 text-sm inline-block">
                        {i + 1} min
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-2 text-sm text-gray-500">
              Total Chill Points: {gameLengthTotal}
            </div>
          </>
        ) : (
          <h4 className="text-gray-700 font-semibold p-2">No badges yet</h4>
        )}
      </div>
      <div>
        {status === "authenticated" ? (
          <WeeklyGoal
            userMinutesGoal={userMinutesGoal}
            gameLengthTotal={gameLengthTotal}
          />
        ) : (
          <p className="p-2 text-slate-700">
            Create a profile to set goals and see your history.
            <button className="btn btn-sm my-2 block">
              <Link href="/profile">GO ➤</Link>
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
