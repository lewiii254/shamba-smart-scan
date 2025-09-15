
import { supabase } from "@/integrations/supabase/client";
import { queryMpesaTransaction, queryUserSubscription } from "./mpesaHelper";
import { testSupabaseConnection } from "./mockDataService";

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

// Mock M-Pesa service for demo mode
const mockMpesaService = {
  initiateMpesaPayment: async (paymentRequest: MpesaPaymentRequest): Promise<MpesaPaymentResponse> => {
    console.log("🎭 Mock M-Pesa payment initiated:", paymentRequest);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock checkout request ID
    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store mock transaction in localStorage
    const mockTransaction = {
      checkout_request_id: checkoutRequestId,
      phone_number: paymentRequest.phoneNumber,
      amount: paymentRequest.amount,
      status: 'PENDING',
      created_at: new Date().toISOString(),
      user_id: 'mock-user-1'
    };
    
    localStorage.setItem(`mpesa_transaction_${checkoutRequestId}`, JSON.stringify(mockTransaction));
    
    // Simulate successful payment after 5 seconds
    setTimeout(() => {
      const completedTransaction = {
        ...mockTransaction,
        status: 'COMPLETED',
        transaction_id: `MP${Date.now()}`,
        completed_at: new Date().toISOString()
      };
      localStorage.setItem(`mpesa_transaction_${checkoutRequestId}`, JSON.stringify(completedTransaction));
      console.log("🎭 Mock M-Pesa payment completed:", completedTransaction);
    }, 5000);
    
    return {
      success: true,
      message: "Payment initiated successfully (Demo Mode)",
      checkoutRequestId: checkoutRequestId
    };
  },

  checkMpesaPaymentStatus: async (checkoutRequestId: string): Promise<MpesaPaymentResponse> => {
    console.log("🎭 Mock M-Pesa status check for:", checkoutRequestId);
    
    const transactionData = localStorage.getItem(`mpesa_transaction_${checkoutRequestId}`);
    
    if (!transactionData) {
      return {
        success: false,
        message: "Payment not found"
      };
    }
    
    try {
      const transaction = JSON.parse(transactionData);
      const isCompleted = transaction.status === 'COMPLETED';
      
      return {
        success: isCompleted,
        message: isCompleted ? "Payment completed successfully (Demo Mode)" : "Payment is still processing...",
        transactionId: transaction.transaction_id
      };
    } catch (error) {
      return {
        success: false,
        message: "Error parsing transaction data"
      };
    }
  }
};

/**
 * Initiates an M-Pesa STK Push payment
 * This function calls a Supabase Edge Function that handles the M-Pesa API integration
 */
export const initiateMpesaPayment = async (
  paymentRequest: MpesaPaymentRequest
): Promise<MpesaPaymentResponse> => {
  try {
    console.log("Initiating M-Pesa payment:", paymentRequest);
    
    // Check if Supabase is available
    const supabaseAvailable = await testSupabaseConnection();
    
    if (!supabaseAvailable) {
      console.log("🎭 Using mock M-Pesa service (Supabase unavailable)");
      return await mockMpesaService.initiateMpesaPayment(paymentRequest);
    }
    
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
    
    // Fallback to mock service on error
    console.log("🎭 Falling back to mock M-Pesa service");
    return await mockMpesaService.initiateMpesaPayment(paymentRequest);
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
    
    // Check if Supabase is available
    const supabaseAvailable = await testSupabaseConnection();
    
    if (!supabaseAvailable) {
      console.log("🎭 Using mock M-Pesa status check (Supabase unavailable)");
      return await mockMpesaService.checkMpesaPaymentStatus(checkoutRequestId);
    }
    
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
    
    // Fallback to mock service on error
    console.log("🎭 Falling back to mock M-Pesa status check");
    return await mockMpesaService.checkMpesaPaymentStatus(checkoutRequestId);
  }
};

/**
 * Retrieves subscription status for the current user
 */
export const getUserSubscriptionStatus = async () => {
  try {
    // Check if Supabase is available
    const supabaseAvailable = await testSupabaseConnection();
    
    if (!supabaseAvailable) {
      console.log("🎭 Using mock subscription data (Supabase unavailable)");
      
      // Check for mock subscription data in localStorage
      const mockSubscription = localStorage.getItem('mock_user_subscription');
      if (mockSubscription) {
        try {
          return JSON.parse(mockSubscription);
        } catch (e) {
          console.error("Error parsing mock subscription:", e);
        }
      }
      return null;
    }
    
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
