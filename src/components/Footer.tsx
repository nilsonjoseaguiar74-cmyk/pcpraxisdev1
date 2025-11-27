import { useTheme } from "@/contexts/ThemeContext";
import { DecodeText } from "./DecodeText";

export const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src={theme === 'white' 
                  ? "/lovable-uploads/logo-pc-praxis-dark.png" 
                  : "/lovable-uploads/logo-pc-praxis-light.png"
                }
                alt="PC Praxis Logo" 
                className="h-10 w-auto object-contain transition-transform hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Ihr Experte für maßgeschneiderte PC-Systeme und professionellen IT-Service in Österreich.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-tech font-semibold mb-3 md:mb-4 text-sm md:text-base">Services</h3>
            <ul className="space-y-2 md:space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#configurator" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">PC Konfigurator</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Hardware Shop</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Wartung & Reparatur</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Upgrades</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-tech font-semibold mb-3 md:mb-4 text-sm md:text-base">Unternehmen</h3>
            <ul className="space-y-2 md:space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Über uns</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Kontakt</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">AGB</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Impressum</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-tech font-semibold mb-3 md:mb-4 text-sm md:text-base">Rechtliches</h3>
            <ul className="space-y-2 md:space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Datenschutz</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Cookie-Richtlinie</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">GDPR</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">Widerrufsrecht</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border space-y-4">
          {/* Crypto payment info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-4">
            <span className="text-xs md:text-sm text-muted-foreground">Wir akzeptieren Zahlungen in:</span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group">
                <span className="text-xs font-medium group-hover:text-primary transition-colors">
                  <DecodeText text="₿ Bitcoin" decodeTime={1500} displayTime={4000} loop={true} />
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group">
                <span className="text-xs font-medium group-hover:text-primary transition-colors">
                  <DecodeText text="Ξ Ethereum" decodeTime={1500} displayTime={4000} loop={true} />
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group">
                <span className="text-xs font-medium group-hover:text-primary transition-colors">
                  <DecodeText text="₮ USDT" decodeTime={1500} displayTime={4000} loop={true} />
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs md:text-sm text-muted-foreground">
              © {currentYear} PC Praxis - Pedro Hauser. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span>Made with</span>
                <span className="text-primary animate-pulse">❤️</span>
                <span>in Austria 🇦🇹</span>
              </div>
              <span className="text-muted-foreground/50 text-xs">•</span>
              <a 
                href="https://rodrigo.run" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors"
              >
                DEV - rodrigo.run
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
