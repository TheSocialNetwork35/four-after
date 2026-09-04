# FOUR / AFTER

Independent DJ collective — Yannis, Cian, Maxim, Thierry.

**Live:** https://four-after.pages.dev  
**Repository:** https://github.com/TheSocialNetwork35/four-after

## Development

Node 22.12+ (Node 22 LTS recommended).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Astro static output, strict TypeScript, custom CSS motion and a small vanilla TypeScript interaction layer. No React runtime, WebGL dependency, tracking, remote fonts or third-party embeds. Web Audio runs only after explicit activation, and stops when the page is hidden.

## Editing

- `src/data/collective.ts`: brand, booking email, introductory copy, artist descriptions/styles/links/images, mixes, event data and gallery. Set `brand.email` to the real shared booking address to activate a mail link. Do not use a private address without the owner's consent.
- `public/art/`: self-created artwork placeholders, optimized WebP and editable SVG sources. Replace images and update their paths in the data file. Portrait images use a 4:5 ratio; provide 800×1000 or higher. Keep exports compressed and self-hosted.
- `src/components/Brand.astro`: temporary wordmark; `brand.logo` accepts a local image path.
- `src/components/EventRow.astro`: reusable event row. Add confirmed date/venue/city/ticket URL in the data; set `example: false` and update the section's preview note when publishing real dates.
- `src/pages/index.astro`: section headings, layout, status notes and contact dialog.
- `src/pages/artists/[slug].astro`: all four individual profiles generated from data.
- `src/styles/global.css`: palette, type, grid, mobile layouts, motion tokens and transitions.
- `src/scripts/experience.ts`: menu focus management, scroll reveals, vinyl pointer interaction, dialogs, gallery keyboard controls, motion preference and opt-in sound.
- `src/pages/impressum.astro` and `datenschutz.astro`: clearly identified legal placeholders. Supply the real operator information and check applicable requirements.
- `public/og.png`, `og-source.svg`, `favicon.svg`: social preview and icon.
- `astro.config.mjs`, `src/pages/sitemap.xml.ts`, `public/robots.txt`: update the canonical domain together if adding a custom domain.

## Deployment

Native Cloudflare Pages GitHub integration is configured for `TheSocialNetwork35/four-after`:

- Production branch: `main`
- Build: `npm run build`
- Output: `dist`
- Root: repository root
- Automatic production deployments: enabled
- Pull request preview deployments: enabled

Pushes to main build and deploy through Cloudflare. No GitHub Actions token or deployment credential is stored in the repository. Review deployment status in Cloudflare Pages. The TypeScript compiler is pinned to 6.0.3 because Astro's checker requires the programmatic API unavailable in TypeScript 7.

## Content status

Branding, artist bios/genres, mix titles, and event concepts are editable proposals. No real booking address, portraits, artist social URLs, mixes, confirmed dates or operator details were provided. The website explicitly labels pending content and never fabricates live tickets, playable sets or contact details.

## Artwork and fonts

Artworks are generated specifically for this project using `scripts/generate-art.mjs`; SVGs are the editable masters. WebP delivery versions are generated with Sharp. Font files are self-hosted Space Grotesk and Manrope, distributed under the SIL Open Font License; licenses are in `public/fonts/`.

## Motion and accessibility

`--ease`, `--fast`, `--reveal` define the shared motion language. Native cross-document view transitions enhance profile navigation in supporting browsers. Other browsers use normal navigation. Reduced-motion disables all animation and smooth scrolling. A footer control pauses motion for the current page. Native dialogs trap focus, support Escape and restore focus. The gallery supports arrow keys. Mobile navigation includes a focus loop and Escape support. No autoplay audio.
