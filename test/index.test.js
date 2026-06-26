"use strict";

/**
 * Run with: node test/index.test.js
 * Requires a fresh build: npm run build
 */

const assert = require("assert");
const genepass = require("../dist/main");

/**
 * Run a single test case and print PASS/FAIL with the test name
 * @param {string} name
 * @param {() => void} fn
 * @returns {void}
 */
const _test_ = (name, fn) => {
  fn();
  console.log(`PASS: ${name}`);
};

// ---------------------------------------------------------------------------
// Happy path
// ---------------------------------------------------------------------------

_test_("returns a string of the requested length (lowercase only)", () => {
  const password = genepass.build({ length: 12, lowercase: true });
  assert.strictEqual(typeof password, "string");
  assert.strictEqual(password.length, 12);
  assert.match(password, /^[a-z]{12}$/);
});

_test_("returns digits only when 'number' is the only option", () => {
  const pin = genepass.build({ length: 6, number: true });
  assert.match(pin, /^[0-9]{6}$/);
});

_test_("includes at least one character of every requested category", () => {
  const password = genepass.build({
    length: 64,
    lowercase: true,
    uppercase: true,
    number: true,
    special: true,
  });
  assert.strictEqual(password.length, 64);
  assert.ok(/[a-z]/.test(password), "missing lowercase character");
  assert.ok(/[A-Z]/.test(password), "missing uppercase character");
  assert.ok(/[0-9]/.test(password), "missing number character");
  assert.ok(/[$%@!?#]/.test(password), "missing special character");
});

_test_("length 0 returns an empty string", () => {
  const password = genepass.build({ length: 0, lowercase: true });
  assert.strictEqual(password, "");
});

_test_("two consecutive calls with the same options are not identical (CSPRNG sanity check)", () => {
  const options = {
    length: 64,
    lowercase: true,
    uppercase: true,
    number: true,
    special: true,
  };
  const a = genepass.build(options);
  const b = genepass.build(options);
  assert.notStrictEqual(a, b);
});

// ---------------------------------------------------------------------------
// Fail path
// ---------------------------------------------------------------------------

_test_("throws RangeError when 'length' is missing", () => {
  assert.throws(() => genepass.build({ lowercase: true }), RangeError);
});

_test_("throws RangeError when 'length' is not a number", () => {
  assert.throws(() => genepass.build({ length: "12", lowercase: true }), RangeError);
});

_test_("throws RangeError when 'length' is negative", () => {
  assert.throws(() => genepass.build({ length: -1, lowercase: true }), RangeError);
});

_test_("throws RangeError when 'length' exceeds the max (2048)", () => {
  assert.throws(() => genepass.build({ length: 2049, lowercase: true }), RangeError);
});

_test_("throws RangeError when no character-type option is selected", () => {
  assert.throws(() => genepass.build({ length: 10 }), RangeError);
});

console.log("\nAll genepass.build() tests passed.");
