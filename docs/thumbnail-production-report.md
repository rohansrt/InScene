# Thumbnail artwork production

Created 37 distinct images with the built-in ImageGen tool: all 35 canonical scenarios and the Police and School homepage audience cards. The existing home hero remains unchanged.

Art direction: `visual-language.md`. Prompt set: `thumbnail-prompts.json`. Scene-brief template: `scene-brief-template.json`. The final images interpret the canonical content in `image-manifest.json`; screen-heavy scenes were refined to avoid baked interface graphics.

Final assets live in `public/images/simulations/<slug>/` and `public/images/homepage/`. Each has a 1600×900 WebP and an 800×450 derivative. `src/assets/index.ts` registers their semantic keys, descriptive alt text and responsive sources using the configured base URL. The wide modal uses a top-aligned crop to preserve faces.

Validation completed:

- All 37 primary images have distinct SHA-256 hashes.
- All 74 exports have the expected dimensions.
- All 37 primary image URLs decode successfully in the production preview.
- TypeScript, production build, changed-file ESLint and whitespace checks pass.
- Desktop homepage/category, catalog, mobile catalog and wide modal screenshots were inspected.

Generation scratch files and review sheets remain under ignored `work/imagegen/`. Pushing these assets to `main` triggers the existing GitHub Pages deployment workflow.
