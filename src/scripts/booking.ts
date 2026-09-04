export function initBooking() {
  const button = document.querySelector<HTMLButtonElement>("#copy-brief");
  const status = document.querySelector<HTMLElement>("#copy-status");
  button?.addEventListener("click", async () => {
    const brief =
      "Booking / FOUR AFTER\n\nName & Kontakt:\nDatum:\nVenue / Stadt:\nEvent / Konzept:\nArtist(s):\nSet-Länge / Zeiten:\nBudget:\nTechnik & weitere Informationen:\n";
    try {
      await navigator.clipboard.writeText(brief);
      if (status)
        status.textContent =
          "Brief kopiert. Ergänze deine Details und sende ihn später an unseren Booking-Kontakt.";
    } catch {
      if (status) {
        status.textContent = "Bitte kopiere den Brief hier manuell:";
        const field = document.createElement("textarea");
        field.value = brief;
        field.readOnly = true;
        field.rows = 11;
        field.setAttribute("aria-label", "Booking-Brief zum Kopieren");
        status.append(field);
        field.focus();
        field.select();
      }
    }
  });
}
