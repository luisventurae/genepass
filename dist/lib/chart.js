"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._pick_ = exports._CATEGORY_ALPHABETS_ = exports._SPECIAL_ = exports._NUMBERS_ = exports._UPPERCASE_ = exports._LOWERCASE_ = void 0;
const random_1 = require("./random");
/**
 * Lowercase English alphabet
 */
const _LOWERCASE_ = "abcdefghijklmnopqrstuvwxyz".split("");
exports._LOWERCASE_ = _LOWERCASE_;
/**
 * Uppercase English alphabet
 */
const _UPPERCASE_ = _LOWERCASE_.map((_char) => _char.toUpperCase());
exports._UPPERCASE_ = _UPPERCASE_;
/**
 * Digits 0-9
 */
const _NUMBERS_ = "0123456789".split("");
exports._NUMBERS_ = _NUMBERS_;
/**
 * Special characters
 */
const _SPECIAL_ = ["$", "%", "@", "!", "?", "#"];
exports._SPECIAL_ = _SPECIAL_;
/**
 * Character categories selectable from the public options/builder API,
 * keyed by their option name. Adding a new chainable character-type
 * method (e.g. a future `.hex()`) only requires one new entry here -
 * the distribution logic in `generator.ts` never has to change.
 */
const _CATEGORY_ALPHABETS_ = {
    lowercase: _LOWERCASE_,
    uppercase: _UPPERCASE_,
    number: _NUMBERS_,
    special: _SPECIAL_,
};
exports._CATEGORY_ALPHABETS_ = _CATEGORY_ALPHABETS_;
/**
 * Pick a uniformly random character from an alphabet. Every character has
 * exactly probability 1/N: `crypto.randomInt` rejection-samples internally
 * instead of using a biased modulo reduction, and indexing the full
 * alphabet (rather than a hand-picked sub-range) means every character,
 * including the first and last, is reachable.
 * @param {Array<String>} _alphabet
 * @returns {String}
 */
const _pick_ = (_alphabet) => _alphabet[(0, random_1._secureRandomInt_)(0, _alphabet.length)];
exports._pick_ = _pick_;
