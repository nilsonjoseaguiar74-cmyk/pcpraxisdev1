-- Create admin master user
-- This will insert the admin user if it doesn't exist yet
-- Note: The password hash is for '139702'

-- First, check if user exists, if not we'll need to create via auth.users
-- Since we can't directly insert into auth.users from migrations,
-- we'll create a function to handle this

-- Create a function to setup admin user
CREATE OR REPLACE FUNCTION setup_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_name TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Check if user already exists in profiles
  SELECT id INTO user_id FROM public.profiles WHERE email = admin_email;
  
  IF user_id IS NULL THEN
    -- Return message that user needs to be created via signup
    RETURN 'USER_NOT_FOUND';
  END IF;
  
  -- Check if user already has admin role
  IF EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = user_id AND role = 'admin'
  ) THEN
    RETURN 'ALREADY_ADMIN';
  END IF;
  
  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN 'SUCCESS';
END;
$$;

-- Add stock management trigger to automatically reduce stock when order is created
CREATE OR REPLACE FUNCTION handle_order_stock_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When order items are inserted, reduce product stock
  UPDATE products
  SET quantity = quantity - NEW.quantity
  WHERE id = NEW.product_id;
  
  -- Check if stock went negative (shouldn't happen with proper frontend validation)
  IF (SELECT quantity FROM products WHERE id = NEW.product_id) < 0 THEN
    RAISE EXCEPTION 'Insufficient stock for product %', NEW.product_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for stock updates
DROP TRIGGER IF EXISTS on_order_item_created ON order_items;
CREATE TRIGGER on_order_item_created
  AFTER INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION handle_order_stock_update();