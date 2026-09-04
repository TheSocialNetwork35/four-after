export {};
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let paused = reduced.matches;
const motionButton =
  document.querySelector<HTMLButtonElement>("#motion-toggle");
function updateMotion() {
  document.documentElement.classList.toggle("motion-paused", paused);
  motionButton?.setAttribute("aria-pressed", String(paused));
  if (motionButton)
    motionButton.textContent = paused
      ? "Bewegung aktivieren"
      : "Bewegung pausieren";
}
updateMotion();
motionButton?.addEventListener("click", () => {
  paused = !paused;
  updateMotion();
});
reduced.addEventListener("change", () => {
  paused = reduced.matches;
  updateMotion();
});
if (!reduced.matches) {
  document.documentElement.classList.add("js-motion");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
const menuButton = document.querySelector<HTMLButtonElement>(".menu-button");
const menu = document.querySelector<HTMLElement>("#mobile-menu");
function closeMenu() {
  if (!menu || !menuButton) return;
  menu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Menü öffnen");
  document.body.classList.remove("locked", "menu-open");
}
menuButton?.addEventListener("click", () => {
  if (!menu) return;
  const opening = menu.hidden;
  if (!opening) {
    closeMenu();
    return;
  }
  menu.hidden = false;
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Menü schließen");
  document.body.classList.add("locked", "menu-open");
  menu.querySelector("a")?.focus();
});
menu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (menu && !menu.hidden) {
    if (e.key === "Escape") {
      closeMenu();
      menuButton?.focus();
    }
    if (e.key === "Tab") {
      const links = [
        menuButton!,
        ...menu.querySelectorAll<HTMLAnchorElement>("a"),
      ];
      const first = links[0],
        last = links.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});
matchMedia("(min-width:651px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});
const stage = document.querySelector<HTMLElement>(".record-stage"),
  record = document.querySelector<HTMLElement>(".record");
if (stage && record && matchMedia("(pointer:fine)").matches) {
  stage.addEventListener("pointermove", (e) => {
    if (paused) return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    record.style.transform = `rotateX(${33 - y * 15}deg) rotateY(${-23 + x * 22}deg) rotateZ(${-24 + x * 8}deg)`;
  });
  stage.addEventListener("pointerleave", () => {
    record.style.transform = "";
  });
}
let opener: HTMLElement | null = null;
function openDialog(dialog: HTMLDialogElement, trigger: HTMLElement) {
  opener = trigger;
  dialog.showModal();
  document.body.classList.add("locked");
}
document.querySelectorAll<HTMLDialogElement>("dialog").forEach((dialog) => {
  dialog
    .querySelectorAll(".dialog-close,.dialog-dismiss")
    .forEach((b) => b.addEventListener("click", () => dialog.close()));
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("locked");
    opener?.focus();
  });
});
const booking = document.querySelector<HTMLDialogElement>("#booking-dialog");
document.querySelectorAll<HTMLElement>("[data-booking]").forEach((b) =>
  b.addEventListener("click", () => {
    if (booking) openDialog(booking, b);
  }),
);
const lightbox = document.querySelector<HTMLDialogElement>("#lightbox"),
  gallery = [...document.querySelectorAll<HTMLElement>("[data-gallery-src]")];
let galleryIndex = 0;
function showImage(index: number) {
  galleryIndex = (index + gallery.length) % gallery.length;
  const item = gallery[galleryIndex],
    img = document.querySelector<HTMLImageElement>("#lightbox-image"),
    title = document.querySelector("#lightbox-title");
  if (img) {
    img.src = item.dataset.gallerySrc!;
    img.alt = item.dataset.galleryTitle!;
  }
  if (title) title.textContent = item.dataset.galleryTitle!;
}
gallery.forEach((item, index) =>
  item.addEventListener("click", () => {
    showImage(index);
    if (lightbox) openDialog(lightbox, item);
  }),
);
document
  .querySelector("[data-gallery-prev]")
  ?.addEventListener("click", () => showImage(galleryIndex - 1));
document
  .querySelector("[data-gallery-next]")
  ?.addEventListener("click", () => showImage(galleryIndex + 1));
lightbox?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    showImage(galleryIndex + 1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    showImage(galleryIndex - 1);
  }
});
const soundButton = document.querySelector<HTMLButtonElement>("#sound-toggle");
let audio: AudioContext | null = null;
let master: GainNode | null = null;
let playing = false;
let sources: OscillatorNode[] = [];
async function stopSound() {
  playing = false;
  document.body.classList.remove("sound-playing");
  soundButton?.setAttribute("aria-pressed", "false");
  if (soundButton)
    soundButton.innerHTML =
      '<span aria-hidden="true">▥</span> Sound experiment starten';
  if (audio && master) {
    master.gain.setTargetAtTime(0, audio.currentTime, 0.06);
    const old = audio;
    sources.forEach((s) => s.stop(old.currentTime + 0.3));
    sources = [];
    audio = null;
    master = null;
    setTimeout(() => void old.close(), 400);
  }
}
soundButton?.addEventListener("click", async () => {
  if (playing) {
    await stopSound();
    return;
  }
  try {
    audio = new AudioContext();
    await audio.resume();
    master = audio.createGain();
    master.gain.value = 0;
    master.connect(audio.destination);
    [65.406, 98, 130.812, 164.814].forEach((frequency, i) => {
      const osc = audio!.createOscillator(),
        gain = audio!.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      osc.detune.value = i * 2;
      gain.gain.value = 0.15 / (i + 1);
      osc.connect(gain);
      gain.connect(master!);
      osc.start();
      sources.push(osc);
    });
    master.gain.setTargetAtTime(0.5, audio.currentTime, 0.6);
    playing = true;
    soundButton.setAttribute("aria-pressed", "true");
    soundButton.innerHTML =
      '<span aria-hidden="true">Ⅱ</span> Sound experiment stoppen';
    document.body.classList.add("sound-playing");
  } catch {
    await stopSound();
    soundButton.textContent = "Audio ist in diesem Browser nicht verfügbar";
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && playing) void stopSound();
});
window.addEventListener("pagehide", () => {
  if (playing) void stopSound();
});
