"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._shuffleArray_ = exports._shuffle_ = void 0;
const random_1 = require("./random");
/**
 * Fisher-Yates (Durstenfeld) shuffle. Every permutation of `_items` is
 * equally likely (probability 1/n!), since each swap draws its index
 * uniformly from the still-unshuffled prefix `[0, _currentIndex]`.
 * @param {Array<T>} _items
 * @returns {Array<T>} A shuffled copy; `_items` is left untouched
 */
const _shuffleArray_ = (_items) => {
    const _result = _items.slice();
    let _currentIndex = _result.length;
    while (_currentIndex !== 0) {
        const _randomIndex = (0, random_1._secureRandomInt_)(0, _currentIndex);
        _currentIndex -= 1;
        const _temporaryValue = _result[_currentIndex];
        _result[_currentIndex] = _result[_randomIndex];
        _result[_randomIndex] = _temporaryValue;
    }
    return _result;
};
exports._shuffleArray_ = _shuffleArray_;
/**
 * Shuffle the characters of a string
 * @param {String} _word Word
 * @returns {String}
 */
const _shuffle_ = (_word) => _shuffleArray_(_word.split("")).join("");
exports._shuffle_ = _shuffle_;
