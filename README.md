# Genepass v2.1.0
![Generic badge](https://img.shields.io/badge/Version-2.1.0-green.svg)

Generate a random customizable passwords

# Security
Since v2.1.0, password generation uses Node's `crypto.randomInt` (a cryptographically secure PRNG) instead of `Math.random()`. Requires Node.js `>=14.10.0`.

# Installation
Using npm
```bash
$ npm i --save genepass
```

# JavaScript & TypeScript
Genepass works out of the box in both JavaScript and TypeScript projects.
It's written in TypeScript and ships compiled CommonJS JS plus its own
`.d.ts` type declarations — no `@types/genepass` package needed, and no
extra setup required either way.

# Usage
In Node.js

"length" of password generated must be defined, then "lowercase", "uppercase" or "number" must exists next to this. 
```js
const genepass = require('genepass');

const password = genepass.build({
    length: 12, // Required attribute
    lowercase: true,
    uppercase: true,
    number: true,
    special: true,
});

/**
 * Return example
 * password = "!UghH1!#e21T"
 * /
```

### Method chaining (fluent builder)
The same engine and validation rules are also available through a chainable API. Use whichever style fits your code better — both are fully interchangeable.
```js
const genepass = require('genepass');

const password = genepass.create()
    .length(12) // Required attribute
    .lowercase()
    .uppercase()
    .number()
    .special()
    .build();

/**
 * Return example
 * password = "!UghH1!#e21T"
 * /
```
`genepass.Builder` is also exported directly, so `new genepass.Builder()` works the same as `genepass.create()`.

# Supported attributes
| Attribute | Data Type | Description | Required | Default |
| --- | --- | --- | --- | --- |
| length | `Number` | Length of generated password, between 0 and 2048 | `true` | - |
| lowercase | `Boolean` | At least one lowercase word in the generated password  | `false` | `false` |
| uppercase | `Boolean` | At least one uppercase word in the generated password | `false` | `false` |
| number | `Boolean` | At least one number in the generated password | `false` | `false` |
| special | `Boolean` | At least one special character in the generated password. Could include: `$`, `%`, `@`, `!`, `?`, `#` | `false` | `false` |

## Important
- `length` attribute is required
- It is necesary choose one of attribute apart of `length`.

# Supported format examples

### Return a combination lowercase uppercase password and 8 of length
```js
const genepass = require('genepass');

const password = genepass.build({
    length: 8,
    lowercase: true,
    uppercase: true,
});

/**
 * Return example
 * password = "ReyDFHbp"
 * /
```

### Return a PIN and 6 of length
```js
const genepass = require('genepass');

const password = genepass.build({
    length: 6,
    number: true,
});

/**
 * Return example
 * password = "218152"
 * /
```

### Return a hard password
```js
const genepass = require('genepass');

const password = genepass.build({
    length: 32,
    lowercase: true,
    uppercase: true,
    number: true,
    special: true,
});

/**
 * Return example
 * password = "t13Yq#Kb1D%%pF%SM@121%4#k!jjTq1Q"
 * /
```