
// This is an Edge Function that would integrate with M-Pesa's API
// Follow Safaricom's API documentation for full implementation details
// https://developer.safaricom.co.ke/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("M-Pesa STK Push Function Loaded");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  
  try {
    // Create a Supabase client with the auth context of the function
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get request body
    const { phoneNumber, amount, accountReference, transactionDesc } = await req.json();
    
    // Validate required fields
    if (!phoneNumber || !amount) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Phone number and amount are required" 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" }, 
          status: 400 
        }
      );
    }
    
    console.log(`Processing M-Pesa payment for ${phoneNumber}, amount: ${amount}`);
    
    // In a real implementation, you would:
    // 1. Generate access token from M-Pesa API
    // 2. Make STK Push request to M-Pesa
    // 3. Store transaction in database for tracking
    // 4. Return response to client
    
    // For demonstration purposes, simulate a successful M-Pesa API response
    const mpesaResponse = {
      success: true,
      message: "Payment request sent successfully",
      transactionId: `M-${Date.now()}`,
      checkoutRequestId: `CRQ-${Math.floor(Math.random() * 1000000)}`
    };
    
    // Store transaction in database
    const { data, error } = await supabase
      .from("mpesa_transactions")
      .insert({
        phone_number: phoneNumber,
        amount: amount,
        account_reference: accountReference,
        description: transactionDesc,
        checkout_request_id: mpesaResponse.checkoutRequestId,
        status: "PENDING"
      });
    
    if (error) throw error;
    
    return new Response(
      JSON.stringify(mpesaResponse),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing M-Pesa payment:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to process payment request" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 500 
      }
    );
  }
});
