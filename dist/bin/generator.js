"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const chart_1 = require("../lib/chart");
const permuter_1 = require("../lib/permuter");
const random_1 = require("../lib/random");
var sizes;
(function (sizes) {
    sizes[sizes["min"] = 0] = "min";
    sizes[sizes["max"] = 2048] = "max";
})(sizes || (sizes = {}));
/**
 * Build a random password
 * @param {Object}  options Customizable options
 * @param {Number}  options.length String length
 * @param {Boolean} [options.lowercase] At least one lowercase
 * @param {Boolean} [options.uppercase] At least one uppercase
 * @param {Boolean} [options.number] At least one number
 * @returns {String} Password generated
 * @example Just lowercase password
 * // returns abcde
 * build({length:5, lowercase:true});
 * @example Just number pin
 * // returns 9854
 * build({length:4, number:true});
 * @example Extreme password
 * // returns d4fg6E%df4#Ff_Tdg5df[|g4GBaHht_d
 * build({length:32, lowercase:true, uppercase:true, number:true, special:true});
 */
const build = (options) => {
    const _options = options;
    return _validations(_options, () => _logic(_options));
};
exports.build = build;
/**
 * Validate Customizable options
 * @param {Opject}      _options Customizable options
 * @param {Function}    _next Callback
 * @returns {String}
 */
const _validations = (_options, _next) => {
    if (typeof _options.length !== "number" ||
        _options.length < sizes.min ||
        _options.length > sizes.max) {
        throw new RangeError(`"length" is not a valid number, it must be between ${sizes.min} and ${sizes.max}`);
    }
    const _hasCharType = _options.lowercase ||
        _options.uppercase ||
        _options.number ||
        _options.special;
    if (_options.length > 0 && !_hasCharType) {
        throw new RangeError(`at least one of "lowercase", "uppercase", "number" or "special" must be true`);
    }
    return _next();
};
/**
 * Logic for build password
 * @param {Opject} _options Customizable options
 * @returns {String}
 */
const _logic = (_options) => {
    var _a;
    const _lengthPass = _options.length;
    if (_lengthPass === 0)
        return "";
    const _selected = [];
    if (_options.lowercase)
        _selected.push("lowercase");
    if (_options.uppercase)
        _selected.push("uppercase");
    if (_options.number)
        _selected.push("number");
    if (_options.special)
        _selected.push("special");
    // Inclusion-exclusion guarantee: every selected category gets at least
    // one slot whenever there's room for it. When there's less room than
    // selected categories, "one of each" is unsatisfiable, so fall back to
    // a uniformly random subset of them instead of always favoring the
    // first-declared options.
    const _categories = _lengthPass >= _selected.length
        ? _selected
        : (0, permuter_1._shuffleArray_)(_selected).slice(0, _lengthPass);
    // One guaranteed slot per category, then the remaining slots are handed
    // out one at a time to a uniformly random category - a multinomial draw
    // conditioned on every category having count >= 1. This keeps each
    // password's category layout unpredictable instead of forcing equal
    // counts, which otherwise throws away a large share of the entropy
    // length/category selection allow for.
    const _counts = new Map(_categories.map((_c) => [_c, 1]));
    const _remaining = _lengthPass - _categories.length;
    for (let _i = 0; _i < _remaining; _i++) {
        const _category = _categories[(0, random_1._secureRandomInt_)(0, _categories.length)];
        _counts.set(_category, ((_a = _counts.get(_category)) !== null && _a !== void 0 ? _a : 0) + 1);
    }
    let _passwsordGene = "";
    for (const [_category, _count] of _counts) {
        const _alphabet = chart_1._CATEGORY_ALPHABETS_[_category];
        for (let _i = 0; _i < _count; _i++) {
            _passwsordGene += (0, chart_1._pick_)(_alphabet);
        }
    }
    return (0, permuter_1._shuffle_)(_passwsordGene);
};
exports.default = { build };
