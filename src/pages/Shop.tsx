import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  part_number: string;
  category: string | null;
  image_url: string | null;
  specifications: any;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
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
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('shopTitle')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('shopSubtitle')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                {product.image_url && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      {product.category && (
                        <Badge variant="secondary" className="shrink-0">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                    
                    {product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    
                    <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                      {product.quantity > 0 ? t('shopInStock') : t('shopOutOfStock')}
                    </Badge>
                  </div>

                  <Button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full"
                    variant="outline"
                  >
                    {t('shopViewDetails')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Keine Produkte verfügbar</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              {selectedProduct.image_url && (
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">{t('adminDescription')}</h3>
                  <p className="text-muted-foreground">
                    {selectedProduct.description || 'Keine Beschreibung verfügbar'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">{t('shopPrice')}</h4>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(selectedProduct.price)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">{t('shopQuantity')}</h4>
                    <p className="text-xl">
                      {selectedProduct.quantity} {selectedProduct.quantity > 0 ? t('shopInStock') : t('shopOutOfStock')}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">{t('shopPartNumber')}</h4>
                  <p className="font-mono text-sm">{selectedProduct.part_number}</p>
                </div>

                {selectedProduct.category && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">{t('shopCategory')}</h4>
                    <Badge>{selectedProduct.category}</Badge>
                  </div>
                )}

                {selectedProduct.specifications && (
                  <div>
                    <h4 className="font-semibold mb-2">{t('shopSpecifications')}</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(selectedProduct.specifications, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setSelectedProduct(null)}
                className="w-full"
              >
                {t('shopCloseDetails')}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
