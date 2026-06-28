import { _CATEGORY_ALPHABETS_, _pick_ } from "../lib/chart";
import { _shuffle_, _shuffleArray_ } from "../lib/permuter";
import { _secureRandomInt_ } from "../lib/random";

export interface options {
  length: number;
  lowercase?: boolean;
  uppercase?: boolean;
  number?: boolean;
  special?: boolean;
}

enum sizes {
  min = 0,
  max = 2048,
}

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
const build = (options: options): string => {
  _validate(options);
  return _logic(options);
};

/**
 * Bits of entropy implied by the given options, assuming every character is
 * drawn uniformly at random from the union of the selected alphabets:
 * `H = length * log2(N)`, where `N` is the size of that union. This is a
 * property of the configuration, not of any one generated password - every
 * password built from the same options has the same entropy, so this never
 * needs to actually generate one.
 * @param {Object}  options Customizable options
 * @param {Number}  options.length String length
 * @param {Boolean} [options.lowercase] At least one lowercase
 * @param {Boolean} [options.uppercase] At least one uppercase
 * @param {Boolean} [options.number] At least one number
 * @param {Boolean} [options.special] At least one special character
 * @returns {Number} Bits of entropy
 * @example
 * // returns 28.529...
 * entropy({length: 6, lowercase: true, uppercase: true});
 */
const entropy = (options: options): number => {
  _validate(options);
  if (options.length === 0) return 0;
  const _alphabetSize = _selectedCategories(options).reduce(
    (_total, _category) => _total + _CATEGORY_ALPHABETS_[_category].length,
    0,
  );
  return options.length * Math.log2(_alphabetSize);
};

/**
 * Validate Customizable options
 * @param {Opject} _options Customizable options
 * @returns {void}
 */
const _validate = (_options: options): void => {
  if (
    typeof _options.length !== "number" ||
    _options.length < sizes.min ||
    _options.length > sizes.max
  ) {
    throw new RangeError(
      `"length" is not a valid number, it must be between ${sizes.min} and ${sizes.max}`,
    );
  }
  const _hasCharType =
    _options.lowercase ||
    _options.uppercase ||
    _options.number ||
    _options.special;
  if (_options.length > 0 && !_hasCharType) {
    throw new RangeError(
      `at least one of "lowercase", "uppercase", "number" or "special" must be true`,
    );
  }
};

/**
 * Which character categories were requested, in a stable order
 * @param {Opject} _options Customizable options
 * @returns {Array<String>}
 */
const _selectedCategories = (_options: options): string[] => {
  const _selected: string[] = [];
  if (_options.lowercase) _selected.push("lowercase");
  if (_options.uppercase) _selected.push("uppercase");
  if (_options.number) _selected.push("number");
  if (_options.special) _selected.push("special");
  return _selected;
};

/**
 * Logic for build password
 * @param {Opject} _options Customizable options
 * @returns {String}
 */
const _logic = (_options: options): string => {
  const _lengthPass = _options.length;
  if (_lengthPass === 0) return "";

  const _selected = _selectedCategories(_options);

  // Inclusion-exclusion guarantee: every selected category gets at least
  // one slot whenever there's room for it. When there's less room than
  // selected categories, "one of each" is unsatisfiable, so fall back to
  // a uniformly random subset of them instead of always favoring the
  // first-declared options.
  const _categories =
    _lengthPass >= _selected.length
      ? _selected
      : _shuffleArray_(_selected).slice(0, _lengthPass);

  // One guaranteed slot per category, then the remaining slots are handed
  // out one at a time to a uniformly random category - a multinomial draw
  // conditioned on every category having count >= 1. This keeps each
  // password's category layout unpredictable instead of forcing equal
  // counts, which otherwise throws away a large share of the entropy
  // length/category selection allow for.
  const _counts = new Map<string, number>(_categories.map((_c) => [_c, 1]));
  const _remaining = _lengthPass - _categories.length;
  for (let _i = 0; _i < _remaining; _i++) {
    const _category = _categories[_secureRandomInt_(0, _categories.length)];
    _counts.set(_category, (_counts.get(_category) ?? 0) + 1);
  }

  let _passwsordGene: string = "";
  for (const [_category, _count] of _counts) {
    const _alphabet = _CATEGORY_ALPHABETS_[_category];
    for (let _i = 0; _i < _count; _i++) {
      _passwsordGene += _pick_(_alphabet);
    }
  }

  return _shuffle_(_passwsordGene);
};

export { build, entropy };
export default { build, entropy };
