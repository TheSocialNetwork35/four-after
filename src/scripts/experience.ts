import { initNavigation } from "./navigation";
import { initMotion } from "./motion";
initNavigation();
initMotion();
if (document.querySelector("#lightbox"))
  void import("./gallery").then((m) => m.initGallery());
if (document.querySelector("#sound-toggle")) void import("./audio");
if (document.querySelector("#copy-brief"))
  void import("./booking").then((m) => m.initBooking());
