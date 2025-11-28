import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
  part_number: string;
  availableStock: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + (item.quantity || 1);
        
        if (newQuantity > item.availableStock) {
          toast({
            title: 'Estoque insuficiente',
            description: `Apenas ${item.availableStock} unidades disponíveis`,
            variant: 'destructive',
          });
          return prev;
        }
        
        toast({
          title: 'Quantidade atualizada',
          description: `${item.name} - ${newQuantity} unidades`,
        });
        
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
      }
      
      const quantityToAdd = item.quantity || 1;
      
      if (quantityToAdd > item.availableStock) {
        toast({
          title: 'Estoque insuficiente',
          description: `Apenas ${item.availableStock} unidades disponíveis`,
          variant: 'destructive',
        });
        return prev;
      }
      
      toast({
        title: 'Adicionado ao carrinho',
        description: item.name,
      });
      
      return [...prev, { ...item, quantity: quantityToAdd }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: 'Item removido',
      description: 'Item removido do carrinho',
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (quantity > item.availableStock) {
            toast({
              title: 'Estoque insuficiente',
              description: `Apenas ${item.availableStock} unidades disponíveis`,
              variant: 'destructive',
            });
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
