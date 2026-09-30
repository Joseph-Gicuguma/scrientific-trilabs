# Tri-Lab Scientific website

Marketing site for Tri-Lab Scientific Limited, a Nairobi consultancy that helps international IVD and life-science companies enter and scale in East Africa.

Every route is prerendered to static HTML at build time and deployed to Vercel as a static site.

## Stack

- React 19, TypeScript (strict), Vite 8
- React Router 7 in framework mode, `ssr: false` with full prerendering
- Tailwind CSS v4, design tokens in `app/styles/app.css` (`@theme`)
- MDX for Insights articles
- react-hook-form + zod, posting to Formspree
- Motion for UI animation (contact form); CSS for the well plate and menu, so no animation library loads on every page
- Vitest + Testing Library, Playwright + axe-core
- Node 24 LTS (`.nvmrc`)

## Setup

```bash
nvm use            # Node 24
npm ci
cp .env.example .env
npm run dev        # http://localhost:5173
```

A development-only styleguide showing tones, type, buttons and the `WellPlate` component is at `/styleguide`. It is not built in production.

## Environment variables

| Name                      | Required          | Purpose                                                                                                                                                                                                                  |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_SITE_URL`           | Production        | Canonical origin, no trailing slash, e.g. `https://www.trilabscientific.com`. Used for canonical URLs, Open Graph, JSON-LD, `sitemap.xml` and `robots.txt`. If unset on Vercel, the project's production domain is used. |
| `VITE_FORMSPREE_ENDPOINT` | Yes, for the form | Formspree form endpoint, e.g. `https://formspree.io/f/abcdwxyz`. Without it the form shows a "not connected" message instead of failing silently.                                                                        |
| `VITE_CALENDLY_URL`       | No                | Calendly scheduling link. The embed loads only when a visitor asks for it. Without it the contact page shows a TODO marker.                                                                                              |

All three are read at build time, so rebuild after changing them.

## Scripts

| Command                | What it does                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                                                   |
| `npm run build`        | Prerenders every route into `build/client`                                   |
| `npm run preview`      | Serves the static build on port 4173                                         |
| `npm run check`        | Lint, type-check and unit tests                                              |
| `npm run test:e2e`     | Builds, serves and runs Playwright + axe on every route (desktop and mobile) |
| `npm run format`       | Prettier                                                                     |
| `npm run brand:images` | Regenerates `public/og/default.png`, `logo.png` and `apple-touch-icon.png`   |

First e2e run: `npx playwright install chromium`.

## Project structure

```
app/
  components/   Reusable UI: well-plate/, layout/, nav/, ui/
  sections/     Page compositions, grouped by page
  routes/       One file per route, plus sitemap.xml and robots.txt
  content/      All copy, typed. Edit text here, not in components
  content/insights/  MDX articles (file name = URL slug)
  lib/          SEO, schema.org, insights loader, contrast maths, helpers
  styles/       app.css (tokens, tones, base) and fonts.css
public/         Favicon, logo, Open Graph image
scripts/        Brand image generator, font subsetting
tests/e2e/      Playwright smoke and accessibility tests
```

## Editing content

- **Copy** lives in `app/content/*.ts`. Components only lay it out.
- **Unknown details** use `todo("…")` and render as a dashed TODO box. List them with `grep -rn "todo(" app/content`.
- **Copy rules** are enforced by `app/content/content.test.ts`: no em dashes and none of the banned buzzwords (leverage, seamless, empower, unlock, cutting-edge, revolutionize).
- **New article**: add `app/content/insights/<slug>.mdx` with this frontmatter. It is picked up by the list, the sitemap and prerendering automatically. Use `##` and `###` only; the page supplies the `h1`.

  ```yaml
  ---
  title: "…"
  description: "…" # up to 200 characters
  date: "2026-10-01"
  author: "Grace Wanjũgũ Kamau"
  ---
  ```

  Frontmatter is validated with zod, and a bad field fails the build. `<Todo>…</Todo>` is available inside MDX for editorial notes.

- **Portrait**: `app/assets/grace-portrait.jpg` is a 900x1125 (4:5) black-and-white crop with metadata removed. To change it, replace the file with the same ratio. The build outputs AVIF and WebP at 400, 700 and 900px (see the import in `app/content/founder.ts`).

### Open TODOs before launch

- Contact email and LinkedIn URL (`app/content/site.ts`)
- Calendly link (`VITE_CALENDLY_URL`)
- Formspree endpoint (`VITE_FORMSPREE_ENDPOINT`)
- Production domain (`VITE_SITE_URL`)
- Review of the placeholder article, which contains three `<Todo>` notes for facts to confirm

## Design system

- **Colours** are tokens in `app/styles/app.css`. ESLint rejects hex values in components.
- **Colour blocks**: `<Block tone="green">` sets background and text colour together. Text on green, orange and sage is always ink, and cream text is only used on ink. `app/lib/tokens.test.ts` reads the real CSS and checks every tone pair against WCAG AA.
- **Fonts**: Inter Tight (display), Bitter (body, 18px), Doto (numerals only). Self-hosted, Latin only. The ũ in "Wanjũgũ" comes from 1.5 KB subsets in `app/assets/fonts` (`scripts/subset-fonts.sh`), which avoids about 120 KB of Latin Extended font files.
- **`<WellPlate>`** draws any plate size from a fill map. The East Africa map is a text drawing in `app/components/well-plate/maps/east-africa.ts`. The "pipetting" animation is pure CSS and is off under `prefers-reduced-motion`.

## Deploying to Vercel

1. Import the GitHub repository in Vercel. `vercel.json` sets the build command, the output directory (`build/client`), clean URLs, security headers and long-term caching for hashed assets.
2. In Project Settings > Environment Variables, add `VITE_SITE_URL`, `VITE_FORMSPREE_ENDPOINT` and, if used, `VITE_CALENDLY_URL` for Production (and Preview if wanted).
3. Deploy. Pushes to `main` deploy to production, and other branches get preview URLs.
4. Add the custom domain under Project Settings > Domains, set `VITE_SITE_URL` to match, and redeploy.
5. In Formspree, add the production domain to the form's allowed domains.

Unknown URLs are served `404.html` with a real 404 status.

If you add Calendly or another third party, update the `Content-Security-Policy` header in `vercel.json` to allow it.

## Quality checks

- One `h1` per page, skip link, visible focus on every tone, keyboard-accessible mobile menu (focus trap, Escape, inert background)
- axe (WCAG 2.2 AA) runs on every route in desktop and mobile layouts
- Per-route title, description, canonical, Open Graph and Twitter tags, plus Organization, Person and Article JSON-LD
- Lighthouse, measured locally against the static build with mobile throttling: Accessibility, Best Practices and SEO 100 on every page tested; Performance 94 to 97
