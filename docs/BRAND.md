# FOUR / AFTER — Signal / Sleeve

Brand direction, September 2026. The name, artists, architecture and core interactions remain unchanged.

## Reading the supplied moodboard

1. **Red vinyl / black turntable:** a single saturated color, deep black, tactile grooves and directional highlights. The color belongs to a physical material; it is not neon illumination.
2. **Typographic music interface:** warm off-white, close-set neutral sans serif, oversized type, thin rules, compact catalogue information and a cropped record. Hierarchy comes from scale and negative space.
3. **Black / warm beige interface:** intentional light/dark contrast, precise angular divisions, restrained red details and a central analogue object. Avoid reproducing its layout or third-party marks.

Common thread: analogue music objects presented with contemporary editorial discipline. Strong color is concentrated, surfaces are mostly flat, imagery has a clear focal point, and typography does the branding work.

Three directions were considered: an almost entirely black/red record label; a predominantly paper-white editorial archive; and the selected **Signal / Sleeve**, combining carbon-black music sections with warm paper panels. The selected direction preserves the existing dark identity while adding the contrast and warmth shared by references two and three.

## Palette

| Role | Token | Value |
| --- | --- | --- |
| Main background | `--color-carbon` | `#111112` |
| Secondary background | `--color-charcoal` | `#1B1B1D` |
| Elevated surface | `--color-surface` | `#252527` |
| Primary text / paper sections | `--color-paper` | `#EEE9DF` |
| Secondary paper surface | `--color-paper-deep` | `#E2DCD1` |
| Muted text on dark | `--color-silver` | `#AEAAA4` |
| Muted text on paper | `--color-graphite` | `#66615B` |
| Primary accent | `--color-signal` | `#F0322B` |
| Accent text on paper | `--color-signal-ink` | `#B8231E` |
| Hover | `--color-signal-hover` | `#FF5148` |
| Active | `--color-signal-active` | `#D32922` |
| Dark / light borders | `--color-border-dark/light` | white 16% / carbon 19% |

All source tokens are in `src/styles/tokens.css`. `.paper-section` changes semantic roles for light areas. Use `--accent-text` for colored text, `--accent` for graphic signals and `--on-accent` for text on red. Avoid introducing unrelated accent hues. The vinyl has additional tonal material tokens for specular highlights and deep grooves.

## Wordmark and brandmark

- Primary: a single-line, tightly set **FOUR/AFTER** with a red slash.
- Secondary: stacked **FOUR/** above **AFTER**, for square or narrow compositions.
- Brandmark: four parallel diagonal strokes, one for each member. The slash in the name connects the system; this is an original mark, not a copied reference logo.
- All wordmarks are outlined SVGs and require no font installation. Light/dark files are in `public/brand/`.
- Keep clear space at least equal to the height of the slash. Do not distort the proportions, enclose the wordmark in a circular badge, add glow or outline the lettering.
- Header width: about 164 px mobile / 165–230 px desktop. Use the compact mark for favicons rather than shrinking the full name.

`src/components/Brand.astro` selects the logo. `brand.logo` in the content data can replace it. `src/components/BrandMark.astro` is the currentColor inline variant used on the record and introduction. The exported mark and inline shape should be updated together when changing the geometry.

## Typography

- **Inter Tight Variable:** display and body text. Neutral, close-set, flexible weight; headline weight around 400–420. Avoid faux italic and overly heavy display lettering.
- **IBM Plex Mono Regular:** metadata, labels, navigation and catalogue details. Its fixed-width rhythm refers to track lists and record sleeves.
- Fonts are self-hosted, licensed under SIL OFL. Sources and license files are in `public/fonts/`; CSS registration is in `src/styles/fonts.css`; family/weight/tracking decisions are tokens.
- When changing font files, also update the preloads in `src/layouts/Layout.astro`. The outlined logo remains stable; to regenerate it with a new font, update `scripts/generate-brand.mjs`.

## Imagery and surfaces

The multi-page edition combines original photographic studies with procedural cover artwork, delivered as responsive WebP. Carbon and silver portraits, warm paper light, motion blur and red club atmosphere create a varied editorial rhythm. The photographs are generated placeholders, not real artist portraits. Preserve purposeful crops and restrained color; image treatment is not permanently imposed on replacement photos. The tactile red vinyl now anchors the listening room.

`src/data/assets.ts` controls photographic metadata and gallery entries; `src/data/editorial.ts` selects artist images, sessions and events. Originals live in `src/assets/photos/`; run `npm run images:build` after replacing or adding files. The generated manifest supplies dimensions and responsive variants. Abstract cover masters remain in `public/art/`.

## UI and motion

Thin rules, square controls with a 2 px radius, explicit focus outlines and restrained press feedback replace the previous soft circular badge vocabulary. Vinyl stays circular for a material reason. The gallery, menu, audio controls, profile navigation and reveal logic remain intact.

Motion tokens define hover, control, image, entrance and rotation durations. Text lifts, masked image entrances and pointer-responsive vinyl retain their established choreography. Image masks are placed on child artwork, never on the observed card bounds. Reduced motion disables transitions, animations, smooth scrolling and masks. The footer motion control remains available.

## Edit and regenerate

```sh
npm run brand:generate
npm run build
```

The generators read the primitive colors from `tokens.css` and regenerate logo variants, favicon, OpenGraph preview, artwork SVGs and WebPs. Inspect the outputs before committing; `src/styles/brand.css` contains identity-specific composition refinements, while the existing `global.css` retains the responsive layout.

Pinterest references are inspiration only and are not included as website assets or copied into the public repository.
