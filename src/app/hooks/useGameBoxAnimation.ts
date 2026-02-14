"use client";

import BOX_ANIM, { BoxAnim } from "@/app/utils/boxAnimation";
import { useAnimate } from "framer-motion";
import { useCallback } from "react";

export function useGameBoxAnimation() {
  const [boxscope, animate] = useAnimate();

  const runBoxAnimation = useCallback(
    (duration: number, boxAnim: BoxAnim) => {
      return animate(boxscope.current, { ...boxAnim }, { duration });
    },
    [animate, boxscope],
  );

  const animateGrow = useCallback(
    (duration: number) => runBoxAnimation(duration, BOX_ANIM.GROW),
    [runBoxAnimation],
  );

  const animateShrink = useCallback(
    (duration: number) => runBoxAnimation(duration, BOX_ANIM.SHRINK),
    [runBoxAnimation],
  );

  const animateCancel = useCallback(
    () => runBoxAnimation(1, BOX_ANIM.CANCEL),
    [runBoxAnimation],
  );

  const animateReset = useCallback(
    () => runBoxAnimation(1, BOX_ANIM.RESET),
    [runBoxAnimation],
  );

  const animateFinish = useCallback(
    () => runBoxAnimation(1, BOX_ANIM.FINISH),
    [runBoxAnimation],
  );

  return {
    boxscope,
    animateGrow,
    animateShrink,
    animateCancel,
    animateReset,
    animateFinish,
  };
}
