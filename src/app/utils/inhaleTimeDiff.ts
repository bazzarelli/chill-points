/**
 *
 * @param t array of inhale times as unix timestamps
 * @returns array of time differences between inhales in ms
 */
export default function inhaleTimeDiff(t: number[]) {
  const diff = [];
  for (let i = 0; i < t.length - 1; i++) {
    diff.push(t[i + 1] - t[i]);
  }
  return diff;
}
