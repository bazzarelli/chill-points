import { msg } from "@/app/i18n/frog-msg";
import { DAYS_IN_WEEK, getWeekDateString } from "@/app/utils/date";

type WeeklyGoalProps = {
  userMinutesGoal: number;
  gameLengthTotal: number;
  handleMinutesGoalChange: React.ChangeEventHandler<HTMLInputElement>;
};

function WeeklyGoal({
  userMinutesGoal,
  gameLengthTotal,
  handleMinutesGoalChange,
}: WeeklyGoalProps) {
  return (
    <section className="text-slate-200">
      <h3 className="pl-3 py-4">
        {msg.my_goal} ({getWeekDateString})
      </h3>

      <div className="bg-sky-300/80 pl-2 py-3">
        <progress
          className="progress w-56"
          value={gameLengthTotal}
          max={userMinutesGoal * DAYS_IN_WEEK}
        ></progress>
        <span className="text-slate-900 text-xs pl-4">
          {gameLengthTotal} of {userMinutesGoal * DAYS_IN_WEEK} completed
        </span>
      </div>
      <div className="px-3 mt-4">
        <div className="text-sm text-slate-200 mb-3">{msg.minutes_per_day}</div>
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
      </div>
    </section>
  );
}

export default WeeklyGoal;
