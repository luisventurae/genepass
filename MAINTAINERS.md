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
- `src/lib/chart.ts` — character set lookups (lowercase/uppercase/number/
  special).
- `src/lib/permuter.ts` — Fisher-Yates shuffle of the final password.
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
  options-object) and `genepass.create()...build()` (fluent/chainable) both
  call the exact same `build()` function in `generator.ts`, so they always
  produce the same validation errors and the same character-selection
  behavior. Never reimplement validation or generation logic in
  `builder.ts`.
- **No `any`, no type casts.** The codebase is fully typed; narrow types via
  local `const` bindings instead of non-null assertions or casts.

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
