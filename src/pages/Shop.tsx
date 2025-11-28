import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Loader2, ShoppingCart, Plus, Minus, Search, Filter, X } from 'lucide-react';

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
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedStockFilter, setSelectedStockFilter] = useState<string>('all');
  const { t } = useLanguage();
  const { toast } = useToast();
  const { addItem, totalItems } = useCart();
  const navigate = useNavigate();

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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.part_number.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (selectedPriceRange !== 'all') {
        const price = product.price;
        if (selectedPriceRange === 'under100' && price >= 100) return false;
        if (selectedPriceRange === '100to500' && (price < 100 || price >= 500)) return false;
        if (selectedPriceRange === '500to1000' && (price < 500 || price >= 1000)) return false;
        if (selectedPriceRange === 'over1000' && price < 1000) return false;
      }

      // Stock filter
      if (selectedStockFilter !== 'all') {
        if (selectedStockFilter === 'instock' && product.quantity === 0) return false;
        if (selectedStockFilter === 'outofstock' && product.quantity > 0) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedPriceRange, selectedStockFilter]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || 
                          selectedPriceRange !== 'all' || selectedStockFilter !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedStockFilter('all');
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      part_number: product.part_number,
      availableStock: product.quantity,
      quantity: selectedQuantity,
    });
    setSelectedProduct(null);
    setSelectedQuantity(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1 space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('shopTitle')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('shopSubtitle')}
            </p>
          </div>
          
          <Button
            onClick={() => navigate('/checkout')}
            className="relative"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {t('shopCart')}
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filters Section */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('shopFiltersTitle')}</h2>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  {t('shopClearFilters')}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('shopSearchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t('shopFilterByCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('shopAllCategories')}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category || ''}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('shopFilterByPrice')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('shopAllPrices')}</SelectItem>
                  <SelectItem value="under100">{t('shopPriceUnder100')}</SelectItem>
                  <SelectItem value="100to500">{t('shopPrice100to500')}</SelectItem>
                  <SelectItem value="500to1000">{t('shopPrice500to1000')}</SelectItem>
                  <SelectItem value="over1000">{t('shopPriceOver1000')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Stock Filter */}
              <Select value={selectedStockFilter} onValueChange={setSelectedStockFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('shopFilterByStock')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('shopAllStock')}</SelectItem>
                  <SelectItem value="instock">{t('shopInStockOnly')}</SelectItem>
                  <SelectItem value="outofstock">{t('shopOutOfStockOnly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} {t('shopProductsFound')}
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">
              {hasActiveFilters ? t('shopNoResults') : t('shopNoProducts')}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                {t('shopClearFilters')}
              </Button>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => {
        setSelectedProduct(null);
        setSelectedQuantity(1);
      }}>
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
                    {selectedProduct.description || t('shopNoDescription')}
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

              {selectedProduct.quantity > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="text-base font-semibold">{t('shopQuantity')}:</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        max={selectedProduct.quantity}
                        value={selectedQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setSelectedQuantity(Math.min(selectedProduct.quantity, Math.max(1, val)));
                        }}
                        className="w-20 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedQuantity(Math.min(selectedProduct.quantity, selectedQuantity + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({t('shopMaxQuantity')}: {selectedProduct.quantity})
                    </span>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="w-full"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {t('shopAddToCart')}
                  </Button>
                </div>
              ) : (
                <Button disabled className="w-full" size="lg">
                  {t('shopOutOfStock')}
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
