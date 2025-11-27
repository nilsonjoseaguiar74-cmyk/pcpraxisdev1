import { useTheme } from "@/contexts/ThemeContext";

export const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={theme === 'white' 
                  ? "/lovable-uploads/logo-pc-praxis-dark.png" 
                  : "/lovable-uploads/logo-pc-praxis-light.png"
                }
                alt="PC Praxis Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Ihr Experte für maßgeschneiderte PC-Systeme und professionellen IT-Service in Österreich.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-tech font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#configurator" className="hover:text-primary transition-colors">PC Konfigurator</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Hardware Shop</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Wartung & Reparatur</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Upgrades</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-tech font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Über uns</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Kontakt</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AGB</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-tech font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie-Richtlinie</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GDPR</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Widerrufsrecht</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PC Praxis - Pedro Hauser. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <span className="text-primary">❤️</span>
            <span>in Austria 🇦🇹</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
