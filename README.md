# InScene

InScene is an AI-powered scenario learning platform from **Anagat AI Solutions**. It enables immersive, interactive simulations for real-world decision-making, skill development and experiential training.

*Step Into the Situation.*

This repository holds the **InScene marketing website (V1)**. It is a static single-page app built with React 19, TypeScript, Vite, Tailwind CSS v4, React Router and Lucide icons. There is no backend.

## Pages

| Route | Contents |
| --- | --- |
| `/` | Home page: hero, how InScene works, the two training categories, featured simulations, why scenario-based learning, and a final call to action |
| `/products` | Simulation catalog: Police Training, and School Training split into Grades 6–8 / 9–10 / 11–12 with an Academic / Non-academic filter |
| `/reach-out` | Founder contact details |

- Catalog state lives in the URL: `?category=school&grade=9-10&strand=academic`.
- Adding `?sim=<slug>` to any page opens that simulation's preview, so previews can be shared as links.
- **Play Now** and **Play a Demo** lead to a Coming Soon state. V1 has no playable simulation.

## Run locally

Requires Node 20 or newer (developed on Node 22).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Quality checks

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm run build       # typecheck + production build to dist/
npx vite preview --port 4173 &   # serve the production build
npm run test:e2e    # Playwright end-to-end suite (30 checks); screenshots go to qa-artifacts/
```

The e2e script uses Playwright's bundled Chromium. If that browser isn't installed, either run `npx playwright install chromium` or set `PW_CHROMIUM_PATH` to a Chromium binary. Set `SHOTS=0` to skip screenshots.

## Project structure

```text
src/
  data/          simulation catalog (police.ts, school.ts), types, image registry
  config/        brand.ts, contact.ts (founder details and LinkedIn URLs), nav.ts
  components/
    layout/      header, mobile menu, footer, layout
    home/        homepage sections
    simulation/  ScenarioImage, cards, preview modal, Coming Soon panel
    demo/        Play a Demo dialog
    ui/          Button, Dialog, SegmentedTabs, Chip/Badge, Logo, Reveal
  pages/         Home, Products, ReachOut, NotFound
  styles/        Tailwind theme tokens and global styles
public/brand/    official InScene mark, logo, favicon, Open Graph image
docs/            design system, product spec, content-gap report, image manifest, QA report
scripts/e2e.mjs  end-to-end interaction tests
```

## Editing content

- **Simulations:** edit `src/data/police.ts` or `src/data/school.ts`. Cards, filters, counts and modals all render from this data.
- **Founder LinkedIn URLs:** set `linkedinUrl` in `src/config/contact.ts`. Until then the site shows a non-clickable placeholder.
- **Logo:** replace the files in `public/brand/` or change the paths in `src/config/brand.ts`.

## Adding illustrations

Every image slot uses a semantic key, such as `home.hero` or `simulation.fair-exam-march`. If no artwork is registered for a key, the slot shows a branded placeholder at the final aspect ratio.

1. Generate each image from its prompt in `docs/image-manifest.json`. Prompts cover the shared style, palette and negative prompt.
2. Export it as WebP at 1600×900 (16:9), or 1600×1200 for the 4:3 hero. Add an 800-px version for `srcSet`.
3. Save it to `public/images/...` at the manifest's `assetPath`.
4. Add an entry in `src/data/images.ts` with `src`, `srcSet`, `alt`, `width` and `height`. The layout doesn't change.

**Current status:** no generated illustrations are integrated. The build environment had no image-generation capability, so all 38 slots show placeholders. Every prompt is ready in the manifest.

## Deploy

`npm run build` produces a static site in `dist/`. Because this is a client-side router, the host must serve `index.html` for unknown paths:

- **Vercel:** import the repo. Framework preset Vite, output directory `dist`. `vercel.json` already contains the rewrite.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `dist`. `public/_redirects` already contains the SPA fallback.
- **Any other static host (S3 + CloudFront, Nginx, …):** configure a fallback to `/index.html` with status 200.

## Documentation

- `docs/design-system.md` — design research summary, card concept comparison, design tokens and component anatomy
- `docs/product-spec.md` — sitemap, page specs, component inventory, modal spec, responsive rules
- `docs/content-gap-report.md` — what the source PDFs do not specify, and how the site handles it
- `docs/image-manifest.json` — all 38 image placements with scenario-specific prompts
- `docs/qa-report.md` — verification results

The source PDFs are deliberately not committed (`*.pdf` is in `.gitignore`).
