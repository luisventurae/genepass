'use strict'

const genepass = require('../src/index');

let password = genepass.build({
    length: 10,
    lowercase: true,
    // uppercase: true,
    // number: true,
});
console.log(`[${new Date()}]: generando... ${password}`);
