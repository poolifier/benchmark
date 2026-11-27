# Coding Agent Instructions (repository-wide, language-agnostic)

These instructions guide coding agents to generate changes consistent with this repository's conventions, regardless of programming language.

## Glossary

- **Tunables**: user-adjustable parameters that shape behavior, exposed via environment variables or CLI flags.
- **Canonical defaults**: the single, authoritative definition of all tunables and their defaults (`utils.cjs`: `BenchmarkDefaults`, `TaskTypes`).
- **Benchmark scripts**: one Node.js script per pool × pool-mode (`dynamic-*`/`fixed-*`), executed via hyperfine.

## Implementation guidance

- **Before coding**:
  - Perform a comprehensive inventory of the codebase. Search for and read:
    - README.md, and all other documentation files.
    - code files related to the task.
  - Identify existing code architecture, design patterns, canonical defaults, naming patterns and coding styles.
- **When coding**:
  - Follow the core principles and JavaScript/Node.js conventions below.
  - Follow identified design patterns, naming patterns and coding styles.
- **After coding**:
  - Ensure changes pass quality gates below.
- **When adding a tunable**:
  - Add to canonical defaults with safe value.
  - Ensure the options and configuration section below is respected.
  - Update README.md and `bench.sh` usage documentation.
- **When adding or changing a benchmark target**:
  - Follow the benchmark conventions below.
- **When refactoring**:
  - Keep public behavior stable (environment variables, CLI flags, output formats); provide aliases if renaming unless explicitly requested.
  - Update code and documentation atomically.
- **When documenting**:
  - Follow documentation conventions below.

## Core principles

- **Design patterns**: prefer established patterns (e.g., factory, singleton, strategy) for code organization and extensibility.
- **Algorithmic**: prefer algorithms or heuristics solving the problem while minimizing time and space complexity.
- **DRY**: avoid duplication of logic, data, and naming. Factor out commonalities.
- **Single source of truth**: maintain a canonical defaults map for configuration tunables. Derive all user-facing options automatically.
- **Naming coherence**: prefer semantically accurate names across code, documentation, directories, and outputs. Avoid synonyms that create ambiguity.
- **English-only**: code, tests, logs, comments, and documentation must be in English.
- **Small, verifiable changes**: prefer minimal diffs that keep public behavior stable unless explicitly requested.
- **Tests-first mindset**: add or update minimal verification before refactoring or feature changes. This repository has no test suite; verify changes with `pnpm lint`, `pnpm format` and a smoke benchmark (e.g., `./bench.sh -i 100`).
- **Documentation standards**: must follow established standards for programming languages.

## Options and configuration

- **Dynamic generation**: derive CLI and configuration options automatically from canonical defaults. Avoid manual duplication.
- **Merge precedence**: defaults < user options < explicit overrides (highest precedence). Never silently drop user-provided values. In this repository: canonical defaults (`utils.cjs`) < environment variables (`POOL_SIZE`, `TASK_SIZE`, `TASK_TYPE`, `NUM_ITERATIONS`) < CLI flags (`bench.sh`).
- **Validation**: enforce constraints (choices, ranges, types) at the option layer with explicit typing. Example: `Number.parseInt` with range checks; never rely on truthiness fallbacks for values that are valid falsy.
- **Help text**: provide concrete examples for complex options, especially override mechanisms.

## Benchmark conventions

- **Isolation and warmup**: each pool runs in an isolated Node.js process via hyperfine; never import or share benchmark state across pools; keep `--prepare 'sleep 5'`, `--warmup 3` and the quiet-machine guidance; do not weaken isolation for convenience.
- **Fair comparison**: identical task, identical data, identical machine conditions across pools; dynamic pools use `Math.floor(size / 2)` as minimum size, fixed pools use `size`.
- **Output stability**: results must remain comparable over time — keep the `BENCH.md`/`BENCH.json` export contract (hyperfine `--export-markdown`/`--export-json`) stable.

## Reporting conventions

- **Structure**: start with run configuration (pool size, iterations, task type/size, machine), then stable section order for comparability.
- **Format**: use structured formats (e.g., JSON and markdown exports for `BENCH.json` and `BENCH.md`) for metrics; avoid free-form text for data.
- **Interpretation**: include threshold guidelines (e.g., bencher latency thresholds); avoid overclaiming certainty.
- **Artifacts**: timestamp outputs; include configuration metadata (node, pnpm, platform, `BENCHER_*` env).

## Documentation conventions

- **Clarity**: plain, unambiguous language; avoid marketing jargon and speculation.
- **Concision**: remove boilerplate; state facts directly without redundant phrasing.
- **Structure**: use consistent section ordering; follow stable patterns for comparable content.
- **Timeliness**: document current state; exclude historical evolution (except brief API breaking change notes).
- **Terminology**: use correct and consistent terminology; distinguish clearly between related concepts (e.g., `idleTimeout` vs `taskTimeout`).
- **Exhaustivity**: cover all user-facing behavior and constraints; omit internal implementation details unless necessary for usage.
- **Pertinence**: include information that aids understanding or usage; remove tangential content.
- **No duplication**: maintain single authoritative documentation source; reference other sources rather than copying.

Documentation serves as an operational specification, not narrative prose.

## JavaScript conventions

- **Naming**: Use camelCase for variables/functions/methods, PascalCase for classes/types.
- **Async operations**: Prefer async/await over raw Promises; handle rejections explicitly with try/catch.
- **Error handling**: Use descriptive errors with structured properties when applicable.
- **Module system**: `.cjs` files for CommonJS (worker-nodes), `.mjs` for ECMAScript modules (poolifier, piscina, etc.); do not mix without need.
- **Worker communication**: Use decoupled worker<->main thread messaging; task functions receive serializable data and return serializable results; avoid ad-hoc shared state across pools.
- **Null safety**: Avoid non-null assertions; use optional chaining (`?.`) and nullish coalescing (`??`).
- **Type safety**: Prefer explicit JSDoc types over `any`; use type guards where appropriate.
- **Promise patterns**: Return Promises from async operations; store resolvers/rejectors in Maps for request/response flows.
- **Immutability**: Avoid mutating shared state; clone objects before modification when needed.
- **Self-contained tasks**: benchmark task functions must be self-contained and thread-safe.

## Quality gates

- Documented build/format/lint checks pass (where applicable).
- Smoke benchmark runs: `./bench.sh -i 100` (small size; do not run a full benchmark in CI except via the scheduled workflow).
- Documentation updated to reflect changes when necessary.
- Logs use appropriate levels (error, warn, info, debug).
- Pull request title and commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format.

---

By following these instructions, coding agents should propose changes that are consistent and maintainable across languages.
