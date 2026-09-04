# Multi-page release QA — September 2026

## Automated checks

- Production build: 18 HTML pages including a custom 404; Astro/TypeScript: zero errors, warnings or hints.
- ESLint for TypeScript and generation scripts passed; Prettier source check passed.
- `npm run check:routes` validates every root-relative link/asset reference across generated HTML and requires a real 404 page and skip-link targets.
- Browser route sweep: 17 content routes at 320×844, 390×844, 768×844 and 844×390; no horizontal document overflow, failed loaded images or runtime errors.
- Desktop inspection at 1440×1000, plus mobile screenshots of home, listening room, gallery, navigation, viewer and artist compositions.
- Gallery category filtering (4 people, 2 rooms), arrow navigation, Escape, focus restoration and scroll unlock checked.
- Native back/forward after menu navigation checked; restored pages have no open dialogs or stale scroll locks.
- Touch-enabled context: tap navigation, horizontal viewer swipe and navigation after portrait-to-landscape resize checked.
- Reduced-motion emulation disables motion; branded text selection computed on headings, paragraphs, links and buttons in light/dark content.
- Opt-in sound starts/stops; no automatic audio. Visibility/pagehide releases audio resources, including interrupted initialization.
- Local mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; CLS 0, TBT 0 ms, LCP 2.0 s. Lab measurements vary by run and environment.

## Fixes during QA

- Removed a redundant unused font preload.
- Moved Thierry's desktop title off the dark photograph for reliable contrast.
- Expanded final text-reveal clip boundaries to preserve descenders.
- Made dialog cancellation release scroll lock immediately.
- Added a route/asset checker and strict linting.

## Scope

Chromium desktop/mobile emulation was tested, including touch and reduced motion. Physical iOS/Safari and Android devices were not available. All public photos and proposed bios, events and sessions remain clearly identified placeholders; no invented ticket, audio or contact URLs are used.
