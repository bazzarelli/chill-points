const BOX_ANIM = {
  GROW: {
    backgroundColor: "#85cbf8",
    height: "12rem",
    opacity: 0.8,
  },
  SHRINK: {
    backgroundColor: "#A1E887",
    height: "0.4rem",
    opacity: 0.5,
  },
  CANCEL: {
    backgroundColor: "#f97316",
    height: "0.4rem",
    opacity: 0.5,
  },
  RESET: {
    backgroundColor: "#85cbf8",
    height: "0.4rem",
    opacity: 0.2,
  },
} as const;

type ObjectValues<T> = T[keyof T];
type BoxAnim = ObjectValues<typeof BOX_ANIM>;
export type { ObjectValues, BoxAnim };

export default BOX_ANIM;
