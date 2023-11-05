import SnowflakeIcon from "@/app/components/svg/SnowflakeIcon";
import Image from "next/image";
import colors from "tailwindcss/colors";

// if the tailwind classes are not in code they are purged
// dynamic class names not possible w/o this hack
const _possible_classes = [
  "from-emerald-700",
  "to-emerald-500",
  "from-violet-700",
  "to-violet-500",
  "from-fuchsia-700",
  "to-fuchsia-500",
  "from-amber-700",
  "to-amber-500",
  "from-blue-700",
  "to-blue-500",
  "from-slate-700",
  "to-slate-500",
];

type BadgeProps = {
  time: number;
  count?: number;
};

export default function Badge2({ time, count }: BadgeProps) {
  const slate100 = colors.slate[100];
  type BadgeColor =
    | "slate"
    | "fuchsia"
    | "amber"
    | "blue"
    | "violet"
    | "emerald";

  const badgeColors: BadgeColor[] = [
    "slate",
    "fuchsia",
    "violet",
    "amber",
    "blue",
    "emerald",
  ];

  return (
    <div className="indicator mt-5">
      {count ? (
        <span className="indicator-item badge badge-info">{count}</span>
      ) : null}
      <div
        className={`border-none rounded-lg bg-gradient-to-b 
          from-${badgeColors[time]}-700 to-${badgeColors[time]}-500 shadow-slate-100/80 shadow-lg`}
      >
        <Image
          alt="Chill Points Badge"
          src="/images/chill-badge.png"
          width={72}
          height={72}
        />
      </div>
    </div>
  );
}
