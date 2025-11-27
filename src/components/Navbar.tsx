import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import logo from "@/assets/logo-pc-praxis.jpg";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [{
    label: "Services",
    href: "#services"
  }, {
    label: "Konfigurator",
    href: "#configurator"
  }, {
    label: "Kontakt",
    href: "#contact"
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              alt="PC Praxis Logo" 
              className="h-10 w-auto object-contain logo-themed transition-all duration-300" 
              src="/lovable-uploads/logo-pc-praxis-novo.svg"
            />
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            {menuItems.map(item => <a key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </a>)}
            <ThemeSwitcher />
            <Button variant="hero" size="sm">
              PC konfigurieren
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-card transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && <div className="md:hidden py-4 space-y-4 border-t border-border animate-slide-up">
            {menuItems.map(item => <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </a>)}
            <div className="flex items-center justify-center">
              <ThemeSwitcher />
            </div>
            <Button variant="hero" size="sm" className="w-full">
              PC konfigurieren
            </Button>
          </div>}
      </div>
    </nav>;
};