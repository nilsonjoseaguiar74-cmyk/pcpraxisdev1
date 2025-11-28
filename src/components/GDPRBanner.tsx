import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const GDPRBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('gdpr-consent', 'rejected');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-5xl mx-auto bg-background/95 backdrop-blur-lg border-primary/20 shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl md:text-2xl font-tech font-bold mb-2">
                  {t('gdprTitle')}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t('gdprDescription')}
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-semibold text-foreground">{t('gdprDataProcessed')}</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>{t('gdprDataType1')}</li>
                  <li>{t('gdprDataType2')}</li>
                  <li>{t('gdprDataType3')}</li>
                  <li>{t('gdprDataType4')}</li>
                </ul>
              </div>

              <p className="text-xs text-muted-foreground">
                {t('gdprRights')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-initial"
                  size="lg"
                >
                  {t('gdprAccept')}
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                  size="lg"
                >
                  {t('gdprReject')}
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleReject}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
