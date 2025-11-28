import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Configurator } from "@/components/Configurator";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CyberpunkEffects } from "@/components/CyberpunkEffects";
import { FloatingLanguageSwitcher } from "@/components/FloatingLanguageSwitcher";
import { SplashScreen } from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash was already shown in this session
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen scroll-smooth">
      <CyberpunkEffects />
      <Navbar />
      <ScrollProgress />
      <FloatingLanguageSwitcher />
      <main>
        <Hero />
        <Services />
        <Configurator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
