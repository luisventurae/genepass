# Genepass v1.0.1
![Generic badge](https://img.shields.io/badge/Version-1.0.1-green.svg)

Generate a random customizable passwords

# Installation
Using npm
```bash
$ npm i --save genepass
```
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
});
```
# Supported attributes
| Attribute | Data Type | Description | Required | Default |
| --- | --- | --- | --- | --- |
| length | `Number` | Length of password generated, between 0 and 2048 | `true` | - |
| lowercase | `Boolean` | At least one lowercase word in the password generated | `false` | `false` |
| uppercase | `Boolean` | At least one uppercase word in the password generated | `false` | `false` |
| number | `Boolean` | At least one number in the password generated | `false` | `false` |

## Important
It is necesary choose one of attribute apart of `length`.

# Supported format examples

### Return a combination lowercase uppercase password and 8 of length
```js
const genepass = require('genepass');

const password = genepass.build({
    length: 8,
    lowercase: true,
    uppercase: true,
});
```

### Return a PIN and 6 of length
```js
const genepass = require('genepass');

const password = genepass.build({
    length: 6,
    number: true,
});
```

<!-- ### Return a difficult password
```js
const genepass = require('genepass');

const password = genepass.build({
    length: 32,
    lowercase: true,
    uppercase: true,
    number: true,
    special: true,
});
``` -->