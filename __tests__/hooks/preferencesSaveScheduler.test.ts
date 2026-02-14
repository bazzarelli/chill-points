import {
  createPreferencesSaveScheduler,
  type GamePreferences,
} from "@/app/hooks/preferencesSaveScheduler";

describe("createPreferencesSaveScheduler", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("debounces rapid updates and saves only the latest payload", () => {
    const savePreferences = jest.fn();
    const scheduler = createPreferencesSaveScheduler(savePreferences, 400);

    const first: GamePreferences = {
      userMinutesGoal: 2,
      userCycleSpeed: 3,
      userGameLength: 1,
    };
    const second: GamePreferences = {
      userMinutesGoal: 4,
      userCycleSpeed: 5,
      userGameLength: 3,
    };

    scheduler.schedule(first);
    scheduler.schedule(second);

    jest.advanceTimersByTime(399);
    expect(savePreferences).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(savePreferences).toHaveBeenCalledTimes(1);
    expect(savePreferences).toHaveBeenCalledWith(second);
  });

  it("does not save identical preferences twice", () => {
    const savePreferences = jest.fn();
    const scheduler = createPreferencesSaveScheduler(savePreferences, 400);

    const prefs: GamePreferences = {
      userMinutesGoal: 2,
      userCycleSpeed: 3,
      userGameLength: 1,
    };

    scheduler.schedule(prefs);
    jest.runOnlyPendingTimers();
    expect(savePreferences).toHaveBeenCalledTimes(1);

    scheduler.schedule({ ...prefs });
    jest.runOnlyPendingTimers();
    expect(savePreferences).toHaveBeenCalledTimes(1);
  });

  it("cancels pending save", () => {
    const savePreferences = jest.fn();
    const scheduler = createPreferencesSaveScheduler(savePreferences, 400);

    scheduler.schedule({
      userMinutesGoal: 2,
      userCycleSpeed: 3,
      userGameLength: 1,
    });
    scheduler.cancelPending();
    jest.runOnlyPendingTimers();

    expect(savePreferences).not.toHaveBeenCalled();
  });
});
