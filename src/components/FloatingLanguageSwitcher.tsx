import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import flagDE from "@/assets/flag-de.svg";
import flagUS from "@/assets/flag-us.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider delayDuration={300}>
      <div 
        className={`fixed bottom-24 left-6 z-40 flex flex-col gap-2 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setLanguage('de')}
              className={`w-6 h-4 rounded-md flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm ${
                language === 'de'
                  ? 'ring-1 ring-muted-foreground/30 scale-105 opacity-100'
                  : 'opacity-40 hover:opacity-70'
              } ${isHovered ? 'scale-110' : ''}`}
              style={{ borderColor: '#888' }}
              aria-label="Deutsch"
            >
              <img src={flagDE} alt="DE" className="w-full h-full object-cover" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Deutsch</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setLanguage('en')}
              className={`w-6 h-4 rounded-md flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm ${
                language === 'en'
                  ? 'ring-1 ring-muted-foreground/30 scale-105 opacity-100'
                  : 'opacity-40 hover:opacity-70'
              } ${isHovered ? 'scale-110' : ''}`}
              style={{ borderColor: '#888' }}
              aria-label="English"
            >
              <img src={flagUS} alt="EN" className="w-full h-full object-cover" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>English</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
