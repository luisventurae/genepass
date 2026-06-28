"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._secureRandomInt_ = void 0;
const crypto_1 = require("crypto");
/**
 * Get a cryptographically secure random integer
 * @param {Number} min Minimum value, inclusive
 * @param {Number} max Maximum value, exclusive
 * @returns {Number}
 */
const _secureRandomInt_ = (min, max) => {
    return (0, crypto_1.randomInt)(min, max);
};
exports._secureRandomInt_ = _secureRandomInt_;
