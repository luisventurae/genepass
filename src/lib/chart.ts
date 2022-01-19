type language = "es" | "en";
// enum languages {
//   "en" = "_abc_en",
//   "es" = "_abc_es",
// }
/**
 * English Alphabet
 * @type {Array<String>}
 */
const _abc_en: string[] = [
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
const _abc_es: string[] = [
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

/**
 * Get a word
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet='es'] Language alphabet
 * @returns {String}
 */
const _getWord = (_index: number, _alphabet: language = "en"): string => {
  // Validation
  let _maxAlphabets: number;
  let alphabetUsed: Array<string>;
  switch (_alphabet) {
    case "en":
      alphabetUsed = _abc_en;
      break;
    case "es":
      alphabetUsed = _abc_es;
      break;
    default:
      throw "_alphabet is not available";
  }
  _maxAlphabets = alphabetUsed.length;
  // return '_test';
  if (_index < 0 || _index >= _maxAlphabets)
    throw `${_index} is not a valid value for _index in ${_alphabet}`;
  // Logic
  return alphabetUsed[_index];
};

/**
 * Get a word lowercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordLowerc_ = (_index: number, _alphabet?: language): string =>
  _getWord(_index, _alphabet).toLowerCase();

/**
 * Get a word uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordUpperc_ = (_index: number, _alphabet?: language): string =>
  _getWord(_index, _alphabet).toUpperCase();

/**
 * Get a word random case, maybe lowercase or uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
const _getWordRandomc_ = (_index: number, _alphabet: language): string => {
  const _random: number = Math.floor(Math.random() * (100 - 0)) + 1;
  return _random % 2 === 0
    ? _getWord(_index, _alphabet).toUpperCase()
    : _getWord(_index, _alphabet).toLowerCase();
};

/**
 * Get a random integer number
 * @param {Number}  [_min=0] Minimum number
 * @param {Number}  [_max=9] Maximum number
 * @returns {Number}
 */
const _getNumber_ = (_min: number = 0, _max: number = 9): number => {
  return Math.floor(Math.random() * (_max - _min)) + 1;
};

export { _getWordLowerc_, _getWordUpperc_, _getWordRandomc_, _getNumber_ };
