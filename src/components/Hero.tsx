import { Button } from "@/components/ui/button";
import { Monitor, Cpu, Wrench } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/30 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-tech border border-border backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span className="text-sm font-medium text-foreground">Österreichs Premium PC-Service</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-tech font-bold tracking-tight">
            <span className="block text-foreground">Maßgeschneiderte</span>
            <span className="block bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
              PC-Lösungen
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vom individuellen Gaming-PC bis zur professionellen Workstation – 
            wir bieten erstklassige Hardware, kompetente Beratung und zuverlässigen Service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="xl" className="group">
              <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
              PC Konfigurieren
            </Button>
            <Button variant="tech" size="xl" className="group">
              <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Services entdecken
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-tech font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Zufriedene Kunden</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-tech font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Qualitätsgarantie</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-tech font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
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
