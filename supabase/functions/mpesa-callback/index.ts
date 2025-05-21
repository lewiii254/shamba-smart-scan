
// This Edge Function handles M-Pesa callback notifications
// It would be registered with Safaricom as the callback URL

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
    
    // In a production implementation, this would process the callback data
    // from M-Pesa including validation and updating the transaction status
    
    // For demonstration purposes, assume a successful callback
    
    // 1. Update transaction status in database
    /* 
    const { data, error } = await supabase
      .from("mpesa_transactions")
      .update({ 
        status: "COMPLETED",
        transaction_id: callbackData.TransID,
        transaction_time: new Date().toISOString(),
        raw_response: callbackData
      })
      .eq("checkout_request_id", callbackData.CheckoutRequestID);
    
    if (error) throw error;
    */
    
    // 2. Update user subscription based on the payment
    /*
    // Find the transaction
    const { data: txnData, error: txnError } = await supabase
      .from("mpesa_transactions")
      .select("account_reference, amount, user_id")
      .eq("checkout_request_id", callbackData.CheckoutRequestID)
      .single();
    
    if (txnError) throw txnError;
    
    // Parse the plan from account reference (e.g., "AI-CROP-MONTHLY")
    const planRef = txnData.account_reference.split("-").pop().toLowerCase();
    
    // Determine subscription end date based on plan
    let endDate = new Date();
    if (planRef === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (planRef === "annual") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    // Update user subscription
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
        payment_reference: callbackData.TransID
      });
    
    if (subError) throw subError;
    */
    
    // Return success response to M-Pesa
    return new Response(
      JSON.stringify({ 
        ResultCode: 0,
        ResultDesc: "Success" 
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
