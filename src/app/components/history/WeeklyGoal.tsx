import { msg } from "@/app/i18n/frog-msg";
import { DAYS_IN_WEEK, getWeekDateString } from "@/app/utils/date";

type WeeklyGoalProps = {
  userMinutesGoal: number;
  gameLengthTotal: number;
  handleMinutesGoalChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function WeeklyGoal({ userMinutesGoal, gameLengthTotal, handleMinutesGoalChange  }: WeeklyGoalProps) {
  return (
    <section className="p-4 text-slate-300">
      <h3 className="mb-2 font-semibold text-lg">{msg.my_goal} ({getWeekDateString()})</h3>
      <div className="mb-2 mt-4 text-sm text capitalize">
        {msg.minutes_per_day}
      </div>
      { handleMinutesGoalChange && 
        <>
          <input
            onChange={handleMinutesGoalChange}
            type="range"
            min={1}
            max={5}
            value={userMinutesGoal}
            className="range range-xs range-info"
            step={1}
          />
          <div className="w-full flex justify-between text-sm px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </>
      }
      <h2 className="py-1 pl-2 text-gray-500">{msg.badge_goal_progress}</h2>
      <div className="bg-white pl-2 py-3">
        <progress
          className="progress progress-primary w-56"
          value={gameLengthTotal}
          max={userMinutesGoal * DAYS_IN_WEEK}
        ></progress>
        <span className="text-gray-500 pl-4">
          {gameLengthTotal} of {userMinutesGoal * DAYS_IN_WEEK} completed
        </span>
      </div>
    </section>
  );
}

export default WeeklyGoal;