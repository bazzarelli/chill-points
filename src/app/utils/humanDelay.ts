/**
 *
 * Game is hard coded to between 1-5 minutes long.
 */
const getHumanDelay = (userGameLength: number) => {
  const x1 = 1; // shortest game length
  const y1 = 0.3; // shortest game human delay
  const x2 = 5; // longest game length
  const y2 = 0.06; // longest game human delay
  const humanDelay = y1 + ((userGameLength - x1) * (y2 - y1)) / (x2 - x1);
  return humanDelay;
};

export default getHumanDelay;
