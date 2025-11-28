import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, LogIn, LogOut, User, ShoppingCart } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleMenuClick = (href: string) => {
    if (href.startsWith('#')) {
      // Smooth scroll for anchor links
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate for routes
      navigate(href);
    }
    setIsOpen(false);
  };
  
  const menuItems = [{
    label: t('services'),
    href: "#services"
  }, {
    label: t('configurator'),
    href: "#configurator"
  }, {
    label: t('shop'),
    href: "/shop"
  }, {
    label: t('contact'),
    href: "#contact"
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border transition-all">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <img 
              alt="PC Praxis Logo" 
              className="h-10 md:h-14 w-auto object-contain transition-all duration-300" 
              src={theme === 'white' 
                ? "/lovable-uploads/logo-black.svg" 
                : "/lovable-uploads/logo-white.svg"
              }
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {menuItems.map(item => (
              <button 
                key={item.label} 
                onClick={() => handleMenuClick(item.href)} 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:scale-105"
              >
                {item.label}
              </button>
            ))}
            
            {totalItems > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/checkout')}
                className="relative hover:scale-105 transition-transform"
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse">
                  {totalItems}
                </Badge>
              </Button>
            )}
            
            <ThemeSwitcher />
            {isAdmin && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/sistema')}
                className="hover:scale-105 transition-transform"
              >
                {t('adminPanel')}
              </Button>
            )}
            <Button variant="hero" size="sm" className="hover:scale-105 transition-transform">
              {t('configurePC')}
            </Button>
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => signOut()}
                className="hover:scale-105 transition-transform"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('logout')}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/auth')}
                className="hover:scale-105 transition-transform"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {t('login')}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-card transition-all hover:scale-105" aria-label="Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && <div className="md:hidden py-6 space-y-4 border-t border-border animate-slide-up">
            {menuItems.map(item => (
              <button 
                key={item.label} 
                onClick={() => handleMenuClick(item.href)} 
                className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            
            {totalItems > 0 && (
              <Button
                variant="ghost"
                onClick={() => {
                  navigate('/checkout');
                  setIsOpen(false);
                }}
                className="w-full justify-center relative"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('shopCart')}
                <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse">
                  {totalItems}
                </Badge>
              </Button>
            )}
            
            <div className="flex items-center justify-center gap-4 pt-2">
              <ThemeSwitcher />
            </div>
            {isAdmin && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  navigate('/sistema');
                  setIsOpen(false);
                }}
              >
                {t('adminPanel')}
              </Button>
            )}
            <Button variant="hero" size="sm" className="w-full">
              {t('configurePC')}
            </Button>
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('logout')}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  navigate('/auth');
                  setIsOpen(false);
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {t('login')}
              </Button>
            )}
          </div>}
      </div>
    </nav>;
};