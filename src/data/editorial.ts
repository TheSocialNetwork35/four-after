import type { AssetKey } from "./assets";
export const artistEditorial: Record<
  string,
  {
    photo: AssetKey;
    layout: string;
    headline: string;
    quote: string;
    detail: string;
    theme: string;
    mixes: string[];
    gallery: AssetKey[];
  }
> = {
  yannis: {
    photo: "yannis",
    layout: "monolith",
    headline: "Depth over noise.",
    quote: "Für die Momente, in denen ein Raum ganz bei sich ist.",
    detail:
      "Langsam aufgebaute Spannung, tiefe Texturen und Raum für das Unerwartete. Ein vorläufiges Sound-Portrait zwischen Zurückhaltung und Intensität.",
    theme: "carbon",
    mixes: ["after-hours"],
    gallery: ["space", "night"],
  },
  cian: {
    photo: "cian",
    layout: "split",
    headline: "Follow the feeling.",
    quote: "Ein guter Groove braucht keine Erklärung.",
    detail:
      "Warme Farben im Sound, ein offener Blick auf House und ein Gespür für Bewegung. Ein vorläufiges Sound-Portrait, das Verbindung in den Mittelpunkt stellt.",
    theme: "paper",
    mixes: ["after-hours"],
    gallery: ["night", "space"],
  },
  maxim: {
    photo: "maxim",
    layout: "panorama",
    headline: "Never standing still.",
    quote: "Der nächste Übergang ist immer eine neue Möglichkeit.",
    detail:
      "Druck, Reibung und Energie. Ein vorläufiges Sound-Portrait für die Stunden, in denen der Dancefloor seine eigene Richtung findet.",
    theme: "signal",
    mixes: ["between-worlds"],
    gallery: ["night", "space"],
  },
  thierry: {
    photo: "thierry",
    layout: "offset",
    headline: "Somewhere beyond.",
    quote: "Manche Melodien bleiben, wenn die Nacht längst vorbei ist.",
    detail:
      "Atmosphäre als Ausgangspunkt. Ein vorläufiges Sound-Portrait mit langen Bögen, melodischen Details und einem Gefühl für das Dazwischen.",
    theme: "silver",
    mixes: ["between-worlds"],
    gallery: ["space", "night"],
  },
};
export const sessions = [
  {
    slug: "after-hours",
    number: "001",
    title: "After hours",
    artists: ["yannis", "cian"],
    credit: "Yannis × Cian",
    mood: "Deep / Rolling",
    art: "/art/02.webp",
    photo: "night" as AssetKey,
    description:
      "Eine gemeinsame Selektion für die Stunden ohne Zeitgefühl. Der erste Mix ist in Vorbereitung.",
    chapter: "Slow burn. Long shadows.",
    url: null as string | null,
    releaseDate: null as string | null,
  },
  {
    slug: "between-worlds",
    number: "002",
    title: "Between worlds",
    artists: ["maxim", "thierry"],
    credit: "Maxim × Thierry",
    mood: "Melodic / Driving",
    art: "/art/04.webp",
    photo: "space" as AssetKey,
    description:
      "Zwischen treibenden Rhythmen und weiten Melodien. Eine gemeinsame Session, die gerade entsteht.",
    chapter: "A little further out.",
    url: null as string | null,
    releaseDate: null as string | null,
  },
];
export const eventConcepts = [
  {
    slug: "the-first-chapter",
    title: "The first chapter",
    type: "Collective night",
    photo: "night" as AssetKey,
    description:
      "Eine Nacht als gemeinsamer Anfang. Vier Perspektiven, ein Raum und genug Zeit, den Sound entstehen zu lassen.",
    format: "Alle vier / gemeinsame Session",
    status: "In Planung",
    date: null as string | null,
    venue: null as string | null,
    city: null as string | null,
    ticketUrl: null as string | null,
  },
  {
    slug: "somewhere-after-dark",
    title: "Somewhere after dark",
    type: "Extended session",
    photo: "space" as AssetKey,
    description:
      "Mehr Raum für lange Übergänge. Ein Format für musikalische Umwege, offene Enden und alles zwischen dem ersten und letzten Track.",
    format: "Extended sets / offenes Format",
    status: "In Planung",
    date: null as string | null,
    venue: null as string | null,
    city: null as string | null,
    ticketUrl: null as string | null,
  },
];
