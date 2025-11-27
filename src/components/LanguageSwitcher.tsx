import { useState } from 'react';

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState('de');

  const languages = [
    { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setCurrentLang(lang.code)}
          className={`p-1.5 rounded transition-all ${
            currentLang === lang.code
              ? 'bg-primary/20 scale-110'
              : 'opacity-50 hover:opacity-100 hover:scale-105'
          }`}
          title={lang.label}
        >
          <span className="text-lg">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
};
