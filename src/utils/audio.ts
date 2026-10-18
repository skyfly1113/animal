/**
 * Audio Engine for Toddler Counting App
 * Uses Web Audio API for rich, zero-latency sound effects and BGM
 * Uses Web Speech API for cheerful voice pronunciation
 */

let audioCtx: AudioContext | null = null;
let bgmGainNode: GainNode | null = null;
let bgmTimeoutId: number | null = null;
let isBgmPlaying = false;
let isMuted = false;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuteAll(muted: boolean) {
  isMuted = muted;
  if (muted && isBgmPlaying) {
    stopBgm();
  }
}

export function getIsMuted() {
  return isMuted;
}

/** Musical scale for counting (C Major scale ascending) */
const NOTE_FREQS = [
  261.63, // C4 (1 - 하나)
  293.66, // D4 (2 - 둘)
  329.63, // E4 (3 - 셋)
  349.23, // F4 (4 - 넷)
  392.00, // G4 (5 - 다섯)
  440.00, // A4 (6 - 여섯)
  493.88, // B4 (7 - 일곱)
  523.25, // C5 (8 - 여덟)
  587.33, // D5 (9 - 아홉)
  659.25, // E5 (10 - 열)
  698.46, // F5 (11)
  783.99, // G5 (12)
];

/** Play bright cheerful marimba chime for counting */
export function playCountSound(index: number) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const freq = NOTE_FREQS[(index - 1) % NOTE_FREQS.length] || 440;

    // Fundamental tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Overtone for bell/marimba brightness
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Filter to soften
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4, now);

    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    gain2.gain.setValueAtTime(0.2, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  } catch {
    // Audio context not allowed before user interaction
  }
}

/** Play snappy bubble pop */
export function playPopSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {}
}

/** Play joyful victory celebration fanfare */
export function playSuccessSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Arpeggio chords: C4, E4, G4, C5, E5, G5
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];

    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.3, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.65);
    });

    // Final grand chord
    const chordTime = now + 0.6;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, chordTime);

      gain.gain.setValueAtTime(0.25, chordTime);
      gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(chordTime);
      osc.stop(chordTime + 1.25);
    });
  } catch {}
}

/** Play gentle oops sound for wrong guess */
export function playOopsSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  } catch {}
}

/** Play cute eating / bite munch sound */
export function playBiteSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [0, 0.08, 0.16].forEach((delay) => {
      const t = now + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300 + Math.random() * 80, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.06);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    });
  } catch {}
}

/** Play unique cute sound for each animal */
export function playAnimalSound(animalId: string) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (animalId) {
      case 'bunny': {
        // High bouncy double spring
        [0, 0.12].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(540, now + offset);
          osc.frequency.exponentialRampToValueAtTime(860, now + offset + 0.1);
          gain.gain.setValueAtTime(0.35, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
        break;
      }
      case 'bear': {
        // Warm cuddly growl hum
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.15);
        osc.frequency.linearRampToValueAtTime(130, now + 0.35);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
        break;
      }
      case 'puppy': {
        // Cheerful puppy bark (two quick woofs)
        [0, 0.16].forEach((offset, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(idx === 0 ? 550 : 620, now + offset);
          filter.Q.value = 3.5;

          osc.frequency.setValueAtTime(320, now + offset);
          osc.frequency.linearRampToValueAtTime(440, now + offset + 0.05);
          osc.frequency.exponentialRampToValueAtTime(260, now + offset + 0.12);

          gain.gain.setValueAtTime(0.35, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.12);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.14);
        });
        break;
      }
      case 'kitten': {
        // High sweet meow pitch glide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.18);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.4);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.43);
        break;
      }
      case 'duck': {
        // Quack quack! (harmonic reedy tone)
        [0, 0.14].forEach((offset) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(600, now + offset);
          filter.frequency.linearRampToValueAtTime(450, now + offset + 0.1);
          filter.Q.value = 5;

          osc.frequency.setValueAtTime(280, now + offset);
          osc.frequency.linearRampToValueAtTime(240, now + offset + 0.1);

          gain.gain.setValueAtTime(0.35, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.1);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
        break;
      }
      case 'frog': {
        // Frog ribbit with rapid frequency modulation
        const osc = ctx.createOscillator();
        const mod = ctx.createOscillator();
        const modGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.2);

        mod.frequency.setValueAtTime(28, now); // Ribbit chatter
        modGain.gain.setValueAtTime(60, now);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        mod.connect(modGain);
        modGain.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(ctx.destination);

        mod.start(now);
        osc.start(now);
        mod.stop(now + 0.26);
        osc.stop(now + 0.26);
        break;
      }
      case 'lion': {
        // Baby lion cute friendly roar swoop
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(290, now + 0.18);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.38);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, now);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
        break;
      }
      case 'panda': {
        // Playful chime squeak
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
        break;
      }
      case 'penguin': {
        // Waddling chirp
        [0, 0.1].forEach((offset, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(idx === 0 ? 580 : 680, now + offset);
          gain.gain.setValueAtTime(0.3, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.09);
        });
        break;
      }
      case 'monkey': {
        // Monkey "ooh ooh aah!"
        [0, 0.11, 0.22].forEach((offset, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const f = idx < 2 ? 420 : 660;
          osc.frequency.setValueAtTime(f, now + offset);
          gain.gain.setValueAtTime(0.3, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.09);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.1);
        });
        break;
      }
      default:
        playPopSound();
    }
  } catch {}
}

