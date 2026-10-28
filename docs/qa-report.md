# QA Report — InScene Website V1

Date: 28 Oct 2026 · Branch: `feat/website-v1`

## Verification

| Check | Result |
| --- | --- |
| `npm run typecheck` (tsc, strict) | Pass |
| `npm run lint` (ESLint + React hooks / compiler rules) | Pass, 0 warnings |
| `npm run build` | Pass. JS 476 KB (148 KB gzip), CSS 54 KB (10 KB gzip) |
| `npm run test:e2e` (Playwright, headless Chromium 148, production build) | **38/38 checks pass** |
| Console errors during the full run | None |

### What the e2e suite covers (`scripts/e2e.mjs`)

**Navigation and routing**
- The three nav links, active states, logo link and the 404 page.
- `/index.html` redirects home; unknown nested routes are not marked active.
- Direct reload of every route, including deep-linked modals.

**Home page**
- The How It Works anchor.
- Both category cards lead to the correct catalog.
- Four featured cards, each opening its own modal.

**Products page**
- Police shows 5 simulations; each school band shows 10; Academic and Non-academic split 5/5.
- Arrow-key tab navigation.
- Invalid query parameters are normalised.

**Simulation modal**
- **All 35 cards** open the matching modal (slug, title and all four sections).
- Esc closes the modal and returns focus to the card.
- The URL `?sim=` parameter syncs.
- Police Basic/Advanced shows the documented text; school levels show "Details coming soon".
- Play Now opens Coming Soon; Back to simulation and Back to simulations both work.
- Close by close button, backdrop click and browser Back (filters are kept).
- Body scroll lock.
- Regressions: double-click close, double-click open, keyboard scrolling of modal content, level and focus kept after Coming Soon, no page jump after an anchor link.

**Play a Demo**
- Works on all three pages: dialog → track choice → Play Demo → Coming Soon → Esc → focus returns.
- The Browse link navigates to the chosen catalog.

**Reach Out page and footer**
- `mailto:founder@anagat.net` and `tel:+918979484758` links work.
- LinkedIn placeholders are non-clickable, with no LinkedIn links anywhere.
- Founder names are correct.
- Footer brand line, email and current year.

**Responsive**
- No horizontal overflow at 320, 390 and 768 px.
- Mobile menu: opens, navigates, closes, makes the page content inert, and Esc closes only the topmost layer.
- On the mobile sheet, Play Now stays visible.

Screenshots are written to `qa-artifacts/` (git-ignored) and were reviewed at 1440, 768 and 390 px.

## Independent review

A separate reviewer agent tested the running build with its own Playwright scripts at 1440, 1024, 768, 390 and 320 px. It covered keyboard-only use, an in-browser accessibility audit, edge cases, a code read, and a check of 6 scenarios against the data.

### Fixed

| Severity | Finding | Fix |
| --- | --- | --- |
| High | Double-clicking a close control navigated back twice and left the page | Close guard in `SimulationModalContext` |
| High | Keyboard users could not scroll the modal: initial focus sat outside the scroll area | Dialog now focuses the scroll region on open |
| Med | Double-clicking a card pushed two history entries | Pending-open guard. The backdrop also ignores presses in the first 350 ms after opening |
| Med | Opening a modal after an in-page anchor jumped the page and lost position on close | The fragment is dropped from the history entry before opening; scroll is restored on close; route scroll-reset only fires on path changes |
| Med | Mobile menu let focus Tab into covered content | `main` and footer are made `inert` while the menu is open |
| Med | Scroll lock got stuck after resizing past `md` with the menu open | The menu closes when the viewport crosses the breakpoint |
| Med | Wordmark collided with the CTA at 320 px | Wordmark is visually hidden below 360 px; the link keeps its label |
| Med | Cards were buttons wrapping headings, so screen readers missed card content | Stretched-button pattern: the `h3` contains the button, and the summary is linked with `aria-describedby` |
| Med | Focus dropped to `body` after "Back" in Coming Soon; the chosen level reset | Focus returns to Play Now / Play Demo; level state and scroll position are kept |
| Low | Orphaned meta separators and a wrapping card action | Duration moved to an image badge; the action no longer wraps |
| Low | Tab counts and step numerals at 2.5:1 contrast | Changed to `#64748B` (≥4.5:1) |
| Low | `aria-controls` pointed at a missing menu id; grade tabs had no tabpanel | Menu `aria-controls` is set only when open; a grade tabpanel was added |
| Low | Esc with the menu and dialog both open closed both | Dialog handles Esc in the capture phase with `stopImmediatePropagation` |
| Low | `/products/abc` highlighted Products; `/index.html` returned 404; 404 page indexable | Exact nav matching, an `/index.html` redirect, and `noindex` on the 404 page |
| Low | Invalid `?grade=` / `?sim=` values stayed in the URL | Normalised with `replace` |
| Low | Wordmark gradient used an off-palette blue | Solid brand blue |
| Low | Only the first police quote was shown | All documented quotes are shown |

### Not changed (accepted)

- The school modal eyebrow can wrap at 320 px. It is cosmetic.
- At 320 px, the Play Demo button in the demo dialog sits below the fold. The dialog scrolls.

## Not verified

- Real screen-reader output (VoiceOver/NVDA) and iOS Safari scroll lock.
- Scrollbar-compensation layout shift: headless browsers have no scrollbars.
- Clipboard copy on the Reach Out page.
- Browsers other than Chromium.

## Images

No generated illustrations are integrated, because the build environment had no image-generation capability. All 38 placements render branded placeholders at their final aspect ratios. `docs/image-manifest.json` holds scenario-specific prompts and integration steps, and adding art needs no layout changes. The official InScene mark supplied by the team is integrated in the header, footer, hero, dialogs, favicon and Open Graph image.
