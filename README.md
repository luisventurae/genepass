# Genepass v2.1.0

![Generic badge](https://img.shields.io/badge/Version-2.1.0-green.svg)

Generate a random customizable passwords

# Security

**Since v2.1.0, password generation is cryptographically secure. Requires Node.js `>=14.10.0`.**

Every character is drawn uniformly from its full alphabet (no character is more or less likely than any other), and when more than one category is requested, how many characters come from each category is randomized too — not split evenly — so the category layout itself doesn't leak information.

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
 * password = "R@2lUO%i16x@"
 * /
```

### Method chaining (fluent builder)

The same engine and validation rules are also available through a chainable API. Use whichever style fits your code better — both are fully interchangeable.

```js
const genepass = require('genepass');

const password = genepass.create(12) // length, required attribute
    .lowercase()
    .uppercase()
    .number()
    .special()
    .build();

/**
 * Return example
 * password = "R@2lUO%i16x@"
 * /
```

`genepass.Builder` is also exported directly, so `new genepass.Builder(12)` works the same as `genepass.create(12)`.

### Checking password strength with `.entropy()`

`entropy()` returns how many bits of entropy a configuration implies,
**without generating a password**. It's a property of the options you pass
in, not of any specific password — every password built from the same
options has the same entropy.

```js
const genepass = require("genepass");

const bits = genepass.entropy({ length: 12, lowercase: true, number: true });
// or
const bits2 = genepass.create(12).lowercase().number().entropy();

console.log(bits); // 62.039100017307746
```

# Supported attributes

| Attribute | Data Type | Description                                                                                           | Required | Default |
| --------- | --------- | ----------------------------------------------------------------------------------------------------- | -------- | ------- |
| length    | `Number`  | Length of generated password, between 0 and 2048                                                      | `true`   | -       |
| lowercase | `Boolean` | At least one lowercase word in the generated password                                                 | `false`  | `false` |
| uppercase | `Boolean` | At least one uppercase word in the generated password                                                 | `false`  | `false` |
| number    | `Boolean` | At least one number in the generated password                                                         | `false`  | `false` |
| special   | `Boolean` | At least one special character in the generated password. Could include: `$`, `%`, `@`, `!`, `?`, `#` | `false`  | `false` |

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
// or
const password = genepass.create(8)
    .lowercase()
    .uppercase()
    .build();

/**
 * Return example
 * password = "BzWuHBnb"
 * /
```

### Return a PIN and 6 of length

```js
const genepass = require('genepass');

const password = genepass.build({
    length: 6,
    number: true,
});
// or
const password = genepass.create(6)
    .number()
    .build();

/**
 * Return example
 * password = "875221"
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
// or
const password = genepass.create(32)
    .lowercase()
    .uppercase()
    .number()
    .special()
    .build();

/**
 * Return example
 * password = "h?bj1r1H1IIrm41nL?#@2T%?M@1LPg!1"
 * /
```

# Common mistakes (throws `RangeError`)

```js
const genepass = require("genepass");

// ❌ Missing "length"
genepass.build({ lowercase: true });
// or
genepass.create().lowercase().build();

// ❌ "length" out of range (must be between 0 and 2048)
genepass.build({ length: 2049, lowercase: true });
genepass.build({ length: -1, lowercase: true });

// ❌ "length" is not a number
genepass.build({ length: "12", lowercase: true });

// ❌ No character-type option selected (need at least one of
// "lowercase", "uppercase", "number" or "special")
genepass.build({ length: 10 });
// or
genepass.create(10).build();
```

# Contributing

Want to contribute or understand how the project is built internally? See [MAINTAINERS.md](./MAINTAINERS.md).
