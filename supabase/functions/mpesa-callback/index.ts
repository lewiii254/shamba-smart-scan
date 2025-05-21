
// This Edge Function handles M-Pesa callback notifications
// It processes payment confirmations from M-Pesa and updates subscription statuses

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("M-Pesa Callback Function Loaded");

serve(async (req) => {
  try {
    // Create a Supabase client with the auth context of the function
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get callback data from M-Pesa
    const callbackData = await req.json();
    console.log("Received M-Pesa callback:", callbackData);
    
    // For an actual implementation, we would validate the callback data
    // and update the transaction status based on the callback data
    
    let resultCode = 0;
    let resultDesc = "Success";
    
    try {
      // Extract key information from the callback
      const {
        Body: {
          stkCallback: {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
          }
        }
      } = callbackData;
      
      // Only proceed if the transaction was successful
      if (ResultCode === 0) {
        // Extract payment details from the callback metadata
        let transactionId = "";
        let amount = 0;
        let phoneNumber = "";
        
        if (CallbackMetadata && CallbackMetadata.Item) {
          CallbackMetadata.Item.forEach((item) => {
            if (item.Name === "MpesaReceiptNumber") transactionId = item.Value;
            if (item.Name === "Amount") amount = item.Value;
            if (item.Name === "PhoneNumber") phoneNumber = item.Value.toString();
          });
        }
        
        // Update transaction status in database
        const { data: txnData, error: txnError } = await supabase
          .from("mpesa_transactions")
          .update({ 
            status: "COMPLETED",
            transaction_id: transactionId,
            transaction_time: new Date().toISOString()
          })
          .eq("checkout_request_id", CheckoutRequestID)
          .select("user_id, account_reference, amount")
          .single();
        
        if (txnError) throw txnError;
        
        if (txnData) {
          // Determine subscription details
          const planRef = txnData.account_reference.split("-").pop()?.toLowerCase() || "monthly";
          
          // Calculate expiry date based on plan
          let endDate = new Date();
          if (planRef.includes("annual")) {
            endDate.setFullYear(endDate.getFullYear() + 1);
          } else {
            endDate.setMonth(endDate.getMonth() + 1);
          }
          
          // Update or create user subscription
          const { data: subData, error: subError } = await supabase
            .from("user_subscriptions")
            .upsert({
              user_id: txnData.user_id,
              plan: planRef,
              amount_paid: txnData.amount,
              start_date: new Date().toISOString(),
              end_date: endDate.toISOString(),
              status: "active",
              payment_method: "mpesa",
              payment_reference: transactionId
            });
          
          if (subError) throw subError;
          
          console.log(`Subscription activated for user ${txnData.user_id}, plan: ${planRef}`);
        }
      } else {
        // Update transaction status as failed
        await supabase
          .from("mpesa_transactions")
          .update({ 
            status: "FAILED",
            failure_reason: ResultDesc
          })
          .eq("checkout_request_id", CheckoutRequestID);
        
        console.log(`Transaction failed: ${ResultDesc}`);
      }
    } catch (dbError) {
      console.error("Database error processing callback:", dbError);
      resultCode = 1;
      resultDesc = "Error processing payment data";
    }
    
    // Return response to M-Pesa
    return new Response(
      JSON.stringify({ 
        ResultCode: resultCode,
        ResultDesc: resultDesc
      }),
      { 
        headers: { "Content-Type": "application/json" }, 
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing M-Pesa callback:", error);
    
    // Return error response to M-Pesa
    return new Response(
      JSON.stringify({ 
        ResultCode: 1,
        ResultDesc: "Error processing callback" 
      }),
      { 
        headers: { "Content-Type": "application/json" }, 
        status: 500 
      }
    );
  }
});
