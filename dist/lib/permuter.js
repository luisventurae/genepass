"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._shuffle_ = void 0;
const random_1 = require("./random");
/**
 * Text to permute charts
 * @param {String} word Word
 * @returns {String}
 */
const _shuffle_ = (word) => {
    const _charts = word.split("");
    let _currentIndex = _charts.length, _temporaryValue, _randomIndex;
    // While there remain elements to shuffle...
    while (0 !== _currentIndex) {
        // Pick a remaining element...
        _randomIndex = (0, random_1._secureRandomInt_)(0, _currentIndex);
        _currentIndex -= 1;
        // And swap it with the current element.
        _temporaryValue = _charts[_currentIndex];
        _charts[_currentIndex] = _charts[_randomIndex];
        _charts[_randomIndex] = _temporaryValue;
    }
    return _charts.join("");
};
exports._shuffle_ = _shuffle_;
