const shortestGameLength = 1; // shortest game length
const shortestGameDelay = 0.5; // shortest game human delay
const longestGameLength = 5; // longest game length
const longestGameDelay = 0.07; // longest game human delay

/**
 * Calculates the human delay for a game based on the user-selected game length.
 * @param gameLengthInMinutes The user-selected game length (between 1 and 5) in minutes.
 * @returns The calculated human delay.
 */
const calculateHumanDelay = (gameLengthInMinutes: number): number => {
  if (gameLengthInMinutes < 1 || gameLengthInMinutes > 5) {
    throw new Error("Invalid game length. Please select a value between 1 and 5.");
  }

  const humanDelay = shortestGameDelay + ((gameLengthInMinutes - shortestGameLength) * (longestGameDelay - shortestGameDelay)) / (longestGameLength - shortestGameLength);

  return humanDelay;
};

export default calculateHumanDelay;
