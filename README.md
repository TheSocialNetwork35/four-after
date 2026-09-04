# FOUR / AFTER

Independent DJ collective — Yannis, Cian, Maxim, Thierry.

**Production:** https://four-after.pages.dev

**Repository:** https://github.com/TheSocialNetwork35/four-after

## Development

Node 22.12+; `npm ci`, then `npm run dev`.

- `npm run build`: Astro + strict TypeScript checks, then static production build.
- `npm run preview`: inspect the production build locally.
- `npm run lint`: ESLint for TypeScript interactions/data and generation scripts.
- `npm run format:check`: source formatting, including Astro components.
- `npm run images:build`: generate responsive WebP variants and the image manifest.
- `npm run brand:generate`: regenerate vector branding, social preview and abstract cover artwork from design tokens.

Astro static HTML, TypeScript, self-hosted Inter Tight / IBM Plex Mono, CSS motion and native browser APIs. No React runtime, tracking, remote embeds, autoplay audio or continuous WebGL render loop. Gallery, audio and booking code load only on the relevant pages.

## Architecture

- `/`: interactive geometric 3D speaker, opt-in directional room sound and curated previews.
- `/artists/`: editorial artist directory.
- `/artists/{yannis,cian,maxim,thierry}/`: four distinct hero compositions, bios, music, visual notes and booking.
- `/music/` and `/music/{after-hours,between-worlds}/`: listening room, interactive vinyl, opt-in sound study and session detail pages.
- `/events/` and `/events/{the-first-chapter,somewhere-after-dark}/`: event formats and detail pages, ready for confirmed dates and ticket links.
- `/gallery/`: asymmetric visual journal, category filters and keyboard/touch fullscreen viewer.
- `/collective/`: manifesto, image essay and collective introduction.
- `/booking/`: contact preparation and a locally copied booking brief.
- `/impressum/`, `/datenschutz/`: clearly marked legal placeholders.
- `/404.html`: real not-found page.

Every route is built as HTML. Direct loads, refresh and browser history use native navigation, enhanced with cross-document view transitions. No SPA catch-all redirect is required. Existing homepage section URLs are redirected to their corresponding new routes in the browser.

## Editing content

| Location                                      | Purpose                                                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `src/data/collective.ts`                      | Brand, real shared booking email, artist names, genres, bios and social links                             |
| `src/data/editorial.ts`                       | Artist layout/photo choices, quotes, sessions and event formats; adding a slug generates its detail route |
| `src/data/assets.ts`                          | Photo descriptions, alt text, focal positions and gallery entries/categories/layout rhythm                |
| `src/data/navigation.ts`                      | Shared navigation and page descriptions                                                                   |
| `src/pages/`                                  | Page-specific headings, stories and compositions                                                          |
| `src/styles/tokens.css`                       | Palette, fonts, selection colors, spacing and motion primitives                                           |
| `src/styles/pages.css`                        | Multi-page layout, responsive compositions, page/menu transitions                                         |
| `src/styles/fonts.css`                        | Self-hosted font declarations; OFL licenses in `public/fonts/`                                            |
| `src/components/Brand.astro`, `public/brand/` | Wordmark and mark variants; `brand.logo` supports a replacement logo                                      |

### Replace photography

1. Replace the corresponding original in `src/assets/photos/`, retaining its base name. PNG, JPEG and WebP are supported; only one file per base name.
2. Run `npm run images:build`. The script writes 480/800/1200/1600px variants where source resolution allows, and updates `src/data/image-manifest.json`.
3. Adjust alt text and `focus` in `src/data/assets.ts`. Check the intended crops on desktop and mobile.
4. To add a new image, add its source file, generate variants, add its metadata to `imageCopy`, then reference its key from gallery/editorial content. TypeScript checks missing metadata.

The six initial photographic studies were generated specifically for this project. They are provisional, anonymous visual studies, **not photographs of the actual DJs or confirmed events**. Source files are kept for replacement and derivative exports; only optimized WebP images ship to the site. Existing abstract cover artwork is generated from original SVGs. Pinterest references are not published as site assets.

### Reusable components

`Photo`, `ArtistCard`, `SessionCard`, `EventFeature`, `GalleryItem`, `Lightbox`, `PageHeading`, `NextPage`, `Header`, `Footer`, `SoundLab`. Each content type has central data. Set null URLs only when real destinations are available; missing links render honest status text. Supply real operator details in the legal pages before treating those placeholders as final legal notices.

## Motion and accessibility

Controlled text/image reveals, scroll progress, desktop photo parallax, sticky editorial content, pointer-reactive vinyl, staggered fullscreen menu, hover crops and press states. Artist photographs have shared view-transition names. Unsupported browsers receive a short navigation curtain; reduced motion bypasses animation. A footer control pauses motion for the current page.

Native dialogs trap focus, support Escape, restore focus and release scroll locks. Gallery navigation supports arrow keys and horizontal touch swipes. `::selection` and `::-moz-selection` use carbon text on signal red throughout light and dark sections. Sound is synthesized locally only after a click and stops on page hide. The booking brief only writes a template to the clipboard on explicit click; it never submits information.

## Cloudflare deployment

Existing native GitHub integration: repository `TheSocialNetwork35/four-after`, production branch `main`, build `npm run build`, output `dist`, repository root. Automatic production builds and PR previews remain enabled. No deployment secrets are committed. A push to main builds and deploys through Cloudflare Pages. Static route directories and the top-level 404 preserve direct URL and not-found behavior.

The TypeScript compiler stays pinned to 6.0.3 for compatibility with Astro's checker. Update the canonical site in `astro.config.mjs`, robots and sitemap configuration together if changing domains.

### Homepage speaker

`SpeakerHero.astro`, `styles/speaker.css`, `scripts/speaker.ts` and `scripts/speaker-model.ts` implement the homepage-only object. The dynamically loaded Three.js model uses beveled cabinet geometry, lathed cones, torus surrounds, mounting hardware, feet, handles, rear connectors and soft geometry shadows. It renders only on changes; a CSS fallback remains available without WebGL. Drag horizontally and vertically through 360° or use the two accessible angle sliders. Reset restores the initial view. Audio is generated locally after explicit activation; rotation changes stereo pan, low-pass filtering and the dry/reverb balance. The sound fades out when stopped or when the object leaves the viewport. The Music page and its vinyl are unchanged.
