export function initNavigation() {
  const menu = document.querySelector<HTMLDialogElement>("#site-menu");
  const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const close = () => {
    menu?.close();
    document.body.classList.remove("locked");
  };
  menu?.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  toggle?.addEventListener("click", () => {
    menu?.showModal();
    document.body.classList.add("locked");
    toggle.setAttribute("aria-expanded", "true");
  });
  menu?.querySelector(".menu-close")?.addEventListener("click", close);
  menu?.addEventListener("close", () => {
    document.body.classList.remove("locked");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.focus({ preventScroll: true });
  });
  menu?.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", close);
    const preview = () => {
      const note = document.querySelector("#menu-note");
      if (note && link.dataset.menuNote)
        note.textContent = link.dataset.menuNote;
    };
    link.addEventListener("pointerenter", preview);
    link.addEventListener("focus", preview);
  });
  window.addEventListener("pageshow", () => {
    document
      .querySelectorAll<HTMLDialogElement>("dialog[open]")
      .forEach((d) => d.close());
    document.body.classList.remove("locked", "is-leaving");
  });
  const legacy: Record<string, string> = {
    "#collective": "/collective/",
    "#artists": "/artists/",
    "#sound": "/music/",
    "#events": "/events/",
    "#gallery": "/gallery/",
    "#booking": "/booking/",
  };
  if (location.pathname === "/" && legacy[location.hash])
    location.replace(legacy[location.hash]);
  // Static routes retain native history, refresh and browser accessibility.
  if (!Reflect.has(window, "CSSViewTransitionRule")) {
    let leaving = false;
    document.addEventListener("click", (event) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target ||
        link.hasAttribute("download")
      )
        return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname === location.pathname ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      event.preventDefault();
      if (leaving) return;
      leaving = true;
      document.body.classList.add("is-leaving");
      setTimeout(() => location.assign(url.href), 180);
    });
    window.addEventListener("pageshow", () => {
      leaving = false;
    });
  }
}
