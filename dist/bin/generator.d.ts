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
export { build };
declare const _default: {
    build: (options: options) => string;
};
export default _default;
//# sourceMappingURL=generator.d.ts.map