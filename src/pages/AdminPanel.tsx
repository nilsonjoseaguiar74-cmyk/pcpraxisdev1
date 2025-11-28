import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductManager } from '@/components/admin/ProductManager';
import { OrderManager } from '@/components/admin/OrderManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdmin();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Painel Administrativo</CardTitle>
            <CardDescription>Gestão de produtos, pedidos e inventário</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
