"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getSpecial_ = exports._getNumber_ = exports._getWordRandomc_ = exports._getWordUpperc_ = exports._getWordLowerc_ = void 0;
// enum languages {
//   "en" = "_abc_en",
//   "es" = "_abc_es",
// }
/**
 * English Alphabet
 * @type {Array<String>}
 */
const _abc_en = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
/**
 * Spanish Alphabet
 * @type {Array<String>}
 */
const _abc_es = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
const _symbols = ["$", "%", "@", "!", "?", "#"];
/**
 * Get a word
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet='es'] Language alphabet
 * @returns {String}
 */
const _getWord = (_index, _alphabet = "en") => {
    // Validation
    let _maxAlphabets;
    let alphabetUsed;
    switch (_alphabet) {
        case "symbol":
            alphabetUsed = _symbols;
            break;
        case "en":
            alphabetUsed = _abc_en;
            break;
        case "es":
            alphabetUsed = _abc_es;
            break;
        default:
            throw new Error("_alphabet is not available");
    }
    _maxAlphabets = alphabetUsed.length;
    // return '_test';
    if (_index < 0 || _index >= _maxAlphabets)
        throw new Error(`${_index} is not a valid value for _index in ${_alphabet}`);
    // Logic
    return alphabetUsed[_index];
};
/**
 * Get a word lowercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordLowerc_ = (_index, _alphabet) => _getWord(_index, _alphabet).toLowerCase();
exports._getWordLowerc_ = _getWordLowerc_;
/**
 * Get a word uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordUpperc_ = (_index, _alphabet) => _getWord(_index, _alphabet).toUpperCase();
exports._getWordUpperc_ = _getWordUpperc_;
/**
 * Get a word random case, maybe lowercase or uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordRandomc_ = (_index, _alphabet) => {
    const _random = Math.floor(Math.random() * (100 - 0)) + 1;
    return _random % 2 === 0
        ? _getWord(_index, _alphabet).toUpperCase()
        : _getWord(_index, _alphabet).toLowerCase();
};
exports._getWordRandomc_ = _getWordRandomc_;
/**
 * Get a random integer number
 * @param {Number}  [_min=0] Minimum number
 * @param {Number}  [_max=9] Maximum number
 * @returns {Number}
 */
const _getNumber_ = (_min = 0, _max = 9) => {
    return Math.floor(Math.random() * (_max - _min)) + 1;
};
exports._getNumber_ = _getNumber_;
/**
 * Get a random integer number
 * @param {Number}  [_min=0] Minimum number
 * @param {Number}  [_max=6] Maximum number
 * @returns {Number}
 */
const _getSpecial_ = (_index) => {
    if (_index > _symbols.length - 1) {
        throw new RangeError(`max index allowed is ${_symbols.length - 1}, got ${_index}`);
    }
    return _getWord(_index, "symbol");
};
exports._getSpecial_ = _getSpecial_;
