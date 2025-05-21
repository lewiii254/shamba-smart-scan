
// This Edge Function integrates with M-Pesa's API to process mobile payments
// Implementation based on Safaricom's API documentation
// https://developer.safaricom.co.ke/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MPESA_CONSUMER_KEY = Deno.env.get("MPESA_CONSUMER_KEY") || "";
const MPESA_CONSUMER_SECRET = Deno.env.get("MPESA_CONSUMER_SECRET") || "";
const MPESA_PASSKEY = Deno.env.get("MPESA_PASSKEY") || "";
const MPESA_SHORTCODE = Deno.env.get("MPESA_SHORTCODE") || "174379"; // Default test shortcode
const CALLBACK_URL = Deno.env.get("MPESA_CALLBACK_URL") || "https://bswtctukvtnigbqmccpg.functions.supabase.co/mpesa-callback";

console.log("M-Pesa STK Push Function Initialized");

// Helper function to get M-Pesa access token
async function getMpesaAccessToken() {
  try {
    console.log("Getting M-Pesa access token...");
    
    // For actual implementation, uncomment the code below:
    /*
    const auth = btoa(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`);
    const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    
    const data = await response.json();
    return data.access_token;
    */
    
    // For demonstration, return a mock token
    console.log("Returning mock access token for demonstration");
    return "mock-access-token-for-demonstration";
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get access token");
  }
}

// Main function to process STK push
async function processSTKPush(phoneNumber, amount, accountReference, transactionDesc, accessToken) {
  try {
    console.log(`Processing STK push for ${phoneNumber}, amount: ${amount}`);
    
    // Generate timestamp in the format YYYYMMDDHHmmss
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    
    // Generate password by combining the shortcode, passkey, and timestamp
    // For actual implementation, uncomment the code below:
    /*
    const password = btoa(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`);
    
    // Prepare request body
    const requestBody = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount.toString(),
      PartyA: phoneNumber,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    };
    
    // Make API call to Safaricom
    const response = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    
    const responseData = await response.json();
    return responseData;
    */
    
    // For demonstration, return a mock response
    console.log("Returning mock STK push response for demonstration");
    return {
      MerchantRequestID: `M-${Date.now()}`,
      CheckoutRequestID: `CRQ-${Math.floor(Math.random() * 1000000)}`,
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing"
    };
    
  } catch (error) {
    console.error("Error processing STK push:", error);
    throw new Error("Failed to process payment");
  }
}

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
    const { phoneNumber, amount, accountReference, transactionDesc, userId } = await req.json();
    
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
    
    console.log(`Processing M-Pesa payment for ${phoneNumber}, amount: ${amount}, user: ${userId || 'anonymous'}`);
    
    // Get M-Pesa access token
    const accessToken = await getMpesaAccessToken();
    
    // Process STK push
    const mpesaResponse = await processSTKPush(
      phoneNumber, 
      amount, 
      accountReference || "AI-CROP-DOCTOR", 
      transactionDesc || "Subscription Payment", 
      accessToken
    );
    
    // Store transaction in database
    const { data, error } = await supabase
      .from("mpesa_transactions")
      .insert({
        phone_number: phoneNumber,
        amount: amount,
        account_reference: accountReference,
        description: transactionDesc,
        checkout_request_id: mpesaResponse.CheckoutRequestID,
        merchant_request_id: mpesaResponse.MerchantRequestID,
        user_id: userId,
        status: "PENDING"
      });
    
    if (error) {
      console.error("Error storing transaction:", error);
      throw error;
    }
    
    return new Response(
      JSON.stringify({
        success: true, 
        message: "Payment request sent successfully",
        transactionId: mpesaResponse.MerchantRequestID,
        checkoutRequestId: mpesaResponse.CheckoutRequestID
      }),
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
