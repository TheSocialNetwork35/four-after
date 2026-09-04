/** Homepage-only CSS object and local, orientation-dependent sound study. */
export function initSpeaker() {
  const root = document.querySelector<HTMLElement>("[data-speaker]");
  if (!root) return;
  const room = root.querySelector<HTMLElement>(".speaker-room")!;
  const slider = root.querySelector<HTMLInputElement>("input")!;
  const output = root.querySelector<HTMLOutputElement>("output")!;
  const button = root.querySelector<HTMLButtonElement>(".speaker-play")!;
  const label = root.querySelector<HTMLElement>("[data-sound-label]")!;
  const status = root.querySelector<HTMLElement>("#speaker-status")!;
  let angle = -25,
    audio: AudioContext | null = null,
    source: AudioBufferSourceNode | null = null;
  let dry: GainNode | null = null,
    wet: GainNode | null = null,
    filter: BiquadFilterNode | null = null,
    pan: StereoPannerNode | null = null;
  let outputGain: GainNode | null = null;
  let generation = 0;
  const apply = () => {
    angle = Number(slider.value);
    root.style.setProperty("--speaker-turn", `${angle}deg`);
    output.value = `${angle > 0 ? "+" : ""}${angle}°`;
    slider.setAttribute("aria-valuetext", `${angle} Grad`);
    if (audio && dry && wet && filter && pan) {
      const radians = (angle * Math.PI) / 180,
        front = (Math.cos(radians) + 1) / 2;
      dry.gain.setTargetAtTime(0.35 + 0.65 * front, audio.currentTime, 0.09);
      wet.gain.setTargetAtTime(
        0.12 + (1 - front) * 0.95,
        audio.currentTime,
        0.12,
      );
      filter.frequency.setTargetAtTime(
        1100 + front * 9500,
        audio.currentTime,
        0.09,
      );
      pan.pan.setTargetAtTime(Math.sin(radians) * 0.8, audio.currentTime, 0.09);
    }
  };
  slider.addEventListener("input", apply);
  let drag: { id: number; x: number; angle: number } | null = null;
  room.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    drag = { id: e.pointerId, x: e.clientX, angle };
    room.setPointerCapture(e.pointerId);
    room.classList.add("is-dragging");
  });
  room.addEventListener("pointermove", (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    slider.value = String(
      Math.max(
        -140,
        Math.min(140, Math.round(drag.angle + (e.clientX - drag.x) * 0.65)),
      ),
    );
    apply();
  });
  const end = () => {
    drag = null;
    room.classList.remove("is-dragging");
  };
  room.addEventListener("pointerup", end);
  room.addEventListener("pointercancel", end);
  room.addEventListener("lostpointercapture", end);
  const stop = () => {
    generation++;
    const old = audio;
    audio = null;
    if (old && outputGain)
      outputGain.gain.setTargetAtTime(0, old.currentTime, 0.015);
    source?.stop(old ? old.currentTime + 0.07 : 0);
    source = null;
    dry = null;
    wet = null;
    filter = null;
    pan = null;
    outputGain = null;
    if (old) setTimeout(() => void old.close().catch(() => {}), 100);
    root.classList.remove("speaker-is-playing");
    button.setAttribute("aria-pressed", "false");
    button.disabled = false;
    label.textContent = "Sound einschalten";
    status.textContent =
      "Dreh die Box. Mit Sound verändert sich auch der Raum.";
  };
  button.addEventListener("click", async () => {
    if (audio) {
      stop();
      return;
    }
    const current = ++generation;
    button.disabled = true;
    try {
      const context = new AudioContext();
      audio = context;
      await context.resume();
      if (current !== generation || document.hidden) {
        if (audio === context) stop();
        return;
      }
      // Original eight-beat loop: softly voiced chords, a pulse and restrained percussion.
      const rate = context.sampleRate,
        seconds = 5,
        buffer = context.createBuffer(1, rate * seconds, rate),
        data = buffer.getChannelData(0);
      let seed = 19;
      for (let i = 0; i < data.length; i++) {
        const t = i / rate,
          beat = t % 0.625,
          bar = Math.floor(t / 2.5),
          freq = bar % 2 ? 73.416 : 65.406;
        seed = (seed * 16807) % 2147483647;
        const chord =
          (Math.sin(2 * Math.PI * freq * t) +
            0.35 * Math.sin(2 * Math.PI * freq * 1.5 * t) +
            0.2 * Math.sin(2 * Math.PI * freq * 2.5 * t)) *
          0.075 *
          Math.sin((Math.PI * t) / seconds) ** 2;
        const kick =
          Math.sin(2 * Math.PI * (48 * beat + 6 * (1 - Math.exp(-beat * 35)))) *
          Math.exp(-beat * 22) *
          0.22;
        const hat =
          (seed / 2147483647 - 0.5) * Math.exp(-(t % 0.3125) * 160) * 0.025;
        data[i] = chord + kick + hat;
      }
      const impulse = context.createBuffer(2, rate * 2.6, rate);
      for (let ch = 0; ch < 2; ch++) {
        const d = impulse.getChannelData(ch);
        for (let i = 0; i < d.length; i++) {
          seed = (seed * 16807) % 2147483647;
          d[i] =
            ((seed / 2147483647) * 2 - 1) * Math.pow(1 - i / d.length, 2.5);
        }
      }
      source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = 0.5;
      dry = context.createGain();
      wet = context.createGain();
      pan = context.createStereoPanner();
      const reverb = context.createConvolver();
      reverb.buffer = impulse;
      const master = context.createGain();
      outputGain = master;
      master.gain.setValueAtTime(0, context.currentTime);
      master.gain.linearRampToValueAtTime(0.55, context.currentTime + 0.3);
      source.connect(filter);
      filter.connect(dry);
      dry.connect(pan);
      filter.connect(reverb);
      reverb.connect(wet);
      wet.connect(pan);
      pan.connect(master);
      master.connect(context.destination);
      apply();
      source.start();
      root.classList.add("speaker-is-playing");
      button.setAttribute("aria-pressed", "true");
      label.textContent = "Sound ausschalten";
      status.textContent =
        "Sound ist an. Drehen verändert Stereo, Klarheit und Hall.";
    } catch {
      stop();
      status.textContent =
        "Audio ist gerade nicht verfügbar. Die Box lässt sich trotzdem drehen.";
    } finally {
      button.disabled = false;
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });
  addEventListener("pagehide", stop);
  new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting && audio) stop();
    },
    { threshold: 0.05 },
  ).observe(root);
  apply();
}
