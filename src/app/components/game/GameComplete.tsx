"use client";

import BreathSessionGraph from "@/app/components/history/BreathSessionGraph";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import calculateInhaleTimeDiff from "@/app/utils/calculateInhaleTimeDiff";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GameCompleteModal() {
  const { cycleCount, userGameLength, gameName, inhaleTimes } =
    useBreathSessionStore();
  const { data: session, status } = useSession();

  return (
    <>
      {cycleCount && (
        <div className="relative bg-gradient-to-b p-4 w-full text-slate-300 text-left">
          <h2 className="text-lg">{`${gameName} ${msg.exercise}`}</h2>
          <p>
            {userGameLength} {msg.badge_earned}
          </p>
          <p>
            {cycleCount} {msg.breath_cycles_completed}
          </p>
          {status === "authenticated" && inhaleTimes ? (
            <div className="relative -left-6">
              <BreathSessionGraph data={calculateInhaleTimeDiff(inhaleTimes)} />
            </div>
          ) : (
            <p className="mt-2">
              <p>Track your progress with an account.</p>
              <ul className="list-disc ml-6 mt-2 text-sm">
                <li>Set Weekly Goals</li>
                <li>Collect Chill Point Badges</li>
                <li>View History with visual breath charts</li>
              </ul>
              <Link href="/profile">
                <button className="btn btn-primary mt-5 w-full">
                  Create Account
                </button>
              </Link>
            </p>
          )}
        </div>
      )}
      {/* <div className="pl-4">
        <button className="border-orange-400/80 border-2 px-2 py-1 my-5 rounded-lg text-sm text-slate-800 bg-fuchsia-200/80">
          <Link href="/survey">Feedback</Link>
        </button>
      </div> */}
    </>
  );
}
