-- Protect sensitive order data by limiting historical access for regular users
-- Drop existing user order viewing policy
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create new policy that limits regular users to recent orders (90 days)
-- This prevents compromised accounts from exposing all historical shipping addresses
CREATE POLICY "Users can view their recent orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  AND created_at >= NOW() - INTERVAL '90 days'
);

-- Admins can still view all orders
-- (policy already exists: "Admins can view all orders")

-- Create a security definer function for users to access older orders if needed
-- This can be called with additional authentication checks in the application
CREATE OR REPLACE FUNCTION public.get_user_order_summary(
  order_id UUID
)
RETURNS TABLE(
  id UUID,
  created_at TIMESTAMPTZ,
  total_amount NUMERIC,
  status TEXT,
  payment_method TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Return only summary data without sensitive shipping_address
  SELECT 
    o.id,
    o.created_at,
    o.total_amount,
    o.status,
    o.payment_method
  FROM orders o
  WHERE o.id = order_id
    AND o.user_id = auth.uid();
$$;

-- Add comment explaining the security approach
COMMENT ON POLICY "Users can view their recent orders" ON public.orders IS 
'Limits user access to orders from last 90 days to reduce exposure of historical shipping addresses in case of account compromise. Use get_user_order_summary() function for older order summaries without sensitive data.';