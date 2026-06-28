# Maintainers

This document is for people developing, maintaining or contributing to
`genepass`. It is **not** shipped in the published npm package (see
"What gets published" below) — it only lives in the GitHub repository.

## Development setup

```bash
npm install        # installs typescript + @types/node (devDependencies only)
npm run build       # compiles src/**/*.ts -> dist/**/*.js + .d.ts (tsc)
npm test            # runs test/index.test.js against dist/main.js
```

There is no CI in this repo, so `dist/` is committed to git by hand after
every change to `src/`. Always run `npm run build` and `npm test` before
committing, and review `git diff dist/` to confirm only the expected lines
changed.

## Project structure

- `src/main.ts` — public entry point, exports `{ build, create, Builder }`.
- `src/bin/generator.ts` — the generation engine: `build()`, `_validations`
  (the single source of truth for what a valid `options` object looks like)
  and `_logic` (character selection).
- `src/bin/builder.ts` — fluent/chainable `Builder` class and `create()`
  factory. It does **not** duplicate generation or validation logic — it
  builds an `options` object and delegates to the same `build()` from
  `generator.ts`. Any rule change must happen in `generator.ts` only, so the
  legacy and chained APIs can never drift apart.
- `src/lib/chart.ts` — `_CATEGORY_ALPHABETS_`, the registry mapping each
  option name (`lowercase`/`uppercase`/`number`/`special`) to its full
  character set, plus `_pick_`, the single choke point for drawing a
  uniformly random character from an alphabet. Adding a new character-type
  method in the future (e.g. a `hex` category) means adding one entry here
  — `generator.ts`'s distribution logic does not change.
- `src/lib/permuter.ts` — generic Fisher-Yates shuffle (`_shuffleArray_`)
  plus the `_shuffle_` string wrapper used on the final password.
- `src/lib/random.ts` — `_secureRandomInt_`, the single choke point for all
  randomness in the package.
- `dist/` — compiled output, **generated, never edited by hand**.

## Design decisions

- **Zero runtime dependencies.** `crypto` is a Node built-in, so using
  `crypto.randomInt` doesn't violate this. `typescript`/`@types/node` are
  devDependencies only — they are never installed by consumers.
- **`crypto.randomInt` instead of `Math.random()`.** `Math.random()` in
  V8 is a non-cryptographic PRNG (xorshift128+); its state can be
  reconstructed from observed outputs, which would let an attacker predict
  passwords generated before/after in the same process (CWE-338). This is
  why `engines.node` requires `>=14.10.0` — the version `crypto.randomInt`
  was introduced in.
- **One shared engine, two APIs.** `genepass.build({...})` (legacy,
  options-object) and `genepass.create(length)...build()` (fluent/chainable) both
  call the exact same `build()` function in `generator.ts`, so they always
  produce the same validation errors and the same character-selection
  behavior. Never reimplement validation or generation logic in
  `builder.ts`.
- **No `any`, no type casts.** The codebase is fully typed; narrow types via
  local `const` bindings instead of non-null assertions or casts.
- **Unbiased character selection.** `_pick_(alphabet)` in `chart.ts` always
  indexes the _entire_ alphabet with `_secureRandomInt_(0, alphabet.length)`.
  Never call `_secureRandomInt_` with a hand-picked sub-range (e.g. `1..26`)
  as a substitute for `0..length` — that was the v2.1.0 bug: it made the
  first character of every alphabet (`'a'`, `'$'`, digit `'0'`, ...)
  unreachable. `crypto.randomInt` already rejection-samples internally — it
  draws raw values from a range `R` and discards (rejects) any value that
  would make some characters more likely than others, retrying until one
  lands inside the largest multiple of `N` that fits in `R`:

  $$\text{accept } v \iff v < N\left\lfloor \frac{R}{N}\right\rfloor$$

  so every accepted draw satisfies `P(pick x) = 1/N` for all `x` in the
  alphabet — feeding it the full, correct range is all that's needed for a
  uniform distribution. This is also why the Fisher-Yates shuffle in
  `permuter.ts` draws its swap index from `_secureRandomInt_(0, currentIndex)`
  (inclusive lower bound, exclusive upper bound matching the unshuffled
  prefix) — it's the same uniformity requirement, applied so that every
  permutation of the password's characters is equally likely:

  $$P(\text{any specific permutation}) = \frac{1}{L!}$$

