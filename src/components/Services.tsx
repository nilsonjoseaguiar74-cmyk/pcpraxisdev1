import { Card } from "@/components/ui/card";
import { Monitor, Cpu, Wrench, ShoppingCart, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Monitor,
      title: t('servicePcConfigurator'),
      description: t('servicePcConfiguratorDesc'),
      features: [
        t('serviceFeatureGamingPCs'),
        t('serviceFeatureWorkstations'),
        t('serviceFeatureOfficePCs'),
        t('serviceFeatureCustomBuilds')
      ],
    },
    {
      icon: ShoppingCart,
      title: t('serviceHardwareShop'),
      description: t('serviceHardwareShopDesc'),
      features: [
        t('serviceFeatureLatestHardware'),
        t('serviceFeatureFairPrices'),
        t('serviceFeatureExpressDelivery'),
        t('serviceFeatureWarranty')
      ],
    },
    {
      icon: Wrench,
      title: t('serviceServiceMaintenance'),
      description: t('serviceServiceMaintenanceDesc'),
      features: [
        t('serviceFeatureRepairService'),
        t('serviceFeatureUpgrades'),
        t('serviceFeatureCleaning'),
        t('serviceFeatureDiagnostics')
      ],
    },
  ];
  return (
    <section className="py-12 md:py-16 lg:py-20 relative" id="services">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12 space-y-4">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-primary/50 to-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              {t('privatBusiness')}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent via-primary/50 to-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold leading-tight">
            {t('servicesTitle').split(' ')[0]} <span className="text-primary">{t('servicesTitle').split(' ')[1]}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground px-4">
            {t('servicesAllInOne')}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative p-6 md:p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-tech opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-6">
                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                  <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-tech font-semibold">{service.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all">
                  {t('serviceLearnMore')}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Features row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 p-4 md:p-5 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300 cursor-pointer group">
            <Zap className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-medium">{t('serviceFastDelivery')}</span>
          </div>
          <div className="flex items-center gap-3 p-4 md:p-5 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300 cursor-pointer group">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-medium">{t('serviceGDPRCompliant')}</span>
          </div>
          <div className="flex items-center gap-3 p-4 md:p-5 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300 cursor-pointer group sm:col-span-2 lg:col-span-1">
            <Cpu className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-medium">{t('servicePremiumComponents')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
