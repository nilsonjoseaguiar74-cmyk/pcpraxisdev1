import { Sun, Moon, Cpu } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'white' as const, icon: Sun, label: 'Light' },
    { id: 'black' as const, icon: Moon, label: 'Dark' },
    { id: 'cyberpunk' as const, icon: Cpu, label: 'Cyberpunk' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-card/50 border border-border">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`p-1.5 rounded transition-all ${
            theme === id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-card'
          }`}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};
