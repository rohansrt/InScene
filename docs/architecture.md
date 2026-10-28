# Code and asset organization

The app keeps page composition, reusable UI, learning content, and media metadata separate.

```text
src/
  pages/                  Route-level layout and composition
  components/
    home/                 Homepage sections
    simulation/           Shared simulation cards, previews and artwork renderer
    layout/               Navigation and page frame
    ui/                   General buttons, dialogs and other primitives
  data/simulations/
    police.ts, school.ts  Simulation learning content
    index.ts              Catalog queries and filters
    types.ts              Learning-content types
  assets/
    paths.ts              Public URL resolution, including GitHub Pages base path
    types.ts              Image and simulation-media contracts
    simulation-media.json Thumbnail metadata and named scenes per simulation slug
    simulations.ts        Thumbnail and scene lookup API
    homepage-media.json   Homepage category image metadata
    index.ts              Semantic image registry and public exports
  config/                 Brand, navigation and founder contact information
public/
  brand/                  Logos, icons and brand files
  images/
    simulations/
      <simulation-slug>/
        thumbnail.webp
        thumbnail-800.webp
        scenes/           Create when a simulation has scene artwork
          opening.webp
          decision-01.webp
    homepage/             Homepage category illustrations
    how-it-works/         Process illustrations
    founders/             Founder portraits
scripts/
  validate-assets.mjs     Media integrity checks run by the production build
  e2e.mjs                 Browser interaction regression checks
```

## Add simulation artwork

1. Use the simulation's existing stable slug as the folder name. Keep thumbnails at
   1600×900 and 800×450; use meaningful kebab-case filenames for scenes.
2. Add the thumbnail metadata to `src/assets/simulation-media.json`. The registry
   supplies paths and responsive sources automatically. Preserve semantic keys such
   as `simulation.fair-exam-march` in learning content.
3. Add scene metadata only when files exist. Do not create empty scene placeholders.

Example entry (the opening scene is illustrative and must be created before registering):

```json
{
  "fair-exam-march": {
    "thumbnail": { "alt": "A calm conversation at a peaceful march.", "width": 1600, "height": 900 },
    "scenes": {
      "opening": { "file": "opening.webp", "alt": "The opening scene at the meeting point.", "width": 1600, "height": 900 }
    }
  }
}
```

Use `getSimulationThumbnail(slug)` or `getSimulationScene(slug, 'opening')` from
`src/assets` in new features. Both return `ImageAsset | undefined`; handle an
unregistered image with a placeholder. `ScenarioImage` continues to accept stable
semantic keys for catalog thumbnails. No scene UI or simulation behavior is added
by registering media alone.

Use `assetUrl('images/...')` for other public images. Never hardcode a root URL:
GitHub Pages may host this app under `/InScene/`.

## Maintenance

Run `npm run validate:assets`, `npm run typecheck`, `npm run lint`, and
`npm run build`. Run `npm run test:e2e` against a preview server after changes to
catalog cards or routing. The asset validator rejects missing registered files,
invalid dimensions, unsafe scene filenames and duplicate-style image filenames.

Keep originals and production scratch files outside `public/`; everything in
`public/` is shipped. `work/`, `.pnpm-store/`, `dist/`, and `qa-artifacts/` are
ignored. Delete duplicate exports only after comparing their bytes.

Generation prompts and art direction remain in `docs/`. Their `assetPath` entries
use the same per-simulation folder layout as the runtime registry.
