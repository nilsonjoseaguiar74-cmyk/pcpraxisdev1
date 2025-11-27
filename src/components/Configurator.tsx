import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Zap, Fan, Monitor, Package } from "lucide-react";

const configuratorCategories = [
  { icon: Cpu, label: "Prozessor", count: "50+", color: "primary" },
  { icon: HardDrive, label: "Grafikkarte", count: "80+", color: "tech-secondary" },
  { icon: Zap, label: "RAM", count: "40+", color: "primary" },
  { icon: Fan, label: "Kühlung", count: "30+", color: "tech-secondary" },
  { icon: Monitor, label: "Gehäuse", count: "60+", color: "primary" },
  { icon: Package, label: "Netzteil", count: "35+", color: "tech-secondary" },
];

export const Configurator = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative bg-gradient-to-b from-background to-card/30" id="configurator">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">PC Konfigurator</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-tech font-bold leading-tight px-4">
            Bauen Sie Ihren <span className="text-primary">Traum-PC</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground px-4">
            Unser intelligenter Konfigurator prüft automatisch die Kompatibilität 
            aller Komponenten und erstellt Ihr individuelles Angebot.
          </p>
        </div>

        {/* Configurator preview */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 sm:p-8 md:p-12 bg-gradient-card border-primary/20 shadow-glow">
            {/* Components grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {configuratorCategories.map((category, index) => (
                <div
                  key={index}
                  className="group p-4 md:p-6 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-glow hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary px-2 py-0.5 md:py-1 rounded-full bg-primary/10">
                      {category.count}
                    </span>
                  </div>
                  
                  <h3 className="font-tech text-base md:text-lg font-semibold mb-1">
                    {category.label}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Wählen Sie aus
                  </p>
                </div>
              ))}
            </div>

            {/* Example build */}
            <div className="border-t border-border pt-6 md:pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-tech text-lg md:text-xl font-semibold mb-1">
                    Gaming Beast 2024
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    High-End Gaming System für 4K @ 144Hz
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl md:text-3xl font-tech font-bold text-primary">
                    €2.499
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    inkl. MwSt.
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button variant="hero" size="lg" className="flex-1 group hover:scale-[1.02] transition-transform">
                  Jetzt konfigurieren
                </Button>
                <Button variant="tech" size="lg" className="flex-1 group hover:scale-[1.02] transition-transform">
                  Beispiel-Builds ansehen
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 pt-4">
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-background/30 transition-colors group cursor-pointer">
                  <div className="text-xl md:text-2xl font-tech font-bold text-primary group-hover:scale-110 transition-transform">✓</div>
                  <div className="text-xs text-muted-foreground leading-tight">Kompatibilitäts-Check</div>
                </div>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-background/30 transition-colors group cursor-pointer">
                  <div className="text-xl md:text-2xl font-tech font-bold text-primary group-hover:scale-110 transition-transform">✓</div>
                  <div className="text-xs text-muted-foreground leading-tight">3 Jahre Garantie</div>
                </div>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-background/30 transition-colors group cursor-pointer">
                  <div className="text-xl md:text-2xl font-tech font-bold text-primary group-hover:scale-110 transition-transform">✓</div>
                  <div className="text-xs text-muted-foreground leading-tight">Kostenloser Aufbau</div>
                </div>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-background/30 transition-colors group cursor-pointer">
                  <div className="text-xl md:text-2xl font-tech font-bold text-primary group-hover:scale-110 transition-transform">✓</div>
                  <div className="text-xs text-muted-foreground leading-tight">Express-Versand</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Protocol info */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Jede Bestellung erhält eine eindeutige Protokollnummer (Format: PCP-AAAAMMDD-0001) 
            für lückenlose Nachverfolgung und Service.
          </p>
        </div>
      </div>
    </section>
  );
};
