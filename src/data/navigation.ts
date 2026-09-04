export const navigation = [
  { href: "/", label: "Home", number: "00", note: "The entry point" },
  {
    href: "/artists/",
    label: "Artists",
    number: "01",
    note: "Four individual frequencies",
  },
  {
    href: "/music/",
    label: "Music",
    number: "02",
    note: "Selected for the after hours",
  },
  { href: "/events/", label: "Events", number: "03", note: "Where we meet" },
  {
    href: "/gallery/",
    label: "Gallery",
    number: "04",
    note: "An ongoing visual journal",
  },
  {
    href: "/collective/",
    label: "Collective",
    number: "05",
    note: "The space between us",
  },
  {
    href: "/booking/",
    label: "Booking",
    number: "06",
    note: "Start a conversation",
  },
];
export const isActive = (path: string, href: string) =>
  href === "/" ? path === "/" : path.startsWith(href);
