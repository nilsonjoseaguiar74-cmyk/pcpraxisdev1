import { useLanguage } from "@/contexts/LanguageContext";

export const FloatingLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-1.5 animate-fade-in">
      <button
        onClick={() => setLanguage('de')}
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[10px] transition-all shadow-md hover:scale-110 ${
          language === 'de'
            ? 'bg-gradient-to-br from-black via-red-600 to-yellow-500 text-white ring-1 ring-primary'
            : 'bg-gradient-to-br from-black via-red-600 to-yellow-500 text-white/60 opacity-50 hover:opacity-90'
        }`}
        aria-label="Deutsch"
        title="Deutsch"
      >
        DE
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[10px] transition-all shadow-md hover:scale-110 ${
          language === 'en'
            ? 'bg-gradient-to-br from-blue-800 via-white to-red-600 text-gray-900 ring-1 ring-primary'
            : 'bg-gradient-to-br from-blue-800 via-white to-red-600 text-gray-900/60 opacity-50 hover:opacity-90'
        }`}
        aria-label="English"
        title="English"
      >
        EN
      </button>
    </div>
  );
};
