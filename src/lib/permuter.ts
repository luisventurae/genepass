import { _secureRandomInt_ } from "./random";

/**
 * Fisher-Yates (Durstenfeld) shuffle. Every permutation of `_items` is
 * equally likely (probability 1/n!), since each swap draws its index
 * uniformly from the still-unshuffled prefix `[0, _currentIndex]`.
 * @param {Array<T>} _items
 * @returns {Array<T>} A shuffled copy; `_items` is left untouched
 */
const _shuffleArray_ = <T>(_items: T[]): T[] => {
  const _result = _items.slice();
  let _currentIndex = _result.length;

  while (_currentIndex !== 0) {
    const _randomIndex = _secureRandomInt_(0, _currentIndex);
    _currentIndex -= 1;

    const _temporaryValue = _result[_currentIndex];
    _result[_currentIndex] = _result[_randomIndex];
    _result[_randomIndex] = _temporaryValue;
  }
  return _result;
};

/**
 * Shuffle the characters of a string
 * @param {String} _word Word
 * @returns {String}
 */
const _shuffle_ = (_word: string): string =>
  _shuffleArray_(_word.split("")).join("");

export { _shuffle_, _shuffleArray_ };
