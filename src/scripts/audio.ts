export {};
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
  if (soundButton.disabled) return;
  if (playing) {
    await stopSound();
    return;
  }
  soundButton.disabled = true;
  try {
    audio = new AudioContext();
    const startingAudio = audio;
    await startingAudio.resume();
    if (audio !== startingAudio || document.hidden) {
      await stopSound();
      return;
    }
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
  } finally {
    soundButton.disabled = false;
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && audio) void stopSound();
});
window.addEventListener("pagehide", () => {
  if (audio) void stopSound();
});
