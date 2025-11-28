import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export const FloatingLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const resetTimer = () => {
      setIsVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (!isHovered) {
          setIsVisible(false);
        }
      }, 3000);
    };

    const handleScroll = () => {
      resetTimer();
    };

    const handleMouseMove = () => {
      resetTimer();
    };

    resetTimer();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div 
      className={`fixed bottom-6 left-6 z-40 flex flex-col gap-1 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setLanguage('de')}
        className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-[9px] transition-all duration-300 shadow-sm ${
          language === 'de'
            ? 'bg-gradient-to-br from-black via-red-600 to-yellow-500 text-white ring-1 ring-primary/50'
            : 'bg-gradient-to-br from-black via-red-600 to-yellow-500 text-white/50 opacity-40 hover:opacity-80'
        } ${isHovered ? 'scale-125' : 'scale-100'}`}
        aria-label="Deutsch"
        title="Deutsch"
      >
        DE
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-[9px] transition-all duration-300 shadow-sm ${
          language === 'en'
            ? 'bg-gradient-to-br from-blue-800 via-white to-red-600 text-gray-900 ring-1 ring-primary/50'
            : 'bg-gradient-to-br from-blue-800 via-white to-red-600 text-gray-900/50 opacity-40 hover:opacity-80'
        } ${isHovered ? 'scale-125' : 'scale-100'}`}
        aria-label="English"
        title="English"
      >
        EN
      </button>
    </div>
  );
};
