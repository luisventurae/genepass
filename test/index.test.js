'use strict'

/**
 * To test thid module, run:
 * node test/index.test.js
 */

const genepass = require('../src/index');

let password = genepass.build({
    length: 1200,
    lowercase: true,
    uppercase: true,
    number: 'true',
    // special: true,
});
console.log(`[${new Date()}]: generando... ${password}`);
