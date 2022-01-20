/**
 * Text to permute charts
 * @param {String} word Word
 * @returns {String}
 */
const _shuffle_ = (word: string): string => {
  const _charts = word.split("");
  let _currentIndex = _charts.length,
    _temporaryValue,
    _randomIndex;

  // While there remain elements to shuffle...
  while (0 !== _currentIndex) {
    // Pick a remaining element...
    _randomIndex = Math.floor(Math.random() * _currentIndex);
    _currentIndex -= 1;

    // And swap it with the current element.
    _temporaryValue = _charts[_currentIndex];
    _charts[_currentIndex] = _charts[_randomIndex];
    _charts[_randomIndex] = _temporaryValue;
  }
  return _charts.join("");
};

export { _shuffle_ };
