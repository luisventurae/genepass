import {
  _getWordRandomc_,
  _getWordLowerc_,
  _getWordUpperc_,
  _getNumber_,
  _getSpecial_,
} from "../lib/chart";
import { _shuffle_ } from "../lib/permuter";

interface options {
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
  const _options = options;
  return _validations(_options, () => _logic(_options));
};

/**
 * Validate Customizable options
 * @param {Opject}      _options Customizable options
 * @param {Function}    _next Callback
 * @returns {String}
 */
const _validations = (_options: options, _next: any): string => {
  if (
    typeof _options.length !== "number" ||
    _options.length < sizes.min ||
    _options.length > sizes.max
  ) {
    throw new RangeError(
      `"length" is not a valid number, it must be between ${sizes.min} and ${sizes.max}`
    );
  }
  return _next();
};

/**
 * Logic for build password
 * @param {Opject} _options Customizable options
 * @returns {String}
 */
const _logic = (_options: options | any): string => {
  let _passwsordGene: string = "";
  const _keysOptionsNL = Object.keys(_options).filter(
    (_key: string, _index: number) => _options[`${_key}`] && _key !== "length"
  ); // keys option, no length
  const _lengthKeys = _keysOptionsNL.length;
  const _lengthPass = _options.length;

  // Build to know how many times per chart
  let _quantitiesChart = []; // { _opt -> Option Name, _qtt -> Quantity }
  _quantitiesChart = _keysOptionsNL
    .map((_key) => ({ _opt: _key, _qtt: 1 }))
    .splice(0, _lengthPass);
  if (_lengthKeys < _lengthPass) {
    _quantitiesChart = _keysOptionsNL
      .map((_key) => ({ _opt: _key, _qtt: 1 }))
      .splice(0, _lengthPass);
    const _add = Math.floor(_lengthPass / _lengthKeys); // To know how many has to have every _qtt
    const _res = _lengthPass % _lengthKeys; // To know how many has to add for residue
    // Adding equals charts
    for (let _qC of _quantitiesChart) {
      _qC._qtt += _add - 1;
    }
    // Adding residue anywhere
    if (_res) {
      for (let _i = 0; _i < _res; _i++) {
        let _index = Math.floor(Math.random() * (_lengthKeys - 1)) + 1;
        _index -= 1;
        _quantitiesChart[_index]._qtt += 1;
      }
    }
  }

  for (let _qC of _quantitiesChart) {
    for (let _i = 0; _i < _qC._qtt; _i++) {
      switch (_qC._opt) {
        case "lowercase": {
          let _randomIndex = Math.floor(Math.random() * (25 - 0)) + 1;
          _passwsordGene += _getWordLowerc_(_randomIndex);
          break;
        }
        case "uppercase": {
          let _randomIndex = Math.floor(Math.random() * (25 - 0)) + 1;
          _passwsordGene += _getWordUpperc_(_randomIndex);
          break;
        }
        case "number": {
          let _randomIndex = Math.floor(Math.random() * (100 - 0)) + 1;
          _randomIndex = Math.round(_randomIndex / 10);
          _passwsordGene += _getNumber_(_randomIndex);
          break;
        }
        case "special": {
          let _randomIndex = Math.floor(Math.random() * (5 - 0)) + 1;
          _passwsordGene += _getSpecial_(_randomIndex);
          break;
        }
      }
    }
  }
  _passwsordGene = _shuffle_(_passwsordGene);
  return _passwsordGene;
};

export default { build };
