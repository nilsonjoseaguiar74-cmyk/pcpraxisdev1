import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_method: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    email: string;
  };
}

export const OrderManager = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Fetch profiles separately
      if (data) {
        const userIds = [...new Set(data.map(order => order.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', userIds);
        
        const profilesMap = new Map(
          profilesData?.map(p => [p.id, p]) || []
        );
        
        const ordersWithProfiles = data.map(order => ({
          ...order,
          profiles: profilesMap.get(order.user_id) || { full_name: null, email: '' }
        }));
        
        setOrders(ordersWithProfiles as Order[]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(t('checkoutError'));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      toast.success(t('adminOrderUpdated'));
      fetchOrders();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error(error.message || t('adminOrderUpdateError'));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('adminOrderStatusPending');
      case 'processing':
        return t('adminOrderStatusProcessing');
      case 'completed':
        return t('adminOrderStatusCompleted');
      case 'cancelled':
        return t('adminOrderStatusCancelled');
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="text-center py-8">{t('adminLoadingOrders')}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('adminOrders')}</CardTitle>
        <CardDescription>{t('adminOrdersDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('adminCustomer')}</TableHead>
                <TableHead>{t('adminEmail')}</TableHead>
                <TableHead>{t('adminTotalAmount')}</TableHead>
                <TableHead>{t('adminStatus')}</TableHead>
                <TableHead>{t('adminDate')}</TableHead>
                <TableHead>{t('adminChangeStatus')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    {t('adminNoOrders')}
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.profiles?.full_name || 'N/A'}
                    </TableCell>
                    <TableCell>{order.profiles?.email}</TableCell>
                    <TableCell>€{order.total_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString('pt-PT')}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">{t('adminOrderStatusPending')}</SelectItem>
                          <SelectItem value="processing">{t('adminOrderStatusProcessing')}</SelectItem>
                          <SelectItem value="completed">{t('adminOrderStatusCompleted')}</SelectItem>
                          <SelectItem value="cancelled">{t('adminOrderStatusCancelled')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
