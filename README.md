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
  data/simulations/  Learning content, types and catalog queries
  assets/        Media metadata, image registry and URL helpers
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

- **Simulations:** edit `src/data/simulations/police.ts` or `src/data/simulations/school.ts`. Cards, filters, counts and modals all render from this data.
- **Founder LinkedIn URLs:** set `linkedinUrl` in `src/config/contact.ts`. Until then the site shows a non-clickable placeholder.
- **Logo:** replace the files in `public/brand/` or change the paths in `src/config/brand.ts`.

## Assets and future simulation scenes

Media lives in `src/assets/`, separate from simulation learning content in `src/data/simulations/`.
Each simulation owns `public/images/simulations/<slug>/` with `thumbnail.webp`,
`thumbnail-800.webp`, and a `scenes/` directory when it has scene artwork.

Register thumbnail alt text and dimensions in `src/assets/simulation-media.json`.
Register future scene images in the same simulation's `scenes` object; consume them
with `getSimulationScene(slug, sceneId)`. Use `assetUrl()` for any public asset URL
so local development and GitHub Pages subpaths both work.

See [the code and asset guide](docs/architecture.md) for the folder tree, example
scene registration, and validation commands. `npm run validate:assets` checks asset
references and runs automatically during production builds.

## Deploy

`npm run build` produces a static site in `dist/`. Because this is a client-side router, the host must serve `index.html` for unknown paths:

- **GitHub Pages (current):** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the repo's Settings → Pages, set Source to "GitHub Actions". The workflow sets the base path from the Pages URL and copies `index.html` to `404.html` so direct links to `/products` etc. work.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `dist`. `public/_redirects` already contains the SPA fallback.
- **Any other static host (S3 + CloudFront, Nginx, …):** configure a fallback to `/index.html` with status 200.

## Documentation

- `docs/design-system.md` — design research summary, card concept comparison, design tokens and component anatomy
- `docs/product-spec.md` — sitemap, page specs, component inventory, modal spec, responsive rules
- `docs/content-gap-report.md` — what the source PDFs do not specify, and how the site handles it
- `docs/image-manifest.json` — all 38 image placements with scenario-specific prompts
- `docs/qa-report.md` — verification results

The source PDFs are deliberately not committed (`*.pdf` is in `.gitignore`).
