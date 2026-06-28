type language = "symbol" | "es" | "en";
/**
 * Get a word lowercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
declare const _getWordLowerc_: (_index: number, _alphabet?: language) => string;
/**
 * Get a word uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
declare const _getWordUpperc_: (_index: number, _alphabet?: language) => string;
/**
 * Get a word random case, maybe lowercase or uppercase
 * @param {Number} _index Index for a word in asc alphabetic
 * @param {String} [_alphabet] Language alphabet
 * @returns {String}
 */
declare const _getWordRandomc_: (_index: number, _alphabet: language) => string;
/**
 * Get a random integer number
 * @param {Number}  [_min=0] Minimum number
 * @param {Number}  [_max=9] Maximum number
 * @returns {Number}
 */
declare const _getNumber_: (_min?: number, _max?: number) => number;
/**
 * Get a random integer number
 * @param {Number}  [_min=0] Minimum number
 * @param {Number}  [_max=6] Maximum number
 * @returns {Number}
 */
declare const _getSpecial_: (_index: number) => string;
export { _getWordLowerc_, _getWordUpperc_, _getWordRandomc_, _getNumber_, _getSpecial_, };
//# sourceMappingURL=chart.d.ts.map