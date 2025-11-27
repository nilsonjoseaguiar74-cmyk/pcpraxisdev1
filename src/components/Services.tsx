import { Card } from "@/components/ui/card";
import { Monitor, Cpu, Wrench, ShoppingCart, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Monitor,
    title: "PC Konfigurator",
    description: "Stellen Sie Ihren individuellen PC zusammen. Alle Komponenten werden auf Kompatibilität geprüft und optimal aufeinander abgestimmt.",
    features: ["Gaming PCs", "Workstations", "Office PCs", "Server-Systeme"],
  },
  {
    icon: ShoppingCart,
    title: "Hardware Shop",
    description: "Große Auswahl an Premium-Komponenten und fertigen Systemen zu fairen Preisen mit Bestpreisgarantie.",
    features: ["Neueste Hardware", "Faire Preise", "Express-Lieferung", "Garantie"],
  },
  {
    icon: Wrench,
    title: "Service & Wartung",
    description: "Professionelle Reparatur, Wartung und Upgrade-Service für alle PC-Systeme mit Protokoll-Tracking.",
    features: ["Reparatur-Service", "Upgrades", "Reinigung", "Diagnose"],
  },
];

export const Services = () => {
  return (
    <section className="py-24 relative" id="services">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-tech font-bold">
            Unsere <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Von der Beratung bis zur Wartung – alles aus einer Hand
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-tech opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-tech font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                  Mehr erfahren
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Features row */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
            <Zap className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium">Schnelle Lieferung</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium">GDPR-konform</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
            <Cpu className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium">Premium-Komponenten</span>
          </div>
        </div>
      </div>
    </section>
  );
};
