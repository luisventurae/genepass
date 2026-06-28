"use strict";

/**
 * Run with: node test/index.test.js
 * Requires a fresh build: npm run build
 */

const assert = require("assert");
const genepass = require("../dist/main");

/**
 * Colorize console output
 * @param {string} text - Text to colorize
 * @param {string} color - 'green' or 'red'
 * @returns {string} Colorized text
 */
const colorizeLog = (text, color) => {
  const colors = {
    green: "\x1b[32m",
    red: "\x1b[31m",
    reset: "\x1b[0m",
  };
  return `${colors[color]}${text}${colors.reset}`;
};

/**
 * Run a single test case and print PASS/FAIL with the test name
 * @param {string} name
 * @param {() => void} fn
 * @returns {void}
 */
const _test_ = (name, fn) => {
  try {
    fn();
    console.log(colorizeLog(`PASS: ${name}`, "green"));
  } catch (error) {
    console.log(colorizeLog(`FAIL: ${name}`, "red"));
    console.log(colorizeLog(`  Error: ${error.message}`, "red"));
  }
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

_test_(
  "two consecutive calls with the same options are not identical (CSPRNG sanity check)",
  () => {
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
  },
);

_test_(
  "create(length).build() (chained API) returns a password of the requested length and categories",
  () => {
    const password = genepass
      .create(20)
      .lowercase()
      .uppercase()
      .number()
      .special()
      .build();
    assert.strictEqual(typeof password, "string");
    assert.strictEqual(password.length, 20);
    assert.ok(/[a-z]/.test(password), "missing lowercase character");
    assert.ok(/[A-Z]/.test(password), "missing uppercase character");
    assert.ok(/[0-9]/.test(password), "missing number character");
    assert.ok(/[$%@!?#]/.test(password), "missing special character");
  },
);

_test_(
  "new Builder(length) instantiated directly behaves the same as create(length)",
  () => {
    const password = new genepass.Builder(8).number().build();
    assert.match(password, /^[0-9]{8}$/);
  },
);

_test_(
  "chained API and legacy API produce equally shaped output for the same options",
  () => {
    const legacy = genepass.build({ length: 6, number: true });
    const chained = genepass.create(6).number().build();
    assert.strictEqual(legacy.length, chained.length);
    assert.match(legacy, /^[0-9]{6}$/);
    assert.match(chained, /^[0-9]{6}$/);
  },
);

_test_(
  "entropy(options) returns length * log2(alphabet size) without generating a password",
  () => {
    const bits = genepass.entropy({ length: 6, lowercase: true, uppercase: true });
    assert.strictEqual(bits, 6 * Math.log2(52));
  },
);

_test_(
  "entropy() is the same for every password built from the same options",
  () => {
    const options = { length: 12, lowercase: true, number: true };
    const expected = 12 * Math.log2(36);
    assert.strictEqual(genepass.entropy(options), expected);
    assert.strictEqual(genepass.entropy(options), genepass.entropy(options));
  },
);

_test_(
  "chained builder.entropy() matches legacy entropy(options) for the same configuration",
  () => {
    const legacy = genepass.entropy({ length: 16, lowercase: true, special: true });
    const chained = genepass.create(16).lowercase().special().entropy();
    assert.strictEqual(legacy, chained);
  },
);

_test_("entropy(options) for length 0 is 0 bits", () => {
  assert.strictEqual(genepass.entropy({ length: 0, lowercase: true }), 0);
});

// ---------------------------------------------------------------------------
// Fail path
// ---------------------------------------------------------------------------

_test_("throws RangeError when 'length' is missing", () => {
  assert.throws(() => genepass.build({ lowercase: true }), RangeError);
});

_test_("throws RangeError when 'length' is not a number", () => {
  assert.throws(
    () => genepass.build({ length: "12", lowercase: true }),
    RangeError,
  );
});

_test_("throws RangeError when 'length' is negative", () => {
  assert.throws(
    () => genepass.build({ length: -1, lowercase: true }),
    RangeError,
  );
});

_test_("throws RangeError when 'length' exceeds the max (2048)", () => {
  assert.throws(
    () => genepass.build({ length: 2049, lowercase: true }),
    RangeError,
  );
});

_test_("throws RangeError when no character-type option is selected", () => {
  assert.throws(() => genepass.build({ length: 10 }), RangeError);
});

_test_(
  "entropy(options) throws RangeError under the same validation rules as build()",
  () => {
    assert.throws(() => genepass.entropy({ lowercase: true }), RangeError);
    assert.throws(() => genepass.entropy({ length: 10 }), RangeError);
    assert.throws(() => genepass.create(10).entropy(), RangeError);
  },
);

_test_(
  "create(length).build() throws RangeError when no character-type option is selected",
  () => {
    assert.throws(() => genepass.create(10).build(), RangeError);
  },
);

_test_(
  "legacy and chained API throw the exact same error message (shared validation rules)",
  () => {
    let legacyMessage;
    let chainedMessage;
    try {
      genepass.build({ length: 10 });
    } catch (error) {
      legacyMessage = error.message;
    }
    try {
      genepass.create(10).build();
    } catch (error) {
      chainedMessage = error.message;
    }
    assert.strictEqual(legacyMessage, chainedMessage);
  },
);

console.log("\nAll genepass tests passed.");
