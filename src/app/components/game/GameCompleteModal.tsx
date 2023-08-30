"use client";

import SnowflakeIcon from "@/app/components/svg/SnowflakeIcon";
import { useBreathSessionStore } from "@/app/hooks/useBreathSessionStore";
import { msg } from "@/app/i18n/frog-msg";
import Link from "next/link";
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";

const slate100 = colors.slate[100];

export default function GameCompleteModal() {
  const {
    cycleCount,
    userGameLength,
    userCycleSpeed,
    gameName,
    setIsCompleteStatus,
  } = useBreathSessionStore();
  const [badgeColor, setBadgeColor] = useState<BadgeColor>("slate");
  // if the tailwind color classes are not in code they are purged
  // dynamic class names not possible w/o this hack
  const badgePossibly = [
    "from-fuchsia-700",
    "to-fuchsia-500",
    "from-amber-700",
    "to-amber-500",
    "from-blue-700",
    "to-blue-500",
    "from-slate-700",
    "to-slate-500",
  ];
  type BadgeColor = "fuchsia" | "amber" | "blue" | "slate";

  const handleClose = () => {
    // game is over, prevent modal from reopening
    setIsCompleteStatus(false);
  };

  useEffect(() => {
    const calculateBadgeColor = (): BadgeColor => {
      if (userCycleSpeed === 5 && cycleCount > 2 && cycleCount <= 6) {
        return "fuchsia";
      } else if (userCycleSpeed === 4 && cycleCount > 6 && cycleCount <= 8) {
        return "amber";
      } else if (userCycleSpeed === 3 && cycleCount > 8) {
        return "blue";
      } else {
        return "slate";
      }
    };

    setBadgeColor(calculateBadgeColor());
  }, [cycleCount]);

  return (
    <dialog id="game_complete_modal" className="modal text-left">
      <form method="dialog" className="modal-box bg-sky-300/90 rounded-md">
        {cycleCount > 0 && (
          <>
            <h2 className="text-xl text-slate-800 col-span-6">{`${gameName} exercise`}</h2>
            <section className="my-2">
              <button
                className={`btn btn-circle border-none bg-gradient-to-b from-${badgeColor}-700 to-${badgeColor}-500 mr-2 shadow-lg`}
              >
                <SnowflakeIcon width={34} height={34} fill={slate100} />
              </button>
            </section>
            <p className="text-slate-800">
              {cycleCount} {msg.breath_cycles_completed}
            </p>
            <p className="text-slate-800">
              {userGameLength}{" "}
              {userGameLength > 1
                ? msg.chillpoints_earned
                : msg.chillpoint_earned}
            </p>
            <p className="text-slate-800">
              <Link href="/history">{msg.view_history}</Link>
            </p>
          </>
        )}
      </form>
      <form method="dialog" className="modal-backdrop bg-slate-950/30">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
