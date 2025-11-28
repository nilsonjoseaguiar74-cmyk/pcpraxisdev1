import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import flagDE from "@/assets/flag-de.svg";
import flagGB from "@/assets/flag-gb.svg";

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
        className={`w-7 h-7 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm border ${
          language === 'de'
            ? 'ring-2 ring-primary scale-110'
            : 'opacity-40 hover:opacity-80'
        } ${isHovered ? 'scale-125' : ''}`}
        aria-label="Deutsch"
        title="Deutsch"
      >
        <img src={flagDE} alt="DE" className="w-full h-full object-cover" />
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={`w-7 h-7 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm border ${
          language === 'en'
            ? 'ring-2 ring-primary scale-110'
            : 'opacity-40 hover:opacity-80'
        } ${isHovered ? 'scale-125' : ''}`}
        aria-label="English"
        title="English"
      >
        <img src={flagGB} alt="EN" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};
