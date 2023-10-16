import calculateHumanDelay from "@/app/utils/humanDelay";

describe("Human Delay utility function", () => {

  // returns a number between 0.5 and 0.07 for game length between 1 and 5
  it('should return a number between 0.5 and 0.07 when the game length is between 1 and 5', () => {
    const result = calculateHumanDelay(3);
    expect(result).toBeGreaterThanOrEqual(0.07);
    expect(result).toBeLessThanOrEqual(0.5);
  });

  // returns 0.5 for game length of 1
  it('should return 0.5 when the game length is 1', () => {
    const result = calculateHumanDelay(1);
    expect(result).toBe(0.5);
  });

  // returns 0.07 for game length of 5
  it('should return 0.07 when the game length is 5', () => {
    const result = calculateHumanDelay(5);
    expect(result).toBe(0.07);
  });

  // throws an error for a game length less than 1
  it('should throw an error when the game length is less than 1', () => {
    expect(() => calculateHumanDelay(0)).toThrow("Invalid game length. Please select a value between 1 and 5.");
  });

});
