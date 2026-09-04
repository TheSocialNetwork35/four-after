export function initGallery() {
  const dialog = document.querySelector<HTMLDialogElement>("#lightbox");
  const image = document.querySelector<HTMLImageElement>("#lightbox-image");
  if (!dialog || !image) return;
  const items = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-gallery-src]"),
  ];
  let active = items,
    index = 0,
    opener: HTMLElement | null = null;
  const show = (next: number) => {
    index = (next + active.length) % active.length;
    const item = active[index];
    image.src = item.dataset.gallerySrc!;
    image.alt = item.querySelector("img")?.alt || item.dataset.galleryTitle!;
    document.querySelector("#lightbox-title")!.textContent =
      item.dataset.galleryTitle!;
    document.querySelector("#lightbox-count")!.textContent =
      `${String(index + 1).padStart(2, "0")} / ${String(active.length).padStart(2, "0")}`;
  };
  items.forEach((item) =>
    item.addEventListener("click", () => {
      opener = item;
      show(active.indexOf(item));
      dialog.showModal();
      document.body.classList.add("locked");
    }),
  );
  const close = () => {
    dialog.close();
    document.body.classList.remove("locked");
  };
  dialog.querySelector(".dialog-close")?.addEventListener("click", close);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("locked");
    opener?.focus({ preventScroll: true });
  });
  dialog
    .querySelector("[data-gallery-prev]")
    ?.addEventListener("click", () => show(index - 1));
  dialog
    .querySelector("[data-gallery-next]")
    ?.addEventListener("click", () => show(index + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      show(index + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  let startX = 0,
    startY = 0;
  dialog.addEventListener(
    "touchstart",
    (e) => {
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
    },
    { passive: true },
  );
  dialog.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX,
        dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4)
        show(index + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
  document
    .querySelectorAll<HTMLButtonElement>("[data-gallery-filter]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        const filter = button.dataset.galleryFilter;
        document
          .querySelectorAll("[data-gallery-filter]")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        items.forEach((item) => {
          item.hidden = filter !== "Alle" && item.dataset.category !== filter;
          item.classList.add("is-visible");
        });
        active = items.filter((item) => !item.hidden);
        document
          .querySelector(".lookbook-grid")
          ?.classList.toggle("is-filtered", filter !== "Alle");
        document.querySelector("#gallery-result")!.textContent =
          `${String(active.length).padStart(2, "0")} images`;
      }),
    );
}
