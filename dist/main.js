"use strict";
const generator_1 = require("./bin/generator");
const builder_1 = require("./bin/builder");
module.exports = { build: generator_1.build, create: builder_1.create, Builder: builder_1.Builder, entropy: generator_1.entropy };
