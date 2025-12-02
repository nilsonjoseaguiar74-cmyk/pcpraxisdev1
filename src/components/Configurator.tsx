import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Zap, Fan, Monitor, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Configurator = () => {
  const { t } = useLanguage();

  const configuratorCategories = [
    { icon: Cpu, label: t('configuratorProcessor'), count: "50+", color: "primary" },
    { icon: HardDrive, label: t('configuratorGraphicsCard'), count: "80+", color: "tech-secondary" },
    { icon: Zap, label: t('configuratorRAM'), count: "40+", color: "primary" },
    { icon: Fan, label: t('configuratorCooling'), count: "30+", color: "tech-secondary" },
    { icon: Monitor, label: t('configuratorCase'), count: "60+", color: "primary" },
    { icon: Package, label: t('configuratorPowerSupply'), count: "35+", color: "tech-secondary" },
  ];
  return (
    <section className="py-12 md:py-16 lg:py-20 relative bg-gradient-to-b from-background to-card/30" id="configurator">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">{t('configuratorTitle')}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold leading-tight px-4">
            {t('configuratorBuildDreamPC').split(' ')[0]} <span className="text-primary">{t('configuratorBuildDreamPC').split(' ').slice(2).join(' ')}</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground px-4">
            {t('configuratorDescription')}
          </p>
        </div>

        {/* Configurator preview */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 sm:p-8 md:p-12 bg-gradient-card border-primary/20 shadow-glow">
            {/* Components grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {configuratorCategories.map((category, index) => (
                <div
                  key={index}
                  className="group p-4 md:p-6 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-glow hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary px-2 py-0.5 md:py-1 rounded-full bg-primary/10">
                      {category.count}
                    </span>
                  </div>
                  
                  <h3 className="font-tech text-base md:text-lg font-semibold mb-1">
                    {category.label}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('configuratorChooseFrom')}
                  </p>
                </div>
              ))}
            </div>

            {/* Example build */}
            <div className="border-t border-border pt-6 md:pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-tech text-lg md:text-xl font-semibold mb-1">
                    {t('configuratorExampleBuild')}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('configuratorExampleDesc')}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl md:text-3xl font-tech font-bold text-primary">
                    €2.499
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {t('configuratorIncludeVAT')}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button variant="hero" size="lg" className="flex-1 group hover:scale-[1.02] transition-transform">
                  {t('configuratorConfigureNow')}
                </Button>
                <Button variant="tech" size="lg" className="flex-1 group hover:scale-[1.02] transition-transform">
                  {t('configuratorViewExamples')}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-background/30 transition-colors group cursor-pointer">
                  <div className="text-xl md:text-2xl font-tech font-bold text-primary group-hover:scale-110 transition-transform">✓</div>
                  <div className="text-xs text-muted-foreground leading-tight">{t('configuratorCompatibilityCheck')}</div>
                </div>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-background/30 transition-colors group cursor-pointer">
                  <div className="text-xl md:text-2xl font-tech font-bold text-primary group-hover:scale-110 transition-transform">✓</div>
                  <div className="text-xs text-muted-foreground leading-tight">{t('configuratorYearsWarranty')}</div>
                </div>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-background/30 transition-colors group cursor-pointer">
                  <div className="text-xl md:text-2xl font-tech font-bold text-primary group-hover:scale-110 transition-transform">✓</div>
                  <div className="text-xs text-muted-foreground leading-tight">{t('configuratorExpressShipping')}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Protocol info */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {t('configuratorProtocolInfo')}
          </p>
        </div>
      </div>
    </section>
  );
};
