// Brand and artist basics. Extended content: editorial.ts. Photography: assets.ts.
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
    bio: "Tiefe Frequenzen. Lange Spannungsbögen. Ein Sound, der Raum lässt und dich trotzdem nicht loslässt.",
    links: [] as { label: string; url: string }[],
  },
  {
    slug: "cian",
    name: "Cian",
    number: "02",
    style: "Groove / House",
    bio: "Rhythmus als gemeinsame Sprache. Warme Texturen und ein Groove, der vom ersten Moment an verbindet.",
    links: [] as { label: string; url: string }[],
  },
  {
    slug: "maxim",
    name: "Maxim",
    number: "03",
    style: "Driving / Electronic",
    bio: "Nach vorne, mit Gefühl. Druckvolle Selektionen zwischen kontrollierter Energie und dem nächsten unerwarteten Moment.",
    links: [] as { label: string; url: string }[],
  },
  {
    slug: "thierry",
    name: "Thierry",
    number: "04",
    style: "Melodic / Progressive",
    bio: "Melodien, die bleiben. Atmosphärische Übergänge zwischen dem Hier und Jetzt und irgendwo dahinter.",
    links: [] as { label: string; url: string }[],
  },
];
export const copy = {
  intro:
    "Nicht einfach vier DJs. Vier Perspektiven, die auf dem Dancefloor zusammenfinden.",
  body: "Wir teilen die Suche nach dem nächsten Track. Nach diesem einen Übergang. Nach Nächten, die kein Ende brauchen. FOUR / AFTER ist unser gemeinsamer Raum für elektronische Musik — offen, intuitiv und immer in Bewegung.",
};
