import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data });
}

const data = [
  {
    exerciseId: "free",
    title: "Free Form Session",
    subtitle:
      "Gather heart rate data while practicing your own breathing techniques.",
    description:
      "Choose your own breathing technique, and practice it for as long as you want. You can use this session to practice any breathing technique you want, and gather heart rate data while doing so.",
    category: "free",
    image: "",
    video: "",
  },
  {
    exerciseId: "478",
    title: "4-7-8 Breathing",
    subtitle: "De-escalate with this popular enlongated exhale technique.",
    description:
      "4-7-8 breathing is a popular breathing technique that involves inhaling for 4 seconds, holding your breath for 7 seconds, and exhaling for 8 seconds. This technique is great for de-escalating, and calming yourself down.",
    category: "calm",
    image: "",
    video: "",
  },
  {
    exerciseId: "equal",
    title: "Equal Breathing",
    subtitle:
      "Simple and effective technique to bring balance between fight/flight & rest/digest.",
    description:
      "Equal breathing is a simple and effective technique to bring balance between fight/flight & rest/digest. It involves inhaling for 4 seconds, and exhaling for 4 seconds. This technique is great for de-escalating, and calming yourself down.",
    category: "balance",
    image: "",
    video: "",
  },
  {
    exerciseId: "resonant",
    title: "Resonant Breathing",
    subtitle:
      "Slow down to 10 breath cycles per minute to bring breath and heart into sync.",
    description:
      "Resonant breathing is a technique used to bring your breath and heart into sync. It involves breathing at a rate of 10 breath cycles per minute. This is a great technique to use when you are feeling stressed, or need to calm down.",
    category: "balance",
    image: "",
    video: "",
  },
  {
    exerciseId: "sigh",
    title: "Physiological sigh",
    subtitle: "One of the quickest real-time stress reliever technique.",
    description:
      "The physiological sigh is a technique used to relieve stress. It involves taking a deep breath in, and exhaling with a sigh. This is a great technique to use when you are feeling stressed, or need to calm down.",
    category: "calm",
    image: "",
    video: "",
  },
  {
    exerciseId: "fire",
    title: "Breath of Fire",
    subtitle: "Turn up the intensity with a heat building breath technique.",
    description:
      "Breath of fire is a technique used to build heat in the body. It involves taking quick, short breaths through the nose. This is a great technique to use when you are feeling sluggish, or need to build heat in the body.",
    category: "energize",
    image: "",
    video: "",
  },
  {
    exerciseId: "hold",
    title: "Breath Hold",
    subtitle:
      "Hold your breath to build CO2 tolerance and increase oxygenation.",
    description:
      "Breath hold is a technique used to build CO2 tolerance and increase oxygenation. It involves taking a deep breath in, and holding your breath for as long as you can. This is a great technique to use when you are feeling sluggish, or need to build heat in the body.",
    category: "balance",
    image: "",
    video: "",
  },
  {
    exerciseId: "box",
    title: "Box Breathing",
    subtitle:
      "Bring balance to your metabolic system by cycling 4 equally timed breaths.",
    description:
      "Box breathing is a technique used to calm yourself down, and bring balance to your metabolic system. It involves taking 4 equally timed breaths, and holding your breath in between each breath. This is a great technique to use when you are feeling stressed, or need to calm down.",
    category: "balance",
    image: "",
    video: "",
  },
  {
    exerciseId: "diaphram",
    title: "Diaphramatic Breathing",
    subtitle:
      "Breathe into your belly to activate your parasympathetic nervous system.",
    description:
      "Diaphramatic breathing is a technique used to activate your parasympathetic nervous system. It involves breathing into your belly, and expanding your diaphragm. This is a great technique to use when you are feeling stressed, or need to calm down.",
    category: "calm",
    image: "",
    video: "",
  },
  {
    exerciseId: "alternate",
    title: "Alternate Nostril Breathing",
    subtitle:
      "Balance your nervous system by alternating breath between nostrils.",
    description:
      "Alternate nostril breathing is a technique used to balance your nervous system. It involves alternating breath between nostrils. This is a great technique to use when you are feeling stressed, or need to calm down.",
    category: "balance",
    image: "",
    video: "",
  },
];
