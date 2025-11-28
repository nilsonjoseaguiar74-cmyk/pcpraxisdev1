import { useLanguage } from "@/contexts/LanguageContext";

export const FloatingLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 animate-fade-in">
      <button
        onClick={() => setLanguage('de')}
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg hover:scale-110 ${
          language === 'de'
            ? 'bg-gradient-to-br from-black via-red-600 to-yellow-500 text-white ring-2 ring-primary'
            : 'bg-gradient-to-br from-black via-red-600 to-yellow-500 text-white/70 opacity-60 hover:opacity-100'
        }`}
        aria-label="Deutsch"
        title="Deutsch"
      >
        DE
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg hover:scale-110 ${
          language === 'en'
            ? 'bg-gradient-to-br from-blue-800 via-white to-red-600 text-gray-900 ring-2 ring-primary'
            : 'bg-gradient-to-br from-blue-800 via-white to-red-600 text-gray-900/70 opacity-60 hover:opacity-100'
        }`}
        aria-label="English"
        title="English"
      >
        EN
      </button>
    </div>
  );
};
