import rmssd from "@/app/utils/rmssd";

describe("RMSSD utility function", () => {
  // Valid input with multiple rrIntervals
  it("should calculate the correct RMSSD value when given valid input with multiple rrIntervals", () => {
    const rrIntervals = [
      { rr: 800 },
      { rr: 900 },
      { rr: 1000 },
      { rr: 1100 },
      { rr: 1200 },
    ];

    const result = rmssd(rrIntervals);

    expect(result).toBe(100);
  });

  // Valid input with single rrInterval
  it("should calculate the correct RMSSD value when given valid input with single rrInterval", () => {
    const rrIntervals = [{ rr: 800 }];

    const result = rmssd(rrIntervals);

    expect(result).toBe(0);
  });

  // Valid input with rrIntervals in ascending order
  it("should calculate the correct RMSSD value when given valid input with rrIntervals in ascending order", () => {
    const rrIntervals = [
      { rr: 800 },
      { rr: 900 },
      { rr: 1000 },
      { rr: 1100 },
      { rr: 1200 },
    ];

    const result = rmssd(rrIntervals);

    expect(result).toBe(100);
  });
});
