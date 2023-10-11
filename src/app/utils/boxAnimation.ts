import colors from "tailwindcss/colors";

const sky300 = colors.sky[300];
const orange500 = colors.orange[500];
const lime500 = colors.lime[500];

const BOX_ANIM = {
  GROW: {
    backgroundColor: sky300,
    background: "radial-gradient(circle, #a133ac 10%, #7dd3fc 100%)",
    height: "15rem",
    width: "15rem",
    opacity: 0.8,
  },
  SHRINK: {
    backgroundColor: lime500,
    background: "radial-gradient(circle, #a133ac 10%, #7dd3fc 100%)",
    height: "0.4rem",
    width: "0.4rem",
    opacity: 0.5,
  },
  CANCEL: {
    backgroundColor: orange500,
    height: "0.4rem",
    width: "0.4rem",
    opacity: 0.5,
  },
  RESET: {
    backgroundColor: sky300,
    height: "0.4rem",
    width: "0.4rem",
    opacity: 0.2,
  },
  FINISH: {
    backgroundColor: sky300,
    height: "0.4rem",
    width: "0.4rem",
    opacity: 0.5,
  },
} as const;

type ObjectValues<T> = T[keyof T];
type BoxAnim = ObjectValues<typeof BOX_ANIM>;
export type { ObjectValues, BoxAnim };

export default BOX_ANIM;
