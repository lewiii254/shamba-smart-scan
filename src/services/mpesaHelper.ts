
import { supabase } from "@/integrations/supabase/client";

/**
 * Helper function to directly query tables that might not be in TypeScript types
 */
export const queryMpesaTransaction = async (checkoutRequestId: string) => {
  try {
    // Use a raw query to bypass TypeScript checking
    const { data, error } = await supabase.rpc('get_mpesa_transaction', {
      p_checkout_request_id: checkoutRequestId
    }) as { 
      data: { status: string; transaction_id: string } | null; 
      error: any 
    };
    
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
    // Use a raw query to bypass TypeScript checking
    const { data, error } = await supabase.rpc('get_user_subscription', {
      p_user_id: userId
    }) as { 
      data: any; 
      error: any 
    };
    
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
