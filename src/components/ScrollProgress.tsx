import { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
      {/* Track */}
      <div className="relative w-0.5 h-48 bg-border/30 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Progress */}
        <div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-tech-glow transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-glow transition-all duration-300 ease-out"
          style={{ top: `${scrollProgress}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>
      
      {/* Percentage indicator (optional, very subtle) */}
      <span className="text-[10px] font-mono text-muted-foreground/50 tabular-nums">
        {Math.round(scrollProgress)}%
      </span>
    </div>
  );
};
