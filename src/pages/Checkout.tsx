import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShoppingCart, CreditCard, Wallet, Bitcoin, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Austria',
    phone: '',
  });
  const [notes, setNotes] = useState('');

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-24 flex items-center justify-center">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <CardTitle>{t('checkoutEmptyCart')}</CardTitle>
              <CardDescription>
                {t('checkoutEmptyDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/shop')} className="w-full">
                {t('checkoutGoToShop')}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shippingData.fullName || !shippingData.address || !shippingData.city || !shippingData.postalCode) {
      toast({
        title: t('checkoutError'),
        description: t('checkoutErrorFields'),
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalPrice,
          status: 'pending',
          payment_method: paymentMethod,
          shipping_address: shippingData,
          notes: notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: t('checkoutSuccess'),
        description: `${t('checkoutSuccessDescription')} ${order.id.slice(0, 8)}`,
      });

      clearCart();
      navigate('/');
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: t('checkoutError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('checkoutBackToShop')}
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('checkoutShippingInfo')}</CardTitle>
                <CardDescription>
                  {t('checkoutShippingDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="fullName">{t('checkoutFullName')} *</Label>
                      <Input
                        id="fullName"
                        value={shippingData.fullName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, fullName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">{t('checkoutAddress')} *</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">{t('checkoutCity')} *</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, city: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">{t('checkoutPostalCode')} *</Label>
                      <Input
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, postalCode: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">{t('checkoutCountry')} *</Label>
                      <Input
                        id="country"
                        value={shippingData.country}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, country: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('checkoutPhone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{t('checkoutNotes')}</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder={t('checkoutNotesPlaceholder')}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('checkoutPaymentMethod')}</CardTitle>
                <CardDescription>
                  {t('checkoutPaymentDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      {t('checkoutCreditCard')}
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5" />
                      {t('checkoutBankTransfer')}
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Bitcoin className="h-5 w-5" />
                      {t('checkoutCrypto')}
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{t('checkoutOrderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.quantity}x {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('checkoutSubtotal')}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('cartShipping')}</span>
                    <span className="text-green-600">{t('checkoutShippingFree')}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{t('checkoutTotal')}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? t('checkoutProcessing') : t('checkoutComplete')}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t('checkoutTerms')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
