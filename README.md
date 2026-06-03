# VX Docs

Documentation website for [VX](https://github.com/5vnetwork/vx) and [vx-core](https://github.com/5vnetwork/vx-core), built with [Fumadocs](https://fumadocs.dev) and Next.js.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Documentation pages are at `/docs`.

## Build

```bash
npm run build
npm start
```

## Project Structure

| Path | Description |
| --- | --- |
| `content/docs/en/` | English MDX content |
| `content/docs/zh/` | Chinese MDX content (mirrors `en/`; falls back to English only if a page is missing) |
| `app/[lang]/docs/` | Documentation layout and pages |
| `lib/i18n.ts` | Locales and UI translations |
| `lib/source.ts` | Content source adapter |
| `lib/layout.shared.tsx` | Shared layout options |

## Languages

- **English** — `/docs/...` (default)
- **中文** — `/zh/docs/...`

Use the language switcher in the docs sidebar. Add matching paths under `content/docs/zh/` when translating new English pages.

## Adding Pages

Create a new `.mdx` file under `content/docs/en/` and add it to the relevant `meta.json`. For Chinese, add the same path under `content/docs/zh/` (or rely on English fallback).
