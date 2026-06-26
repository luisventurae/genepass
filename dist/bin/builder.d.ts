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
declare class Builder {
    private _length;
    private _lowercase;
    private _uppercase;
    private _number;
    private _special;
    /**
     * Set the password length
     * @param {Number} value String length
     * @returns {Builder}
     */
    length(value: number): Builder;
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
}
/**
 * Create a new chainable password builder
 * @returns {Builder}
 */
declare const create: () => Builder;
export { Builder, create };
//# sourceMappingURL=builder.d.ts.map