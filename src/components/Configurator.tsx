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
    <section className="py-24 relative bg-gradient-to-b from-background to-card/30" id="configurator">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">PC Konfigurator</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-tech font-bold">
            Bauen Sie Ihren <span className="text-primary">Traum-PC</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Unser intelligenter Konfigurator prüft automatisch die Kompatibilität 
            aller Komponenten und erstellt Ihr individuelles Angebot.
          </p>
        </div>

        {/* Configurator preview */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-8 sm:p-12 bg-gradient-card border-primary/20 shadow-glow">
            {/* Components grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {configuratorCategories.map((category, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-glow animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10">
                      {category.count}
                    </span>
                  </div>
                  
                  <h3 className="font-tech text-lg font-semibold mb-1">
                    {category.label}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    Wählen Sie aus
                  </p>
                </div>
              ))}
            </div>

            {/* Example build */}
            <div className="border-t border-border pt-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-tech text-xl font-semibold mb-1">
                    Gaming Beast 2024
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    High-End Gaming System für 4K @ 144Hz
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-tech font-bold text-primary">
                    €2.499
                  </div>
                  <div className="text-sm text-muted-foreground">
                    inkl. MwSt.
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="flex-1">
                  Jetzt konfigurieren
                </Button>
                <Button variant="tech" size="lg" className="flex-1">
                  Beispiel-Builds ansehen
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-tech font-bold text-primary">✓</div>
                  <div className="text-xs text-muted-foreground">Kompatibilitäts-Check</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-tech font-bold text-primary">✓</div>
                  <div className="text-xs text-muted-foreground">3 Jahre Garantie</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-tech font-bold text-primary">✓</div>
                  <div className="text-xs text-muted-foreground">Kostenloser Aufbau</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-tech font-bold text-primary">✓</div>
                  <div className="text-xs text-muted-foreground">Express-Versand</div>
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
