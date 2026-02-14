import {
  gamePhaseReducer,
  initialGamePhase,
  type GamePhase,
  type GamePhaseEvent,
} from "@/app/hooks/gamePhaseReducer";

function runEvents(events: GamePhaseEvent[]): GamePhase {
  return events.reduce((phase, event) => gamePhaseReducer(phase, event), initialGamePhase);
}

describe("gamePhaseReducer integration flows", () => {
  it("supports a cancel -> reset recovery flow", () => {
    const phase = runEvents([{ type: "START" }, { type: "CANCEL" }, { type: "RESET" }]);
    expect(phase).toBe("idle");
  });

  it("supports a normal completion flow", () => {
    const phase = runEvents([
      { type: "START" },
      { type: "THRESHOLD_REACHED" },
      { type: "RELEASE" },
      { type: "COMPLETE" },
    ]);
    expect(phase).toBe("complete");
  });

  it("keeps complete stable until reset", () => {
    const completePhase = runEvents([{ type: "START" }, { type: "COMPLETE" }]);
    expect(gamePhaseReducer(completePhase, { type: "START" })).toBe("complete");
    expect(gamePhaseReducer(completePhase, { type: "RELEASE" })).toBe("complete");
    expect(gamePhaseReducer(completePhase, { type: "RESET" })).toBe("idle");
  });
});
