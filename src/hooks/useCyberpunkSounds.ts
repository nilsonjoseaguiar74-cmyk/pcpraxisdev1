import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const useCyberpunkSounds = () => {
  const { theme } = useTheme();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (theme === 'cyberpunk' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (audioContextRef.current && theme !== 'cyberpunk') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [theme]);

  // Counter-Strike style sounds - metallic, sharp, aggressive
  const playHoverSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Sharp metallic ping
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.03);
    
    gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03);
  };

  const playClickSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // CS-style weapon click/select sound - double tap
    [0, 0.05].forEach((delay) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime + delay);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + delay + 0.08);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);
      
      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.08);
    });
  };

  const playPowerUpSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // CS round start sound - ascending power
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.25);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.25);
  };

  const playGlitchSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // CS radio static/interference sound
    for (let i = 0; i < 4; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'square';
      const baseFreq = 150 + Math.random() * 600;
      oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime + i * 0.04);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.06);
      
      oscillator.start(ctx.currentTime + i * 0.04);
      oscillator.stop(ctx.currentTime + i * 0.04 + 0.06);
    }
  };

  return { playHoverSound, playClickSound, playPowerUpSound, playGlitchSound };
};
