"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.Builder = void 0;
const generator_1 = require("./generator");
/**
 * Fluent, method-chaining API for building passwords.
 * Delegates to the same `build()` engine (and the same validation rules)
 * used by the legacy options-object API, so both stay in sync.
 * @example
 * const password = create(12)
 *   .lowercase()
 *   .uppercase()
 *   .number()
 *   .special()
 *   .build();
 */
class Builder {
    /**
     * @param {Number} length String length, required
     */
    constructor(length) {
        this._lowercase = false;
        this._uppercase = false;
        this._number = false;
        this._special = false;
        this._length = length;
    }
    /**
     * Require at least one lowercase character
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    lowercase(value = true) {
        this._lowercase = value;
        return this;
    }
    /**
     * Require at least one uppercase character
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    uppercase(value = true) {
        this._uppercase = value;
        return this;
    }
    /**
     * Require at least one number
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    number(value = true) {
        this._number = value;
        return this;
    }
    /**
     * Require at least one special character
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    special(value = true) {
        this._special = value;
        return this;
    }
    /**
     * Generate the password from the accumulated options
     * @returns {String} Password generated
     */
    build() {
        return (0, generator_1.build)(this._toOptions());
    }
    /**
     * Bits of entropy implied by the accumulated options, without generating
     * a password. Every password `.build()` would produce from this same
     * configuration has this same entropy.
     * @returns {Number} Bits of entropy
     */
    entropy() {
        return (0, generator_1.entropy)(this._toOptions());
    }
    /**
     * Snapshot the accumulated options into a plain `options` object
     * @returns {Object}
     */
    _toOptions() {
        return {
            length: this._length,
            lowercase: this._lowercase,
            uppercase: this._uppercase,
            number: this._number,
            special: this._special,
        };
    }
}
exports.Builder = Builder;
/**
 * Create a new chainable password builder
 * @param {Number} length String length, required
 * @returns {Builder}
 */
const create = (length) => new Builder(length);
exports.create = create;
