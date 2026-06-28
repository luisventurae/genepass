/**
 * Lowercase English alphabet
 */
declare const _LOWERCASE_: string[];
/**
 * Uppercase English alphabet
 */
declare const _UPPERCASE_: string[];
/**
 * Digits 0-9
 */
declare const _NUMBERS_: string[];
/**
 * Special characters
 */
declare const _SPECIAL_: string[];
/**
 * Character categories selectable from the public options/builder API,
 * keyed by their option name. Adding a new chainable character-type
 * method (e.g. a future `.hex()`) only requires one new entry here -
 * the distribution logic in `generator.ts` never has to change.
 */
declare const _CATEGORY_ALPHABETS_: Record<string, string[]>;
/**
 * Pick a uniformly random character from an alphabet. Every character has
 * exactly probability 1/N: `crypto.randomInt` rejection-samples internally
 * instead of using a biased modulo reduction, and indexing the full
 * alphabet (rather than a hand-picked sub-range) means every character,
 * including the first and last, is reachable.
 * @param {Array<String>} _alphabet
 * @returns {String}
 */
declare const _pick_: (_alphabet: string[]) => string;
export { _LOWERCASE_, _UPPERCASE_, _NUMBERS_, _SPECIAL_, _CATEGORY_ALPHABETS_, _pick_, };
//# sourceMappingURL=chart.d.ts.map