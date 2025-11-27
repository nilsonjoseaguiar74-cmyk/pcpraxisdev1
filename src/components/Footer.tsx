import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DecodeText } from "./DecodeText";

export const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
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
              {t('footerBrand')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-tech font-semibold mb-3 md:mb-4 text-sm md:text-base">{t('footerServices')}</h3>
            <ul className="space-y-2 md:space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#configurator" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('configurator')}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerHardwareShop')}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerMaintenance')}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerUpgrades')}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-tech font-semibold mb-3 md:mb-4 text-sm md:text-base">{t('footerCompany')}</h3>
            <ul className="space-y-2 md:space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerAbout')}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('contact')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerTerms')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerImprint')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-tech font-semibold mb-3 md:mb-4 text-sm md:text-base">{t('footerLegal')}</h3>
            <ul className="space-y-2 md:space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerPrivacy')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerCookies')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerGDPR')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">{t('footerWithdrawal')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border space-y-4">
          {/* Crypto payment info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-4">
            <span className="text-xs md:text-sm text-muted-foreground">{t('footerCryptoPayments')}</span>
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
              © {currentYear} PC Praxis - Pedro Hauser. {t('footerRights')}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span>{t('footerMadeWith')}</span>
                <span className="text-primary animate-pulse">❤️</span>
                <span>{t('footerIn')} 🇦🇹</span>
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
