import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-24 relative" id="contact">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Contact info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-tech font-bold">
                  Kontaktieren Sie <span className="text-primary">uns</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Haben Sie Fragen oder benötigen Sie Beratung? 
                  Wir sind gerne für Sie da!
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1">E-Mail</h3>
                      <a 
                        href="mailto:info@pcpraxis.at" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@pcpraxis.at
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1">Telefon</h3>
                      <a 
                        href="tel:+43123456789" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +43 1 234 56 789
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1">Adresse</h3>
                      <p className="text-muted-foreground">
                        Musterstraße 123<br />
                        1010 Wien, Österreich
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-tech font-semibold mb-1">Öffnungszeiten</h3>
                      <div className="text-muted-foreground space-y-1 text-sm">
                        <p>Mo-Fr: 09:00 - 18:00</p>
                        <p>Sa: 10:00 - 14:00</p>
                        <p className="text-primary">24/7 Online Support</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right side - CTA */}
            <Card className="p-8 sm:p-12 bg-gradient-card border-primary/20 shadow-glow">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-tech font-bold">
                    Bereit für Ihren neuen PC?
                  </h3>
                  <p className="text-muted-foreground">
                    Lassen Sie sich unverbindlich beraten oder starten Sie direkt 
                    mit der Konfiguration Ihres Traum-Systems.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button variant="hero" size="lg" className="w-full">
                    Beratungstermin vereinbaren
                  </Button>
                  <Button variant="tech" size="lg" className="w-full">
                    Zum Konfigurator
                  </Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
