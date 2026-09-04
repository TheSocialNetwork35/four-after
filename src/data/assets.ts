/** All image choices, alternative text and focal points live here.
 * Replace source files in src/assets/photos, then run npm run images:build.
 * Dimensions and available responsive sizes are generated, not guessed. */
import manifest from "./image-manifest.json";
export type AssetKey = keyof typeof manifest;
export const imageCopy: Record<
  AssetKey,
  { alt: string; caption: string; focus: string }
> = {
  night: {
    alt: "Silhouetten in einem dunklen Club unter rotem Licht",
    caption: "After dark / Atmosphärenstudie",
    focus: "50% 60%",
  },
  space: {
    alt: "Leerer Betonraum mit Lautsprechern und einem Streifen Tageslicht",
    caption: "Before the first track / Raumstudie",
    focus: "50% 50%",
  },
  yannis: {
    alt: "Anonyme Portraitstudie in schwarzem Hemd und silbernem Seitenlicht",
    caption: "Portraitstudie / 01",
    focus: "50% 40%",
  },
  cian: {
    alt: "Anonyme Portraitstudie vor einer hellen Wand mit diagonalen Schatten",
    caption: "Portraitstudie / 02",
    focus: "60% 40%",
  },
  maxim: {
    alt: "Anonyme bewegungsunscharfe Portraitstudie in einem dunklen Durchgang",
    caption: "Portraitstudie / 03",
    focus: "50% 45%",
  },
  thierry: {
    alt: "Anonyme sitzende Silhouette neben einem schmalen Lichtfenster",
    caption: "Portraitstudie / 04",
    focus: "40% 50%",
  },
};
export const assets = Object.fromEntries(
  Object.entries(manifest).map(([key, value]) => [
    key,
    { ...value, ...imageCopy[key as AssetKey] },
  ]),
) as { [K in AssetKey]: (typeof manifest)[K] & (typeof imageCopy)[K] };
export const galleryItems: {
  id: string;
  asset: AssetKey;
  title: string;
  category: "Räume" | "Menschen";
  format: "wide" | "portrait" | "square";
  note: string;
}[] = [
  {
    id: "01",
    asset: "night",
    title: "When the room becomes one.",
    category: "Räume",
    format: "wide",
    note: "01 / AFTER DARK",
  },
  {
    id: "02",
    asset: "yannis",
    title: "A quiet kind of energy.",
    category: "Menschen",
    format: "portrait",
    note: "02 / HUMAN FREQUENCY",
  },
  {
    id: "03",
    asset: "space",
    title: "Before anything begins.",
    category: "Räume",
    format: "square",
    note: "03 / EMPTY SPACES",
  },
  {
    id: "04",
    asset: "cian",
    title: "A little light gets in.",
    category: "Menschen",
    format: "portrait",
    note: "04 / LIGHT STUDY",
  },
  {
    id: "05",
    asset: "maxim",
    title: "Always in motion.",
    category: "Menschen",
    format: "wide",
    note: "05 / IN BETWEEN",
  },
  {
    id: "06",
    asset: "thierry",
    title: "The morning after.",
    category: "Menschen",
    format: "portrait",
    note: "06 / AFTER HOURS",
  },
];
