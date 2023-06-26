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
    const rrIntervalArr = rrIntervals.map(rr => rr.rr);
    const differences = [];

    for (let i = 1; i < rrIntervals.length; i++) {
        const diff = rrIntervalArr[i] - rrIntervalArr[i - 1];
        differences.push(diff);
    }

    const squaredDifferences = differences.map(diff => diff * diff);
    const meanSquaredDifference = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / squaredDifferences.length;
    const rmssd = Math.round(Math.sqrt(meanSquaredDifference));

    return rmssd;
}