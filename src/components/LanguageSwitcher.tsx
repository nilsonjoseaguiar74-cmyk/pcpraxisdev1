import { useState } from 'react';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState('de');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'de', label: 'DE', flag: '🇩🇪' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'at', label: 'AT', flag: '🇦🇹' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded transition-all text-muted-foreground hover:text-foreground hover:bg-card/50 flex items-center gap-1"
        title="Language"
      >
        <Languages className="w-4 h-4" />
        <span className="text-xs font-medium">{currentLang.toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-scale-in z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-card/50 transition-colors ${
                currentLang === lang.code ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
