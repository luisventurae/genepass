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
declare class Builder {
    private _length;
    private _lowercase;
    private _uppercase;
    private _number;
    private _special;
    /**
     * @param {Number} length String length, required
     */
    constructor(length: number);
    /**
     * Require at least one lowercase character
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    lowercase(value?: boolean): Builder;
    /**
     * Require at least one uppercase character
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    uppercase(value?: boolean): Builder;
    /**
     * Require at least one number
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    number(value?: boolean): Builder;
    /**
     * Require at least one special character
     * @param {Boolean} [value=true]
     * @returns {Builder}
     */
    special(value?: boolean): Builder;
    /**
     * Generate the password from the accumulated options
     * @returns {String} Password generated
     */
    build(): string;
    /**
     * Bits of entropy implied by the accumulated options, without generating
     * a password. Every password `.build()` would produce from this same
     * configuration has this same entropy.
     * @returns {Number} Bits of entropy
     */
    entropy(): number;
    /**
     * Snapshot the accumulated options into a plain `options` object
     * @returns {Object}
     */
    private _toOptions;
}
/**
 * Create a new chainable password builder
 * @param {Number} length String length, required
 * @returns {Builder}
 */
declare const create: (length: number) => Builder;
export { Builder, create };
//# sourceMappingURL=builder.d.ts.map