import fs from "node:fs";
const palettes = [
  ["#aaa9a2", "#5c6660"],
  ["#c0c6a0", "#334536"],
  ["#9d9b9a", "#4f4150"],
  ["#b7b3a2", "#454d5a"],
  ["#d3d1b8", "#5f6253"],
  ["#a8b19f", "#4b544a"],
];
for (let i = 1; i <= 6; i++) {
  const [a, b] = palettes[i - 1];
  let shapes = "";
  if (i % 3 === 1) {
    for (let k = 0; k < 35; k++)
      shapes += `<ellipse cx="400" cy="490" rx="${70 + k * 7}" ry="${120 + k * 8}" fill="none" stroke="url(#metal)" stroke-width="${1 + k * 0.08}" transform="rotate(${k * 2.4 - 40} 400 490)"/>`;
  } else if (i % 3 === 2) {
    for (let k = 0; k < 17; k++)
      shapes += `<rect x="${110 + k * 20}" y="${110 + k * 15}" width="${550 - k * 22}" height="${700 - k * 25}" rx="${150 - k * 7}" fill="none" stroke="url(#metal)" stroke-width="9" transform="rotate(-28 400 500)"/>`;
  } else {
    for (let k = 0; k < 48; k++)
      shapes += `<path d="M -100 ${150 + k * 16} Q 280 ${850 - k * 13} 410 ${440 + k * 4} T 950 ${300 + k * 12}" fill="none" stroke="url(#metal)" stroke-width="${2 + k * 0.08}"/>`;
  }
  fs.writeFileSync(
    `public/art/0${i}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><defs><radialGradient id="bg"><stop stop-color="${b}"/><stop offset="1" stop-color="#111411"/></radialGradient><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${b}"/><stop offset=".4" stop-color="${a}"/><stop offset=".5" stop-color="#eee9d9"/><stop offset=".7" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient><filter id="grain"><feTurbulence baseFrequency=".62" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs><path fill="url(#bg)" d="M0 0h800v1000H0z"/>${shapes}<path fill="#aaa" opacity=".065" filter="url(#grain)" d="M0 0h800v1000H0z"/></svg>`,
  );
}
