import SnowflakeIcon from "@/app/components/svg/SnowflakeIcon";
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
  shadow?: boolean;
};

export default function Badge({ time, count, shadow }: BadgeProps) {
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
    <div className="indicator">
      {count ? (
        <span className="indicator-item badge badge-info">{count}</span>
      ) : null}
      <button
        className={`btn btn-circle border-none bg-gradient-to-b from-${
          badgeColors[time]
        }-700 to-${badgeColors[time]}-500 ${
          shadow ? "shadow-slate-100/80 shadow-lg" : ""
        }`}
      >
        <SnowflakeIcon width={36} height={36} fill={slate100} />
      </button>
    </div>
  );
}
