/**
 *
 * @description Get a wind direction in the degree given.
 * @function getWindDirection
 * @property {string} degrees
 * @returns {string}
 */

const directions = ["↑ N", "↗ NE", "→ E", "↘ SE", "↓ S", "↙ SW", "← W", "↖ NW"];

export const getWindDirection = (degrees: number): string => {
  const index = Math.round((degrees % 360) / 45) % 8;
  const direction = directions[index | 0];
  return `${degrees}${String.fromCharCode(0xfeff00b0)} ${direction}`;
};
