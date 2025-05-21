
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface MpesaPaymentRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

interface MpesaPaymentResponse {
  success: boolean;
  message?: string;
  transactionId?: string;
  checkoutRequestId?: string;
}

/**
 * Initiates an M-Pesa STK Push payment
 * This function calls a Supabase Edge Function that handles the M-Pesa API integration
 */
export const initiateMpesaPayment = async (
  paymentRequest: MpesaPaymentRequest
): Promise<MpesaPaymentResponse> => {
  try {
    console.log("Initiating M-Pesa payment:", paymentRequest);
    
    // Get the current user ID to associate with the payment
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    
    // Call the edge function
    const { data, error } = await supabase.functions.invoke('mpesa-stk-push', {
      body: {
        ...paymentRequest,
        userId
      }
    });
    
    if (error) throw error;
    
    console.log("M-Pesa payment initiated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error initiating M-Pesa payment:", error);
    return {
      success: false,
      message: "Failed to initiate payment. Please try again."
    };
  }
};

/**
 * Checks the status of an M-Pesa payment
 */
export const checkMpesaPaymentStatus = async (
  checkoutRequestId: string
): Promise<MpesaPaymentResponse> => {
  try {
    console.log("Checking payment status for:", checkoutRequestId);
    
    // Query the database directly for the payment status
    const { data, error } = await supabase
      .from('mpesa_transactions')
      .select('status, transaction_id')
      .eq('checkout_request_id', checkoutRequestId)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return {
        success: false,
        message: "Payment not found"
      };
    }
    
    const isCompleted = data.status === 'COMPLETED';
    
    return {
      success: isCompleted,
      message: isCompleted ? "Payment completed successfully" : "Payment is still processing",
      transactionId: data.transaction_id
    };
  } catch (error) {
    console.error("Error checking M-Pesa payment status:", error);
    return {
      success: false,
      message: "Failed to check payment status"
    };
  }
};

/**
 * Retrieves subscription status for the current user
 */
export const getUserSubscriptionStatus = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error getting subscription status:", error);
    return null;
  }
};
