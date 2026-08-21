import { LanguageCode } from '../types/agent';

export class VoiceService {
  private static instance: VoiceService;
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;
  private recognition: any = null;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }
    return VoiceService.instance;
  }

  public speak(text: string, lang: LanguageCode = 'en', onEnd?: () => void): void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any pending utterance

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const langMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        ta: 'ta-IN',
        te: 'te-IN'
      };

      utterance.lang = langMap[lang] || 'en-IN';

      // Pick best matching voice if available
      const voices = this.synth.getVoices();
      const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.startsWith(lang));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error or cancelled:', e);
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.isSpeaking = true;
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis failed:', err);
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }

  public playChime(type: 'start' | 'success' | 'alert' | 'heal' | 'click' = 'click'): void {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'start') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'heal') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.2);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.setValueAtTime(500, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        // Quick subtle click
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  public startListening(
    lang: LanguageCode,
    onResult: (text: string) => void,
    onError: (err: any) => void
  ): () => void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError('Speech Recognition is not supported natively in this browser.');
      return () => {};
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      const langMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        ta: 'ta-IN',
        te: 'te-IN'
      };

      this.recognition.lang = langMap[lang] || 'en-IN';

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.playChime('success');
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        onError(event.error);
      };

      this.recognition.start();
      this.playChime('start');

      return () => {
        if (this.recognition) {
          try {
            this.recognition.stop();
          } catch {}
        }
      };
    } catch (e) {
      onError(e);
      return () => {};
    }
  }
}
