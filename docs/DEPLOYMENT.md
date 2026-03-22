# Deployment Workflow

## Build lifecycle

project.config.json is configured to run npm run compile before compile, preview, and upload actions.

## Recommended sequence

1. Install dependencies.

```bash
npm install
```

1. Clean generated outputs.

```bash
npm run clean
```

1. Compile TypeScript outputs.

```bash
npm run compile
```

1. Open project in WeChat DevTools and run preview/upload.

## Release hygiene

- Ensure project IDs are configured and not placeholders.
- Ensure typecheck passes before upload.
- Keep generated artifacts out of version control.
