import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 relative" id="contact">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
            {/* Left side - Contact info */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold leading-tight">
                  Kontaktieren Sie <span className="text-primary">uns</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Haben Sie Fragen oder benötigen Sie Beratung? 
                  Wir sind gerne für Sie da!
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <Card className="p-5 md:p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1 text-sm md:text-base">E-Mail</h3>
                      <a 
                        href="mailto:info@pcpraxis.at" 
                        className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@pcpraxis.at
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 md:p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1 text-sm md:text-base">Telefon</h3>
                      <a 
                        href="tel:+43123456789" 
                        className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                      >
                        +43 1 234 56 789
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 md:p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1 text-sm md:text-base">Adresse</h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Musterstraße 123<br />
                        1010 Wien, Österreich
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 md:p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1 text-sm md:text-base">Öffnungszeiten</h3>
                      <div className="text-muted-foreground space-y-1 text-xs md:text-sm">
                        <p>Mo-Fr: 09:00 - 18:00</p>
                        <p>Sa: 10:00 - 14:00</p>
                        <p className="text-primary font-medium">24/7 Online Support</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right side - CTA */}
            <Card className="p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-card border-primary/20 shadow-glow hover:shadow-glow/80 transition-all">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-tech font-bold">
                    Bereit für Ihren neuen PC?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Lassen Sie sich unverbindlich beraten oder starten Sie direkt 
                    mit der Konfiguration Ihres Traum-Systems.
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <Button variant="hero" size="lg" className="w-full hover:scale-[1.02] transition-transform">
                    Beratungstermin vereinbaren
                  </Button>
                  <Button variant="tech" size="lg" className="w-full hover:scale-[1.02] transition-transform">
                    Zum Konfigurator
                  </Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                    <span>GDPR-konform | Made in Austria 🇦🇹</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
