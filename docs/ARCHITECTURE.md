# Architecture

## Goal

Provide a minimal WeChat mini-program template where TypeScript source files are the authoritative code.

## Directory structure

- app.ts: app bootstrap and global lifecycle.
- app.json: page registration and window configuration.
- pages/: mini-program pages.
- utils/: shared helpers.
- typings/: global TypeScript declarations.
- scripts/: local automation scripts.

## Compile model

- TypeScript emits JavaScript files alongside source files.
- WeChat DevTools uses emitted JavaScript at runtime.
- npm run compile is the hook command used by project.config.json.

## Source-of-truth policy

- Edit .ts, .wxml, .wxss, and .json files.
- Treat generated .js files as build artifacts.
- Use npm run clean to remove generated outputs.

## Build commands

- npm run build: TypeScript emit.
- npm run compile: alias used by DevTools hooks.
- npm run rebuild: clean then build.
- npm run typecheck: strict no-emit validation.
