import { _secureRandomInt_ } from "./random";

/**
 * Lowercase English alphabet
 */
const _LOWERCASE_: string[] = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Uppercase English alphabet
 */
const _UPPERCASE_: string[] = _LOWERCASE_.map((_char) => _char.toUpperCase());

/**
 * Digits 0-9
 */
const _NUMBERS_: string[] = "0123456789".split("");

/**
 * Special characters
 */
const _SPECIAL_: string[] = ["$", "%", "@", "!", "?", "#"];

/**
 * Character categories selectable from the public options/builder API,
 * keyed by their option name. Adding a new chainable character-type
 * method (e.g. a future `.hex()`) only requires one new entry here -
 * the distribution logic in `generator.ts` never has to change.
 */
const _CATEGORY_ALPHABETS_: Record<string, string[]> = {
  lowercase: _LOWERCASE_,
  uppercase: _UPPERCASE_,
  number: _NUMBERS_,
  special: _SPECIAL_,
};

/**
 * Pick a uniformly random character from an alphabet. Every character has
 * exactly probability 1/N: `crypto.randomInt` rejection-samples internally
 * instead of using a biased modulo reduction, and indexing the full
 * alphabet (rather than a hand-picked sub-range) means every character,
 * including the first and last, is reachable.
 * @param {Array<String>} _alphabet
 * @returns {String}
 */
const _pick_ = (_alphabet: string[]): string =>
  _alphabet[_secureRandomInt_(0, _alphabet.length)];

export {
  _LOWERCASE_,
  _UPPERCASE_,
  _NUMBERS_,
  _SPECIAL_,
  _CATEGORY_ALPHABETS_,
  _pick_,
};
