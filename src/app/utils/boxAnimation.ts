const BOX_ANIM = {
  GROW: {
    height: "12rem",
    opacity: 1,
  },
  SHRINK: {
    height: "0.4rem",
    opacity: 1,
  },
  CANCEL: {
    height: "0.4rem",
    opacity: 0.5,
  },
  RESET: {
    height: "0.4rem",
    opacity: 1,
  },
  FINISH: {
    height: "0.4rem",
    opacity: 0.5,
  },
} as const;

type ObjectValues<T> = T[keyof T];
type BoxAnim = ObjectValues<typeof BOX_ANIM>;
export type { ObjectValues, BoxAnim };

export default BOX_ANIM;
