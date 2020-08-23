'use strict';

/**
 * English Alphabet
 * @type {Array<String>}
 */
const _abc_en = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];

/**
 * Spanish Alphabet
 * @type {Array<String>}
 */
const _abc_es = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];

/**
 * Get a word
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWord = (_index, _alphabet='en') => {
    // Validation
    let _maxAlphabets = 0;
    let _variName = null;
    switch(_alphabet) {
        case 'en': 
            _variName = '_abc_en';
            this._abc_en = _abc_en
            break;
        case 'es': 
            _variName = '_abc_es';
            this._abc_es = _abc_es
            break;
        default: throw '_alphabet is not available';
    }
    _maxAlphabets = this[`${_variName}`].length;
    // return '_test';
    if(_index<0||_index>=_maxAlphabets) throw '_index is not a valid number';
    // Logic
    return this[`${_variName}`][_index];
};

/**
 * Get a word lowercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordLowerc_ = (_index, _alphabet) => _getWord(_index, _alphabet).toLowerCase();

/**
 * Get a word uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordUpperc_ = (_index, _alphabet) => _getWord(_index, _alphabet).toUpperCase();

/**
 * Get a word random case, maybe lowercase or uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordRandomc_ = (_index, _alphabet) => {
    let _random = Math.floor(Math.random() * (100 - 0)) + 1;
    let _randomCase = _random%2===0?'toUpperCase':'toLowerCase';
    return _getWord(_index, _alphabet)[`${_randomCase}`]();
};

/**
 * Get a random integer number
 * @param {Number}  [_min=0] Minimum number
 * @param {Number}  [_max=9] Maximum number
 * @returns {Number}
 */
const _getNumber_ = (_min=0, _max=9) => {
    return Math.floor(Math.random() * (_max - _min)) + 1;
};

module.exports = {
    _getWordLowerc_,
    _getWordUpperc_,
    _getWordRandomc_,
    _getNumber_,
};