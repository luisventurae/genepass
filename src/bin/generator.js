'use strict';

const { _getWordRandomc_, _getWordLowerc_, _getWordUpperc_ } = require('../lib/chart');

/**
 * Build a random password
 * @param {Object}  options Customizable options
 * @param {Number}  options.length String length
 * @param {Boolean} options.lowercase? At least one lowercase
 * @param {Boolean} options.uppercase? At least one uppercase
 * @param {Boolean} options.number? At least one number
 */
const build = (options = {
    length,
    lowercase: false,
    uppercase: false,
    number: false,
}) => {
    const _options = options
    return _validations(_options, () => _logic(_options));
};

/**
 * Validate Customizable options
 * @param {Opject} _options Customizable options
 */
const _validations = (_options, next) => {
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
    return next();
};

/**
 * Logic for build password
 * @param {Opject} _options Customizable options
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