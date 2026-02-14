export type GamePhase = "idle" | "inhale" | "exhale" | "cancelled" | "complete";

export type GamePhaseEvent =
  | { type: "START" }
  | { type: "THRESHOLD_REACHED" }
  | { type: "RELEASE" }
  | { type: "CANCEL" }
  | { type: "RESET" }
  | { type: "COMPLETE" }
  | { type: "DISABLE" };

export const initialGamePhase: GamePhase = "idle";

export function gamePhaseReducer(
  phase: GamePhase,
  event: GamePhaseEvent,
): GamePhase {
  switch (event.type) {
    case "START":
      return phase === "complete" || phase === "cancelled" ? phase : "inhale";
    case "THRESHOLD_REACHED":
      return phase === "inhale" ? "exhale" : phase;
    case "RELEASE":
      return phase === "complete" || phase === "cancelled" ? phase : "inhale";
    case "CANCEL":
      return "cancelled";
    case "RESET":
      return "idle";
    case "COMPLETE":
      return "complete";
    case "DISABLE":
      return phase;
    default:
      return phase;
  }
}
