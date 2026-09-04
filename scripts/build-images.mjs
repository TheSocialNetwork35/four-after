import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
const source = "src/assets/photos";
fs.mkdirSync("public/photos", { recursive: true });
const manifest = {};
for (const file of fs
  .readdirSync(source)
  .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))) {
  const key = path.parse(file).name,
    input = path.join(source, file),
    meta = await sharp(input).metadata();
  const widths = [480, 800, 1200, 1600].filter((w) => w <= meta.width);
  if (!widths.includes(meta.width) && meta.width < 1600)
    widths.push(meta.width);
  widths.sort((a, b) => a - b);
  for (const width of widths)
    await sharp(input)
      .resize({ width })
      .webp({ quality: 82, effort: 5 })
      .toFile(`public/photos/${key}-${width}.webp`);
  manifest[key] = {
    src: `/photos/${key}-${widths.at(-1)}.webp`,
    width: meta.width,
    height: meta.height,
    srcset: widths.map((w) => `/photos/${key}-${w}.webp ${w}w`).join(", "),
  };
}
fs.writeFileSync(
  "src/data/image-manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Built responsive variants for ${Object.keys(manifest).length} photographs.`,
);
