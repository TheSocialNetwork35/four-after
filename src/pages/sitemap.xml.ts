import { artists } from "../data/collective";
import { sessions, eventConcepts } from "../data/editorial";
import { navigation } from "../data/navigation";
export function GET() {
  const paths = [
    ...navigation.map((n) => n.href),
    ...artists.map((a) => `/artists/${a.slug}/`),
    ...sessions.map((s) => `/music/${s.slug}/`),
    ...eventConcepts.map((e) => `/events/${e.slug}/`),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>https://four-after.pages.dev${path}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
