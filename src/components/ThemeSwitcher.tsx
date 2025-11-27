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
    <div className="flex items-center gap-1 p-1 rounded-lg bg-card/50 border border-border backdrop-blur-sm">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleThemeClick(id)}
          className={`p-1.5 rounded transition-all ${
            theme === id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-card'
          }`}
          title={label}
          disabled={isXRayActive}
        >
          <Icon className={`w-4 h-4 ${id === 'cyberpunk' && theme === id ? 'animate-pulse' : ''}`} />
        </button>
      ))}
    </div>
  );
};