/** Play piano tone for Do Re Mi Fa Sol La Si Do (semitone offset) */
export function playPianoNote(noteIndex: number) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const freq = NOTE_FREQS[noteIndex % NOTE_FREQS.length] || 440;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  } catch {}
}

/** Background Nursery Lullaby loop */
const BGM_MELODY = [
  // Twinkle Twinkle simplified notes: C, C, G, G, A, A, G
  { freq: 261.63, dur: 0.35 },
  { freq: 261.63, dur: 0.35 },
  { freq: 392.00, dur: 0.35 },
  { freq: 392.00, dur: 0.35 },
  { freq: 440.00, dur: 0.35 },
  { freq: 440.00, dur: 0.35 },
  { freq: 392.00, dur: 0.7 },
  // F, F, E, E, D, D, C
  { freq: 349.23, dur: 0.35 },
  { freq: 349.23, dur: 0.35 },
  { freq: 329.63, dur: 0.35 },
  { freq: 329.63, dur: 0.35 },
  { freq: 293.66, dur: 0.35 },
  { freq: 293.66, dur: 0.35 },
  { freq: 261.63, dur: 0.7 },
];

export function toggleBgm(): boolean {
  if (isBgmPlaying) {
    stopBgm();
    return false;
  } else {
    startBgm();
    return true;
  }
}

export function startBgm() {
  if (isMuted || isBgmPlaying) return;
  try {
    const ctx = getAudioContext();
    isBgmPlaying = true;
    bgmGainNode = ctx.createGain();
    bgmGainNode.gain.setValueAtTime(0.06, ctx.currentTime); // gentle ambient volume
    bgmGainNode.connect(ctx.destination);

    let step = 0;
    const playNextNote = () => {
      if (!isBgmPlaying || !bgmGainNode) return;
      const note = BGM_MELODY[step % BGM_MELODY.length];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now);

      noteGain.gain.setValueAtTime(0.05, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + note.dur * 0.9);

      osc.connect(noteGain);
      noteGain.connect(bgmGainNode);

      osc.start(now);
      osc.stop(now + note.dur);

      step++;
      const nextDelay = note.dur * 1000 + 50;
      bgmTimeoutId = window.setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  } catch {}
}

export function stopBgm() {
  isBgmPlaying = false;
  if (bgmTimeoutId !== null) {
    clearTimeout(bgmTimeoutId);
    bgmTimeoutId = null;
  }
  if (bgmGainNode) {
    try {
      bgmGainNode.disconnect();
    } catch {}
    bgmGainNode = null;
  }
}

export function getIsBgmPlaying() {
  return isBgmPlaying;
}

/** Korean Native numbers (하나, 둘, 셋...) */
export const NATIVE_KOREAN_NUMS = [
  '하나', '둘', '셋', '넷', '다섯',
  '여섯', '일곱', '여덟', '아홉', '열',
  '열하나', '열둘', '열셋', '열넷', '열다섯'
];

/** Sino Korean numbers (일, 이, 삼...) */
export const SINO_KOREAN_NUMS = [
  '일', '이', '삼', '사', '오',
  '육', '칠', '팔', '구', '십',
  '십일', '십이', '십삼', '십사', '십오'
];

/** English number words */
export const ENGLISH_NUMS = [
  'One', 'Two', 'Three', 'Four', 'Five',
  'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen'
];

/**
 * Text-to-Speech narration with Korean and English support
 */
export function speakWord(text: string, lang = 'ko-KR') {
  if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    // Cancel ongoing speech to keep voice prompt immediate for toddlers
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // slightly slower & clearer for toddlers
    utterance.pitch = 1.25; // friendly, gentle, slightly higher pitch for young kids

    const voices = window.speechSynthesis.getVoices();
    const matchVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch {}
}

/**
 * Speak number depending on counting style
 */
export function speakNumberCount(num: number, style: 'native' | 'sino' | 'english' = 'native', animalLabel?: string) {
  let word = '';
  if (style === 'english') {
    word = ENGLISH_NUMS[num - 1] || `${num}`;
    speakWord(animalLabel ? `${word}! ${animalLabel}` : word, 'en-US');
    return;
  }

  if (style === 'sino') {
    word = SINO_KOREAN_NUMS[num - 1] || `${num}`;
  } else {
    word = NATIVE_KOREAN_NUMS[num - 1] || `${num}`;
  }

  speakWord(animalLabel ? `${word}! ${animalLabel}` : word, 'ko-KR');
}
