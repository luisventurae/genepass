'use strict';

const { _getWordRandomc_, _getWordLowerc_, _getWordUpperc_ } = require('../lib/chart');

/**
 * Build a random password
 * @param {Object}  options Customizable options
 * @param {Number}  options.length String length
 * @param {Boolean} [options.lowercase] At least one lowercase
 * @param {Boolean} [options.uppercase] At least one uppercase
 * @param {Boolean} [options.number] At least one number
 * @param {Boolean} [options.special] At least one special character
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
const build = (options = {
    length,
    lowercase,
    uppercase,
    number,
    special,
}) => {
    const _options = options
    return _validations(_options, () => _logic(_options));
};

/**
 * Validate Customizable options
 * @param {Opject}      _options Customizable options
 * @param {Function}    _next Callback
 * @returns {String}
 */
const _validations = (_options, _next) => {
    if(typeof _options.length!=='number' || _options.length<0) 
        throw '"length" is not a valid number';
    if(_options.lowercase!==true && _options.uppercase!==true && _options.number!==true) 
        throw 'At least "lowercase", "uppercase" or "number" must be true';
    if(_options.lowercase!==undefined && typeof _options.lowercase!=='boolean')
        throw '"lowercase" must be boolean';
    if(_options.uppercase!==undefined && typeof _options.uppercase!=='boolean')
        throw '"uppercase" must be boolean';
    if(_options.number!==undefined && typeof _options.number!=='boolean')
        throw '"number" must be boolean';
    if(_options.special!==undefined && typeof _options.special!=='boolean')
        throw '"special" must be boolean';
    return _next();
};

/**
 * Logic for build password
 * @param {Opject} _options Customizable options
 * @returns {String}
 */
const _logic = (_options) => {
    let _passwsord = '';
    let _optionsFn = [];
    
    for(let i=0; i<_options.length; i++) {
        _passwsord += _getWordRandomc_(0);
    }
    return _passwsord;
};

module.exports = {
    build,
};