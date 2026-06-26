"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.Builder = void 0;
const generator_1 = require("./generator");
/**
 * Fluent, method-chaining API for building passwords.
 * Delegates to the same `build()` engine (and the same validation rules)
 * used by the legacy options-object API, so both stay in sync.
 * @example
 * const password = create()
 *   .length(12)
 *   .lowercase()
 *   .uppercase()
 *   .number()
 *   .special()
 *   .build();
 */
class Builder {
    constructor() {
        this._lowercase = false;
        this._uppercase = false;
        this._number = false;
        this._special = false;
    }
    /**
     * Set the password length
     * @param {Number} value String length
     * @returns {Builder}
     */
    length(value) {
        this._length = value;
        return this;
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
        const _length = this._length;
        if (_length === undefined) {
            throw new RangeError(`"length" is required, call .length(n) before .build()`);
        }
        const _options = {
            length: _length,
            lowercase: this._lowercase,
            uppercase: this._uppercase,
            number: this._number,
            special: this._special,
        };
        return (0, generator_1.build)(_options);
    }
}
exports.Builder = Builder;
/**
 * Create a new chainable password builder
 * @returns {Builder}
 */
const create = () => new Builder();
exports.create = create;
