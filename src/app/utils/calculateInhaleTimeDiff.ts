/**
 *
 * @param t array of inhale times as unix timestamps
 * @returns array of time differences between inhales in ms
 */
export default function calculateInhaleTimeDiff(t: number[]) {
  if (!Array.isArray(t) || t.some(isNaN)) {
    throw new Error("Invalid input. Expected an array of numbers.");
  }

  if (t.length < 2) {
    return [];
  }

  return t.slice(1).map((value, index) => value - t[index]);
}
