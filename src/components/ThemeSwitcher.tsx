import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCyberpunkSounds } from '@/hooks/useCyberpunkSounds';
import { useState } from 'react';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { playGlitchSound, playPowerUpSound } = useCyberpunkSounds();
  const [isXRayActive, setIsXRayActive] = useState(false);

  const themes = [
    { id: 'white' as const, icon: Sun, label: 'Light' },
    { id: 'black' as const, icon: Moon, label: 'Dark' },
    { id: 'cyberpunk' as const, icon: Zap, label: 'Cyberpunk' },
  ];

  const handleThemeClick = (themeId: 'white' | 'black' | 'cyberpunk') => {
    if (themeId === 'cyberpunk') {
      // Play glitch sound
      playGlitchSound();
      
      // Activate X-Ray effect
      setIsXRayActive(true);
      document.documentElement.classList.add('cyberpunk-xray');
      
      // After 0.8s, remove effect and apply theme
      setTimeout(() => {
        setIsXRayActive(false);
        document.documentElement.classList.remove('cyberpunk-xray');
        setTheme(themeId);
        playPowerUpSound();
      }, 800);
    } else {
      setTheme(themeId);
    }
  };

  return (
    <div className="flex items-center gap-0.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleThemeClick(id)}
          className={`p-1 rounded transition-all duration-200 ${
            theme === id
              ? 'text-primary scale-110'
              : 'text-muted-foreground/50 hover:text-foreground/80 hover:scale-105'
          }`}
          title={label}
          disabled={isXRayActive}
        >
          <Icon className={`w-3.5 h-3.5 ${id === 'cyberpunk' && theme === id ? 'animate-pulse' : ''}`} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
};
