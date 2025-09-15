
import { supabase } from "@/integrations/supabase/client";

interface MpesaTransaction {
  status: string;
  transaction_id: string;
}

interface SupabaseRpcResponse<T> {
  data: T | null;
  error: unknown;
}

interface UserSubscriptionData {
  id: string;
  plan_id: string;
  status: string;
  expires_at: string;
  created_at: string;
}

/**
 * Helper function to directly query tables that might not be in TypeScript types
 */
export const queryMpesaTransaction = async (checkoutRequestId: string) => {
  try {
    // Use a type casting for both the function and its parameters to bypass TypeScript checking
    const { data, error } = await (supabase.rpc as (name: string, params: Record<string, unknown>) => Promise<SupabaseRpcResponse<MpesaTransaction>>)('get_mpesa_transaction', {
      p_checkout_request_id: checkoutRequestId
    });
    
    if (error) {
      console.error("Error querying mpesa_transactions:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error in queryMpesaTransaction:", error);
    return null;
  }
};

/**
 * Helper function to directly query user subscriptions
 */
export const queryUserSubscription = async (userId: string) => {
  try {
    // Use a type casting for both the function and its parameters to bypass TypeScript checking
    const { data, error } = await (supabase.rpc as (name: string, params: Record<string, unknown>) => Promise<SupabaseRpcResponse<UserSubscriptionData>>)('get_user_subscription', {
      p_user_id: userId
    });
    
    if (error) {
      console.error("Error querying user_subscriptions:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error in queryUserSubscription:", error);
    return null;
  }
};
