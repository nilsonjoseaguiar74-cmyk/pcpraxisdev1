import { useEffect, useState } from 'react';
import { CosmosBackground } from './CosmosBackground';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Complete animation after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 300); // Wait for fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) {
    return (
      <div className="fixed inset-0 z-[100] bg-background pointer-events-none animate-fade-out" />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <CosmosBackground />
      <div className="relative z-10 animate-splash-logo">
        <img
          src="/lovable-uploads/logo-pc-praxis-dark.png"
          alt="PC Praxis"
          className="h-24 md:h-32 w-auto dark:hidden animate-pulse"
        />
        <img
          src="/lovable-uploads/logo-pc-praxis-light.png"
          alt="PC Praxis"
          className="h-24 md:h-32 w-auto hidden dark:block animate-pulse"
        />
      </div>
    </div>
  );
};
