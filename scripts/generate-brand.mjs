import fs from "node:fs";
import * as fontkit from "fontkit";
import sharp from "sharp";
const tokens = fs.readFileSync("src/styles/tokens.css", "utf8");
const color = (name) => {
  const value = tokens.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]+)`));
  if (!value) throw new Error(`Missing token ${name}`);
  return value[1];
};
const font = fontkit.openSync(
  "public/fonts/inter-tight-latin-wght-normal.woff2",
);
function outline(text, size, x, y, fill) {
  let cursor = x;
  const scale = size / font.unitsPerEm;
  const run = font.layout(text);
  let paths = "";
  for (let i = 0; i < run.glyphs.length; i++) {
    paths += `<path transform="translate(${cursor + run.positions[i].xOffset * scale} ${y - run.positions[i].yOffset * scale}) scale(${scale} ${-scale})" d="${run.glyphs[i].path.toSVG()}"/>`;
    cursor += run.positions[i].xAdvance * scale - size * 0.035;
  }
  return { markup: `<g fill="${fill}">${paths}</g>`, width: cursor - x };
}
const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
for (const [variant, ink] of [
  ["light", color("paper")],
  ["dark", color("carbon")],
]) {
  let x = 2,
    body = "";
  for (const [text, fill] of [
    ["FOUR", ink],
    ["/", color("signal")],
    ["AFTER", ink],
  ]) {
    let o = outline(text, 60, x, 48, fill);
    body += o.markup;
    x += o.width + 3;
  }
  fs.writeFileSync(
    `public/brand/wordmark-${variant}.svg`,
    svg(Math.ceil(x + 3), 54, body),
  );
  const a = outline("FOUR", 60, 0, 49, ink),
    slash = outline("/", 60, a.width + 4, 49, color("signal")),
    b = outline("AFTER", 60, 0, 100, ink);
  fs.writeFileSync(
    `public/brand/wordmark-stacked-${variant}.svg`,
    svg(
      Math.ceil(Math.max(a.width + slash.width + 4, b.width) + 4),
      106,
      a.markup + slash.markup + b.markup,
    ),
  );
}
const mark =
  '<path d="M18 0h9L9 56H0zM33 0h9L24 56h-9zM48 0h9L39 56h-9zM63 0h9L54 56h-9z"/>';
fs.writeFileSync(
  "public/brand/brandmark.svg",
  svg(72, 56, `<g fill="${color("signal")}">${mark}</g>`),
);
fs.writeFileSync(
  "public/favicon.svg",
  svg(
    80,
    80,
    `<rect width="80" height="80" rx="2" fill="${color("carbon")}"/><g transform="translate(11 17) scale(.8)" fill="${color("paper")}">${mark}</g><rect x="61" y="64" width="7" height="4" fill="${color("signal")}"/>`,
  ),
);
let body = `<rect width="1200" height="630" fill="${color("paper")}"/><rect width="1200" height="9" fill="${color("signal")}"/><circle cx="1050" cy="350" r="340" fill="${color("carbon")}"/>`;
for (let r = 140; r < 338; r += 5)
  body += `<circle cx="1050" cy="350" r="${r}" fill="none" stroke="${color("silver")}" stroke-opacity=".16"/>`;
body += `<circle cx="1050" cy="350" r="102" fill="${color("signal")}"/><g transform="translate(1014 322)" fill="${color("carbon")}">${mark}</g>`;
body +=
  outline("FOUR/", 178, 53, 259, color("carbon")).markup +
  outline("AFTER", 178, 53, 414, color("carbon")).markup;
body +=
  outline("FOUR MINDS. ONE FREQUENCY.", 24, 61, 552, color("carbon")).markup +
  outline("YANNIS / CIAN / MAXIM / THIERRY", 16, 61, 63, color("graphite"))
    .markup;
fs.writeFileSync("public/og-source.svg", svg(1200, 630, body));
await sharp(Buffer.from(svg(1200, 630, body)))
  .png()
  .toFile("public/og.png");
console.log(
  "Generated outlined wordmarks, four-stroke brandmark, favicon and social preview.",
);
