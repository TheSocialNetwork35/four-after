// All public content lives here. null URLs deliberately render as unavailable, never fake links.
export const brand = {
  name: "FOUR / AFTER",
  short: "F/A",
  tagline: "Four minds. One frequency.",
  email: null as string | null,
  logo: null as string | null,
  description:
    "Yannis, Cian, Maxim und Thierry. Vier Perspektiven auf elektronische Musik. Ein gemeinsames Gefühl für die Nacht.",
};
export const artists = [
  {
    slug: "yannis",
    name: "Yannis",
    number: "01",
    style: "Deep / Hypnotic",
    image: "/art/01.webp",
    bio: "Tiefe Frequenzen. Lange Spannungsbögen. Ein Sound, der Raum lässt und dich trotzdem nicht loslässt.",
    links: [] as { label: string; url: string }[],
  },
  {
    slug: "cian",
    name: "Cian",
    number: "02",
    style: "Groove / House",
    image: "/art/02.webp",
    bio: "Rhythmus als gemeinsame Sprache. Warme Texturen und ein Groove, der vom ersten Moment an verbindet.",
    links: [] as { label: string; url: string }[],
  },
  {
    slug: "maxim",
    name: "Maxim",
    number: "03",
    style: "Driving / Electronic",
    image: "/art/03.webp",
    bio: "Nach vorne, mit Gefühl. Druckvolle Selektionen zwischen kontrollierter Energie und dem nächsten unerwarteten Moment.",
    links: [] as { label: string; url: string }[],
  },
  {
    slug: "thierry",
    name: "Thierry",
    number: "04",
    style: "Melodic / Progressive",
    image: "/art/04.webp",
    bio: "Melodien, die bleiben. Atmosphärische Übergänge zwischen dem Hier und Jetzt und irgendwo dahinter.",
    links: [] as { label: string; url: string }[],
  },
];
export const copy = {
  intro:
    "Nicht einfach vier DJs. Vier Perspektiven, die auf dem Dancefloor zusammenfinden.",
  body: "Wir teilen die Suche nach dem nächsten Track. Nach diesem einen Übergang. Nach Nächten, die kein Ende brauchen. FOUR / AFTER ist unser gemeinsamer Raum für elektronische Musik — offen, intuitiv und immer in Bewegung.",
};
export const mixes = [
  {
    number: "001",
    title: "After hours",
    artist: "Yannis × Cian",
    mood: "Deep / Rolling",
    image: "/art/02.webp",
    url: null as string | null,
  },
  {
    number: "002",
    title: "Between worlds",
    artist: "Maxim × Thierry",
    mood: "Melodic / Driving",
    image: "/art/04.webp",
    url: null as string | null,
  },
];
export type CollectiveEvent = {
  day: string;
  month: string;
  title: string;
  venue: string;
  city: string;
  label: string;
  ticketUrl: string | null;
  example: boolean;
};
export const events: CollectiveEvent[] = [
  {
    day: "—",
    month: "TBA",
    title: "The first chapter",
    venue: "Venue wird angekündigt",
    city: "Ort folgt",
    label: "Collective night",
    ticketUrl: null,
    example: true,
  },
  {
    day: "—",
    month: "TBA",
    title: "Somewhere after dark",
    venue: "Venue wird angekündigt",
    city: "Ort folgt",
    label: "Extended session",
    ticketUrl: null,
    example: true,
  },
];
export const gallery = [
  {
    image: "/art/05.webp",
    title: "A room without time",
    note: "Light study / 01",
  },
  {
    image: "/art/06.webp",
    title: "Feel the space between",
    note: "Motion study / 02",
  },
  {
    image: "/art/03.webp",
    title: "Lost in the frequency",
    note: "Frequency study / 03",
  },
];
