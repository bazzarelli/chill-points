import { runGameAction } from "@/app/hooks/gameActionExecutor";
import { msg } from "@/app/i18n/frog-msg";

function createDeps() {
  return {
    dispatch: jest.fn(),
    isInProgress: false,
    isComplete: false,
    isCancelled: false,
    humanDelay: 0.1,
    userCycleSpeed: 3,
    userGameLength: 2,
    cycleCount: 5,
    gameName: "Equal Breathing",
    gameOverRef: { current: true },
    setBanner: jest.fn(),
    setClockKey: jest.fn(),
    setInhaleTimes: jest.fn(),
    setIsCancelledStatus: jest.fn(),
    setIsInProgressStatus: jest.fn(),
    setBoxBg: jest.fn(),
    incrementCycleCount: jest.fn(),
    resetCycleCount: jest.fn(),
    resetGame: jest.fn(),
    playAwardSound: jest.fn(),
    playErrorSound: jest.fn(),
    animateGrow: jest.fn(),
    animateShrink: jest.fn(() => Promise.resolve()),
    animateCancel: jest.fn(),
    animateReset: jest.fn(),
    animateFinish: jest.fn(),
    trackGameStart: jest.fn(),
    trackGameCancel: jest.fn(),
    trackGameReset: jest.fn(),
  };
}

describe("runGameAction", () => {
  it("runs cancel side effects", () => {
    const deps = createDeps();

    runGameAction({ ...deps, action: "cancel" });

    expect(deps.dispatch).toHaveBeenCalledWith({ type: "CANCEL" });
    expect(deps.setBanner).toHaveBeenCalledWith({
      bannerText: msg.cancelled,
      bannerTextColor: "text-orange-500",
    });
    expect(deps.playErrorSound).toHaveBeenCalled();
    expect(deps.setIsInProgressStatus).toHaveBeenCalledWith(false);
    expect(deps.resetCycleCount).toHaveBeenCalled();
    expect(deps.setIsCancelledStatus).toHaveBeenCalledWith(true);
    expect(deps.animateCancel).toHaveBeenCalled();
    expect(deps.trackGameCancel).toHaveBeenCalledWith({
      gameName: "Equal Breathing",
      userGameLength: 2,
      cycleCount: 5,
    });
  });

  it("runs reset side effects", () => {
    const deps = createDeps();

    runGameAction({ ...deps, action: "reset" });

    expect(deps.dispatch).toHaveBeenCalledWith({ type: "RESET" });
    expect(deps.resetGame).toHaveBeenCalled();
    expect(deps.setIsCancelledStatus).toHaveBeenCalledWith(false);
    expect(deps.setBanner).toHaveBeenCalledWith({
      bannerText: msg.welcome,
      bannerTextColor: "text-sky-300",
    });
    expect(deps.setClockKey).toHaveBeenCalledTimes(1);
    const updateFn = deps.setClockKey.mock.calls[0][0] as (prev: number) => number;
    expect(updateFn(4)).toBe(5);
    expect(deps.setIsInProgressStatus).toHaveBeenCalledWith(false);
    expect(deps.gameOverRef.current).toBe(false);
    expect(deps.animateReset).toHaveBeenCalled();
    expect(deps.trackGameReset).toHaveBeenCalledWith({
      gameName: "Equal Breathing",
      userGameLength: 2,
      cycleCount: 5,
    });
  });

  it("runs finish side effects", () => {
    const deps = createDeps();

    runGameAction({ ...deps, action: "finish" });

    expect(deps.dispatch).toHaveBeenCalledWith({ type: "COMPLETE" });
    expect(deps.animateFinish).toHaveBeenCalled();
  });

  it("counts release when grace flag is enabled after completion", () => {
    const deps = createDeps();
    deps.isComplete = true;

    runGameAction({ ...deps, action: "release", allowGraceRelease: true });

    expect(deps.dispatch).toHaveBeenCalledWith({ type: "RELEASE" });
    expect(deps.incrementCycleCount).toHaveBeenCalled();
    expect(deps.animateShrink).toHaveBeenCalled();
  });
});
