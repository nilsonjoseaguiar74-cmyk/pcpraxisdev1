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

  const playHoverSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  const playClickSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playPowerUpSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  };

  const playGlitchSound = () => {
    if (theme !== 'cyberpunk' || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // Multiple oscillators for glitch effect
    for (let i = 0; i < 3; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const baseFreq = 200 + Math.random() * 400;
      oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime + i * 0.05);
      
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.08);
      
      oscillator.start(ctx.currentTime + i * 0.05);
      oscillator.stop(ctx.currentTime + i * 0.05 + 0.08);
    }
  };

  return { playHoverSound, playClickSound, playPowerUpSound, playGlitchSound };
};
