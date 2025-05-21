
import { supabase } from "@/integrations/supabase/client";

/**
 * Helper function to directly query tables that might not be in TypeScript types
 */
export const queryMpesaTransaction = async (checkoutRequestId: string) => {
  // This uses a raw query to bypass TypeScript checking
  const { data, error } = await supabase.from('mpesa_transactions')
    .select('status, transaction_id')
    .eq('checkout_request_id', checkoutRequestId)
    .single();
  
  if (error) {
    console.error("Error querying mpesa_transactions:", error);
    return null;
  }
  
  return data;
};

/**
 * Helper function to directly query user subscriptions
 */
export const queryUserSubscription = async (userId: string) => {
  // This uses a raw query to bypass TypeScript checking
  const { data, error } = await supabase.from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    console.error("Error querying user_subscriptions:", error);
    return null;
  }
  
  return data;
};
