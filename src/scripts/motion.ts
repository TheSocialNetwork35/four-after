export function initMotion() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduced.matches;
  const button = document.querySelector<HTMLButtonElement>("#motion-toggle");
  const update = () => {
    document.documentElement.classList.toggle("motion-paused", paused);
    button?.setAttribute("aria-pressed", String(paused));
    if (button)
      button.textContent = paused
        ? "Bewegung aktivieren"
        : "Bewegung pausieren";
  };
  update();
  button?.addEventListener("click", () => {
    paused = !paused;
    update();
  });
  reduced.addEventListener("change", () => {
    paused = reduced.matches;
    update();
  });
  if (!reduced.matches) {
    document.documentElement.classList.add("js-motion");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }
  const backdrop = document.querySelector<HTMLElement>(".home-backdrop");
  let queued = false;
  const scroll = () => {
    queued = false;
    const range = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty(
      "--read-progress",
      String(range > 0 ? scrollY / range : 0),
    );
    if (backdrop && !paused && innerWidth > 650 && scrollY < innerHeight * 1.5)
      backdrop.style.setProperty(
        "--parallax",
        `${Math.min(scrollY * 0.16, 140)}px`,
      );
  };
  addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(scroll);
      }
    },
    { passive: true },
  );
  addEventListener("resize", scroll);
  scroll();
  const stage = document.querySelector<HTMLElement>(".record-stage");
  const record = document.querySelector<HTMLElement>(".record");
  if (stage && record) {
    const observer = new IntersectionObserver((entries) => {
      record.classList.toggle("record-offscreen", !entries[0].isIntersecting);
    });
    observer.observe(stage);
    if (matchMedia("(pointer:fine)").matches) {
      stage.addEventListener("pointermove", (event) => {
        if (paused) return;
        const r = stage.getBoundingClientRect();
        record.style.transform = `rotateX(${33 - ((event.clientY - r.top - r.height / 2) / r.height) * 15}deg) rotateY(${-23 + ((event.clientX - r.left - r.width / 2) / r.width) * 22}deg) rotateZ(-24deg)`;
      });
      stage.addEventListener("pointerleave", () => {
        record.style.transform = "";
      });
    }
  }
}
