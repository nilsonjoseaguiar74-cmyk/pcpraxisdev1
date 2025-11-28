import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'de' as const, label: 'DE', title: 'Deutsch' },
    { code: 'en' as const, label: 'EN', title: 'English' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-md bg-card/50 border border-border backdrop-blur-sm">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            language === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-card'
          }`}
          title={lang.title}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
