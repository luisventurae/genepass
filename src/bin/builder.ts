import { build, entropy, options } from "./generator";

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
  private _length: number;
  private _lowercase: boolean = false;
  private _uppercase: boolean = false;
  private _number: boolean = false;
  private _special: boolean = false;

  /**
   * @param {Number} length String length, required
   */
  constructor(length: number) {
    this._length = length;
  }

  /**
   * Require at least one lowercase character
   * @param {Boolean} [value=true]
   * @returns {Builder}
   */
  lowercase(value: boolean = true): Builder {
    this._lowercase = value;
    return this;
  }

  /**
   * Require at least one uppercase character
   * @param {Boolean} [value=true]
   * @returns {Builder}
   */
  uppercase(value: boolean = true): Builder {
    this._uppercase = value;
    return this;
  }

  /**
   * Require at least one number
   * @param {Boolean} [value=true]
   * @returns {Builder}
   */
  number(value: boolean = true): Builder {
    this._number = value;
    return this;
  }

  /**
   * Require at least one special character
   * @param {Boolean} [value=true]
   * @returns {Builder}
   */
  special(value: boolean = true): Builder {
    this._special = value;
    return this;
  }

  /**
   * Generate the password from the accumulated options
   * @returns {String} Password generated
   */
  build(): string {
    return build(this._toOptions());
  }

  /**
   * Bits of entropy implied by the accumulated options, without generating
   * a password. Every password `.build()` would produce from this same
   * configuration has this same entropy.
   * @returns {Number} Bits of entropy
   */
  entropy(): number {
    return entropy(this._toOptions());
  }

  /**
   * Snapshot the accumulated options into a plain `options` object
   * @returns {Object}
   */
  private _toOptions(): options {
    return {
      length: this._length,
      lowercase: this._lowercase,
      uppercase: this._uppercase,
      number: this._number,
      special: this._special,
    };
  }
}

/**
 * Create a new chainable password builder
 * @param {Number} length String length, required
 * @returns {Builder}
 */
const create = (length: number): Builder => new Builder(length);

export { Builder, create };
