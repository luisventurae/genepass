'use strict';

const { _getWordRandomc_, _getWordLowerc_, _getWordUpperc_ } = require('../lib/chart');

/**
 * 
 * @param {Object}  options Customizable options
 * @param {Number}  options.length String length
 * @param {Boolean} options.lowercase At least one lowercase
 * @param {Boolean} options.uppercase At least one uppercase
 * @param {Boolean} options.number At least one number
 */
const build = (options = {
    length: true,
    lowercase: false,
    uppercase: false,
    number: false,
}) => {
    return _validations(options, () => _logic(options));
};

/**
 * Validation of Customizable options
 * @param {Opject} options Customizable options
 */
const _validations = (options, next) => {
    if(typeof options.length!=='number' || options.length<0) 
        throw '"length" is not a valid number';
    if(options.lowercase!==true && options.uppercase!==true && options.number!==true) 
        throw 'At least "lowercase", "uppercase" or "number" must be true';
    if(options.lowercase!==undefined && typeof options.lowercase!=='boolean')
        throw '"lowercase" must be boolean';
    if(options.uppercase!==undefined && typeof options.uppercase!=='boolean')
        throw '"uppercase" must be boolean';
    if(options.number!==undefined && typeof options.number!=='boolean')
        throw '"number" must be boolean';
    return next();
};

/**
 * Logic for build password
 * @param {Opject} options Customizable options
 */
const _logic = (options) => {
    let passwsord = '';
    for(let i=0; i<options.length; i++) {
        passwsord += _getWordRandomc_(0);
    }
    return passwsord;
};

module.exports = {
    build,
};