# Release verification — 4 September 2026

Verified the production URL `https://four-after.pages.dev` after native Cloudflare GitHub deployment.

## Build and deployment

- `npm run build`: Astro typecheck 0 errors / warnings; all eight HTML pages plus sitemap generated.
- Cloudflare trigger: `github:push`, production branch `main`, successful build and deploy.
- Git author and committer: Yannis Ress Lasser <yan.br@icloud.com>.
- Production home, four profiles, legal pages, sitemap, robots and OpenGraph PNG return HTTP 200. Unknown route returns HTTP 404.
- Internal section anchors resolve; no broken images or browser console errors observed.

## Browser and interaction checks

Chromium browser automation and visual screenshots at 1440×1000, 1024×768, 768×1024, 390×844, 375×812, 320×568, and 844×390. No horizontal document overflow at any tested size. Mobile viewport and touch emulation also checked with Chrome DevTools.

- Mobile menu opens/closes, Escape closes it, focus returns.
- Gallery opens, arrow keys advance images, Escape closes it, focus returns to the originating image button.
- Booking dialog opens/closes and explains the pending shared contact.
- Audio toggles on and off; no playback before activation.
- OS reduced-motion preference leaves zero running document animations.
- Desktop hover treatments and vinyl pointer rotation checked visually.

## Performance

Initial production mobile Lighthouse run (simulated mobile throttling):

| Metric | Result |
| --- | --- |
| Performance | 95 / 100 |
| Accessibility | 100 / 100 |
| Best Practices | 100 / 100 |
| SEO | 100 / 100 |
| First Contentful Paint | 1.5 s |
| Largest Contentful Paint | 2.7 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |

Separate Chrome DevTools production trace, unthrottled repeat navigation: LCP 117 ms, CLS 0. These are laboratory measurements, not field data or guarantees across devices. Fonts are preloaded in the final refinement. Extended label consistency findings were corrected after the initial run.

## Content dependencies

The shared booking email, operator/legal details, confirmed events, actual mixes/social links, final branding and portraits remain intentionally pending. No invented personal information or nonfunctional fake ticket links are published. The original vector artworks are explicitly presented as art studies.

Real hardware testing and a full manual accessibility audit are outside these automated checks. View transitions gracefully fall back in browsers that do not support them.
