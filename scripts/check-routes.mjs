import fs from "node:fs";
import path from "node:path";
const root = path.resolve("dist");
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
const pages = walk(root).filter((f) => f.endsWith(".html"));
const failures = [];
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    const [pathname] = url.split(/[?#]/);
    const target = path.join(root, decodeURIComponent(pathname));
    if (
      !fs.existsSync(target) &&
      !fs.existsSync(path.join(target, "index.html"))
    )
      failures.push(`${path.relative(root, file)} -> ${url}`);
  }
  if (!html.includes('id="main"'))
    failures.push(`${file}: missing main skip-link target`);
}
if (!fs.existsSync(path.join(root, "404.html")))
  failures.push("Missing root 404.html");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified local link and asset targets in ${pages.length} generated HTML pages.`,
  );
