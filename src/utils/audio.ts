// Web Audio API lightweight high-fidelity motorsport sound synthesizer
class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private listeners: Set<(enabled: boolean) => void> = new Set();
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Check stored preference, default to enabled for interactive exploration
      const stored = localStorage.getItem('ay_audio_enabled');
      if (stored !== null) {
        this.enabled = stored === 'true';
      }

      // Auto-unlock AudioContext on first user interaction (standard web audio policy)
      const unlockAudio = () => {
        if (!this.initialized) {
          this.initContext();
        }
      };

      window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
    }
  }

  public subscribe(fn: (enabled: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this.enabled);
      } catch {
        // ignore subscriber errors
      }
    });
  }

  public initContext() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.initialized = true;
    } catch {
      // Audio context init fails gracefully
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ay_audio_enabled', String(this.enabled));
    }
    this.notify();

    if (this.enabled) {
      this.initContext();
      this.playRadioBeep();
    }
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ay_audio_enabled', String(this.enabled));
    }
    this.notify();
    if (this.enabled) {
      this.initContext();
      this.playRadioBeep();
    }
  }

  // 1. Soft High-Tech UI Hover Micro-Chirp
  public playHover() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(1080, now + 0.025);

      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Fail gracefully
    }
  }

  // 2. Tactile Mechanical Racing Switch Click
  public playClick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {
      // Fail gracefully
    }
  }

  // 3. Iconic Formula 1 Pit Wall Team Radio "Beep-Boop" Chime
  public playRadioBeep() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      
      // Tone 1: 1760 Hz (30ms)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1760, now);
      gain1.gain.setValueAtTime(0.035, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Tone 2: 2350 Hz (45ms)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(2350, now + 0.045);
      gain2.gain.setValueAtTime(0.04, now + 0.045);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.045);
      osc2.stop(now + 0.1);
    } catch {
      // Fail gracefully
    }
  }

  // 4. Formula 1 V6 Turbo Hybrid Acceleration & Throttle Blip
  public playF1EngineRev() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 0.65;

      // Primary cylinder rumble (Sawtooth)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      // Sweep from 140Hz up to 580Hz (high RPM) and back down
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(620, now + 0.28);
      osc1.frequency.exponentialRampToValueAtTime(320, now + duration);

      osc2.frequency.setValueAtTime(142, now);
      osc2.frequency.exponentialRampToValueAtTime(628, now + 0.28);
      osc2.frequency.exponentialRampToValueAtTime(324, now + duration);

      // Resonant bandpass filter simulation of exhaust runner
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.5, now);
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.28);
      filter.frequency.exponentialRampToValueAtTime(700, now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.05);
      osc2.stop(now + duration + 0.05);

      // Turbo spool whistle (Sine wave high harmonic)
      const turboOsc = this.ctx.createOscillator();
      const turboGain = this.ctx.createGain();
      turboOsc.type = 'sine';
      turboOsc.frequency.setValueAtTime(2400, now);
      turboOsc.frequency.exponentialRampToValueAtTime(4200, now + 0.3);
      turboOsc.frequency.exponentialRampToValueAtTime(2600, now + duration);

      turboGain.gain.setValueAtTime(0.0001, now);
      turboGain.gain.linearRampToValueAtTime(0.015, now + 0.25);
      turboGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      turboOsc.connect(turboGain);
      turboGain.connect(this.ctx.destination);
      turboOsc.start(now);
      turboOsc.stop(now + duration + 0.05);
    } catch {
      // Fail gracefully
    }
  }

  // 5. Pneumatic Sequential Gear Shift "Clack-Thud"
  public playGearShift() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Low torque interruption thump
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(160, now);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 0.06);
      subGain.gain.setValueAtTime(0.05, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.065);

      // Pneumatic mechanical snap
      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(1400, now);
      snapOsc.frequency.exponentialRampToValueAtTime(320, now + 0.035);
      snapGain.gain.setValueAtTime(0.04, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      snapOsc.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.04);
    } catch {
      // Fail gracefully
    }
  }

  // 6. Formula 1 Cockpit DRS Detection Beep (Triple Pulse)
  public playDrsBeep() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [0, 0.04, 0.08].forEach(offset => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, now + offset);
        gain.gain.setValueAtTime(0.03, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.024);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.028);
      });
    } catch {
      // Fail gracefully
    }
  }

  // 7. Formula 1 Starting Lights Sequence (5 Red Lights + Lights Out!)
  public playRaceLights() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // 5 red lights beep
      [0, 0.2, 0.4, 0.6, 0.8].forEach(offset => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now + offset);
        gain.gain.setValueAtTime(0.025, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.09);
      });

      // Lights out! (High energetic tone at 1.2s)
      const greenOsc = this.ctx.createOscillator();
      const greenGain = this.ctx.createGain();
      greenOsc.type = 'sine';
      greenOsc.frequency.setValueAtTime(880, now + 1.2);
      greenOsc.frequency.exponentialRampToValueAtTime(1760, now + 1.45);
      greenGain.gain.setValueAtTime(0.05, now + 1.2);
      greenGain.gain.exponentialRampToValueAtTime(0.001, now + 1.45);
      greenOsc.connect(greenGain);
      greenGain.connect(this.ctx.destination);
      greenOsc.start(now + 1.2);
      greenOsc.stop(now + 1.48);
    } catch {
      // Fail gracefully
    }
  }

  // 8. High-Speed Telemetry Sensor Packet Scan
  public playTelemetryScan() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [1046.5, 1318.5, 1567.9, 1975.5, 2349.3];
      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.022);
        gain.gain.setValueAtTime(0.02, now + i * 0.022);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.022 + 0.028);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.022);
        osc.stop(now + i * 0.022 + 0.03);
      });
    } catch {
      // Fail gracefully
    }
  }

  // 9. Aerodynamic Downforce Whoosh / Airflow Sweep
  public playWhoosh() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.5, now);
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.26);
    } catch {
      // Fail gracefully
    }
  }

  // 10. Timing Sector Purple / Fastest Lap Telemetry Chime
  public playTelemetryLap() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [587.33, 880, 1174.66].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.03, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.065);
      });
    } catch {
      // Fail gracefully
    }
  }

  // 11. Pit Lane Wheel Gun / Impact Wrench Pulse
  public playPitStopChirp() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [0, 0.03, 0.06].forEach(offset => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now + offset);
        osc.frequency.exponentialRampToValueAtTime(110, now + offset + 0.025);
        gain.gain.setValueAtTime(0.03, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.025);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.028);
      });
    } catch {
      // Fail gracefully
    }
  }
}

export const sound = new SoundEffects();
