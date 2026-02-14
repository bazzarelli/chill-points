import {
  gamePhaseReducer,
  initialGamePhase,
  type GamePhase,
} from "@/app/hooks/gamePhaseReducer";

describe("gamePhaseReducer", () => {
  it("starts from idle into inhale", () => {
    expect(gamePhaseReducer(initialGamePhase, { type: "START" })).toBe("inhale");
  });

  it("moves inhale to exhale when threshold is reached", () => {
    expect(gamePhaseReducer("inhale", { type: "THRESHOLD_REACHED" })).toBe(
      "exhale",
    );
  });

  it("keeps cancelled phase stable on disable/start/release", () => {
    const phase: GamePhase = "cancelled";
    expect(gamePhaseReducer(phase, { type: "DISABLE" })).toBe("cancelled");
    expect(gamePhaseReducer(phase, { type: "START" })).toBe("cancelled");
    expect(gamePhaseReducer(phase, { type: "RELEASE" })).toBe("cancelled");
  });

  it("completes and resets", () => {
    expect(gamePhaseReducer("exhale", { type: "COMPLETE" })).toBe("complete");
    expect(gamePhaseReducer("complete", { type: "RESET" })).toBe("idle");
  });
});
