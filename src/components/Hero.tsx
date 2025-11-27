import { Button } from "@/components/ui/button";
import { Monitor, Cpu, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { DecodeText } from "./DecodeText";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 md:pt-24 pb-16 md:pb-20">
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-foreground/30 rounded-full blur-3xl animate-glow-pulse transition-transform duration-100 ease-out" 
          style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-accent/30 rounded-full blur-3xl animate-glow-pulse transition-transform duration-100 ease-out" 
          style={{ animationDelay: '1.5s', transform: `translate(-${scrollY * 0.4}px, ${scrollY * 0.15}px)` }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-tech border border-border backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <DecodeText 
              text="Österreichs Premium PC-Service" 
              className="text-xs sm:text-sm font-medium text-foreground"
            />
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tech font-bold tracking-tight animate-fade-in leading-tight" style={{ animationDelay: '0.3s' }}>
            <span className="block text-foreground mb-2">Maßgeschneiderte</span>
            <span className="block bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
              PC-Lösungen
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Vom individuellen Gaming-PC bis zur professionellen Workstation – 
            wir bieten erstklassige Hardware, kompetente Beratung und zuverlässigen Service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 px-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Button variant="hero" size="xl" className="group w-full sm:w-auto">
              <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
              PC Konfigurieren
            </Button>
            <Button variant="tech" size="xl" className="group w-full sm:w-auto">
              <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Services entdecken
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 md:pt-12 max-w-3xl mx-auto animate-fade-in px-4" style={{ animationDelay: '0.9s' }}>
            <div className="space-y-2 p-4 rounded-lg hover:bg-card/50 transition-all duration-300 cursor-pointer group">
              <div className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold text-foreground group-hover:scale-110 transition-transform">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Zufriedene Kunden</div>
            </div>
            <div className="space-y-2 p-4 rounded-lg hover:bg-card/50 transition-all duration-300 cursor-pointer group">
              <div className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold text-foreground group-hover:scale-110 transition-transform">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Qualitätsgarantie</div>
            </div>
            <div className="space-y-2 p-4 rounded-lg hover:bg-card/50 transition-all duration-300 cursor-pointer group">
              <div className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold text-foreground group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};
