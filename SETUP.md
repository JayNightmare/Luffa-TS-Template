# Setup Guide

## 1. Configure environment

Install required tools:

- Node.js 18+
- npm 9+
- WeChat DevTools

## 2. Install dependencies

```bash
npm install
```

## 3. Configure project IDs

Open project.config.json and set the following values:

- projectname
- appid
- tmfappid
- LuffaToolsappid

## 4. Compile and verify

Run:

```bash
npm run rebuild
npm run typecheck
```

Expected result:

- Commands exit with code 0.
- Generated JavaScript appears next to TypeScript files for mini-program runtime.

## 5. Open in WeChat DevTools

1. Import this folder as a mini-program project.
2. Confirm compile hooks are enabled in project config.
3. Use preview/build in DevTools.

## Troubleshooting

## Build succeeds but app does not run in DevTools

- Re-run npm run rebuild.
- Confirm appid and related IDs are not placeholders.
- Confirm pages listed in app.json match existing files.

## Typecheck fails

- Run npm install again.
- Check that typings/index.d.ts exists.
