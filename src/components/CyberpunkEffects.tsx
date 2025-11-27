import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCyberpunkSounds } from '@/hooks/useCyberpunkSounds';

export const CyberpunkEffects = () => {
  const { theme } = useTheme();
  const { playHoverSound, playClickSound } = useCyberpunkSounds();

  useEffect(() => {
    if (theme !== 'cyberpunk') return;

    // Add hover sounds to interactive elements
    const addSoundEffects = () => {
      const buttons = document.querySelectorAll('button, a[href], .hover-scale, [role="button"]');
      const cards = document.querySelectorAll('[class*="Card"], [class*="card"]');
      const icons = document.querySelectorAll('svg');

      // Buttons and links
      buttons.forEach((element) => {
        element.addEventListener('mouseenter', playHoverSound);
        element.addEventListener('click', playClickSound);
      });

      // Cards
      cards.forEach((element) => {
        element.addEventListener('mouseenter', playHoverSound);
      });

      // Icons (more subtle)
      icons.forEach((element) => {
        const parent = element.closest('button, a');
        if (!parent) {
          element.addEventListener('mouseenter', playHoverSound);
        }
      });
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(addSoundEffects, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup is handled by removing event listeners when theme changes
    };
  }, [theme, playHoverSound, playClickSound]);

  return null;
};
