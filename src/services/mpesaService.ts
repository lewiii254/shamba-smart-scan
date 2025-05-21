
import { supabase } from "@/integrations/supabase/client";
import { queryMpesaTransaction, queryUserSubscription } from "./mpesaHelper";

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
    
    // Query the database using our helper function
    const transactionData = await queryMpesaTransaction(checkoutRequestId);
    
    if (!transactionData) {
      return {
        success: false,
        message: "Payment not found"
      };
    }
    
    // Safely check if the status property exists and is "COMPLETED"
    const isCompleted = transactionData && 
                        transactionData.status && 
                        transactionData.status === 'COMPLETED';
    
    return {
      success: isCompleted,
      message: isCompleted ? "Payment completed successfully" : "Payment is still processing",
      transactionId: transactionData.transaction_id
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
    
    // Use our helper function to query subscriptions
    const subscriptionData = await queryUserSubscription(user.id);
    
    return subscriptionData;
  } catch (error) {
    console.error("Error getting subscription status:", error);
    return null;
  }
};
