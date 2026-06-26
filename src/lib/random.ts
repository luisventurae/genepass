import { randomInt } from "crypto";

/**
 * Get a cryptographically secure random integer
 * @param {Number} min Minimum value, inclusive
 * @param {Number} max Maximum value, exclusive
 * @returns {Number}
 */
const _secureRandomInt_ = (min: number, max: number): number => {
  return randomInt(min, max);
};

export { _secureRandomInt_ };
