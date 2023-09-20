/**
 *
 * @param rrIntervals
 * @returns HRV value
 *
 * @description
 * RMSSD is the root mean square of successive differences between adjacent normal heartbeats.
 * (values are in milliseconds and should be collected for 2+ minutes for best results)
 */
export default function rmssd(rrIntervals: { rr: number }[]): number {
  if (
    !Array.isArray(rrIntervals) ||
    rrIntervals.some((interval) => typeof interval.rr !== "number")
  ) {
    throw new Error(
      "Invalid input: rrIntervals must be an array of objects with rr property as number",
    );
  }

  const rrIntervalArr = rrIntervals.map((rr) => rr.rr);
  const differences = new Array(rrIntervals.length - 1);
  let sumSquaredDifference = 0;

  for (let i = 1; i < rrIntervals.length; i++) {
    const diff = rrIntervalArr[i] - rrIntervalArr[i - 1];
    const squaredDiff = diff * diff;
    differences[i - 1] = squaredDiff;
    sumSquaredDifference += squaredDiff;
  }

  const meanSquaredDifference =
    differences.length > 0 ? sumSquaredDifference / differences.length : 0;
  const rmssd = Math.round(Math.sqrt(meanSquaredDifference));

  return rmssd;
}