- **Randomized category counts, not equal split.** When multiple categories
  are selected, `_logic` in `generator.ts` gives each one guaranteed slot,
  then hands out the remaining slots one at a time to a uniformly random
  category — a multinomial draw conditioned on every category having count
  ≥ 1. Forcing equal counts (e.g. always 3-3-3-3 for `length: 12` with 4
  categories) throws away a large share of the available entropy:

  $$H = \log_2 \binom{L-1}{k-1} + \log_2 \frac{L!}{c_1!\,c_2!\cdots c_k!} \;\text{bits of extra uncertainty from the split alone}$$

  (`L` = password length, `k` = number of selected categories, `cᵢ` = how
  many characters category `i` contributed) — on top of the
  `log2(N)` bits each individual character already contributes. Randomizing
  the split recovers those bits instead of discarding them by always
  setting every `cᵢ` equal.

- **"At least one of each" is inclusion-exclusion, not always free.** For a
  uniform draw of length `L` over the union alphabet (size `N`) to contain
  every one of the `k` required categories (sizes `s₁ … s_k`) is not
  guaranteed — its probability is given by inclusion-exclusion over "which
  categories are missing":

  $$P(\text{all } k \text{ present}) = \sum_{j=0}^{k} (-1)^j \binom{k}{j} \left(\frac{N - s_j}{N}\right)^{L}$$

  For `N=68` (all four categories), `L=12`, the chance of _missing_ just the
  6-character special set is `(62/68)¹² ≈ 33%` — too high to leave to
  chance. That's why `_logic` reserves one guaranteed slot per selected
  category up front (`_categories.map((_c) => [_c, 1])`) instead of relying
  on a fully uniform draw over the union alphabet: it's a hard guarantee
  that costs only a little of the entropy computed above, rather than a
  one-in-three chance of an incomplete password. The guarantee only holds
  when `length >= number of categories`; below that it's unsatisfiable by
  the pigeonhole principle, so `_logic` falls back to a uniformly random
  subset of the selected categories instead of always favoring the
  first-declared ones.

## Shipping TypeScript types

`tsconfig.json` has `declaration`/`declarationMap` enabled, and
`package.json` has `"types": "dist/main.d.ts"`. This means TypeScript
consumers get full autocompletion and type checking with zero extra setup
(no `@types/genepass` needed). If you add a new public export, make sure
it's re-exported from `src/main.ts` so its types are reachable from
`dist/main.d.ts`.

## What gets published to npm

`package.json` has a `"files"` whitelist:

```json
"files": ["dist", "README.md", "LICENSE"]
```

Only those paths are included in the npm tarball — **not** `src/`, `test/`,
`tsconfig.json`, or this file. Note that npm publishing is controlled by
this whitelist, not by what's tracked in the `master` git branch — files
can exist in the repo (visible on GitHub) without ever being published.

Before cutting a release, sanity-check the tarball contents with:

```bash
npm pack --dry-run
```

## Tests

`test/index.test.js` uses Node's built-in `assert` (no test framework
dependency) and is organized into two sections:

- **Happy path** — valid inputs produce correctly-shaped passwords.
- **Fail path** — invalid inputs throw `RangeError` with the expected
  message.

When adding a new option or API surface, add both a happy-path and a
fail-path test for it, following the existing `_test_(name, fn)` pattern.

## Release process

1. Bump `version` in `package.json` (semver).
2. `npm run build` to regenerate `dist/`.
3. `npm test` to confirm everything still passes.
4. Update `README.md` if user-facing behavior changed.
5. Commit `dist/` along with the source changes.
6. `npm publish`.
