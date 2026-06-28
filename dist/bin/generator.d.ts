export interface options {
    length: number;
    lowercase?: boolean;
    uppercase?: boolean;
    number?: boolean;
    special?: boolean;
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
declare const build: (options: options) => string;
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
declare const entropy: (options: options) => number;
export { build, entropy };
declare const _default: {
    build: (options: options) => string;
    entropy: (options: options) => number;
};
export default _default;
//# sourceMappingURL=generator.d.ts.map