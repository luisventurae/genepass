import { build, options } from "./generator";

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
  private _length: number | undefined;
  private _lowercase: boolean = false;
  private _uppercase: boolean = false;
  private _number: boolean = false;
  private _special: boolean = false;

  /**
   * Set the password length
   * @param {Number} value String length
   * @returns {Builder}
   */
  length(value: number): Builder {
    this._length = value;
    return this;
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
    const _length = this._length;
    if (_length === undefined) {
      throw new RangeError(
        `"length" is required, call .length(n) before .build()`
      );
    }
    const _options: options = {
      length: _length,
      lowercase: this._lowercase,
      uppercase: this._uppercase,
      number: this._number,
      special: this._special,
    };
    return build(_options);
  }
}

/**
 * Create a new chainable password builder
 * @returns {Builder}
 */
const create = (): Builder => new Builder();

export { Builder, create };
