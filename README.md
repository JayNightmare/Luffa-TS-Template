# Luffa TypeScript Mini Program Template

A lightweight WeChat mini-program template with TypeScript as the source of truth.

## Why this template

- TypeScript-first workflow with strict compiler checks.
- Minimal dependency surface for easier onboarding.
- Predictable compile flow that works with WeChat DevTools hooks.

## Prerequisites

- Node.js 18+
- npm 9+
- WeChat DevTools

## Quick start

1. Install dependencies.

```bash
npm install
```

1. Clean generated artifacts.

```bash
npm run clean
```

1. Build TypeScript sources.

```bash
npm run compile
```

1. Open the project in WeChat DevTools.

1. Verify these fields in project configuration.

- appid
- tmfappid
- LuffaToolsappid
- projectname

See SETUP.md for details.

## Scripts

- npm run build: compile TypeScript into JavaScript.
- npm run compile: alias for build used by project compile hooks.
- npm run typecheck: run strict TypeScript checks without emitting files.
- npm run clean: remove generated artifacts.
- npm run rebuild: clean then build.

## Project layout

- app.ts: app bootstrap and global initialization.
- pages/: mini-program pages.
- utils/: shared helper modules.
- typings/: app-level type declarations.
- scripts/: local automation scripts.

## Notes

- Generated JavaScript files are intentionally ignored. Keep TypeScript files as the editable source.
- project.config.json compile hooks call npm run compile before compile/preview/upload.

## Documentation

- SETUP.md: first-run environment and compile checklist.
- docs/ARCHITECTURE.md: source layout and compile conventions.
- docs/AUTH.md: current auth behavior and planned migration path.
- docs/DEPLOYMENT.md: compile and release workflow through DevTools.
