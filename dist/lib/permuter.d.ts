/**
 * Fisher-Yates (Durstenfeld) shuffle. Every permutation of `_items` is
 * equally likely (probability 1/n!), since each swap draws its index
 * uniformly from the still-unshuffled prefix `[0, _currentIndex]`.
 * @param {Array<T>} _items
 * @returns {Array<T>} A shuffled copy; `_items` is left untouched
 */
declare const _shuffleArray_: <T>(_items: T[]) => T[];
/**
 * Shuffle the characters of a string
 * @param {String} _word Word
 * @returns {String}
 */
declare const _shuffle_: (_word: string) => string;
export { _shuffle_, _shuffleArray_ };
//# sourceMappingURL=permuter.d.ts.map