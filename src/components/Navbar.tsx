import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [{
    label: t('services'),
    href: "#services"
  }, {
    label: t('configurator'),
    href: "#configurator"
  }, {
    label: t('contact'),
    href: "#contact"
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border transition-all">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <img 
              alt="PC Praxis Logo" 
              className="h-10 md:h-14 w-auto object-contain transition-all duration-300" 
              src={theme === 'white' 
                ? "/lovable-uploads/logo-black.svg" 
                : "/lovable-uploads/logo-white.svg"
              }
            />
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {menuItems.map(item => <a key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:scale-105">
                {item.label}
              </a>)}
            <ThemeSwitcher />
            <Button variant="hero" size="sm" className="hover:scale-105 transition-transform">
              {t('configurePC')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-card transition-all hover:scale-105" aria-label="Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && <div className="md:hidden py-6 space-y-4 border-t border-border animate-slide-up">
            {menuItems.map(item => <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                {item.label}
              </a>)}
            <div className="flex items-center justify-center gap-4 pt-2">
              <ThemeSwitcher />
            </div>
            <Button variant="hero" size="sm" className="w-full">
              {t('configurePC')}
            </Button>
          </div>}
      </div>
    </nav>;
};