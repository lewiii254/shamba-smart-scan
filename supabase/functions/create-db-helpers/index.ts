
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Creating DB helper functions");

serve(async (req) => {
  try {
    // Create a Supabase client with the auth context of the function
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create the database tables if they don't exist
    const { error: tablesError } = await supabase.rpc('create_mpesa_tables');
    if (tablesError) throw tablesError;
    
    // Create the transaction query function
    const { error: mpesaTxFuncError } = await supabase.rpc('create_mpesa_transaction_function');
    if (mpesaTxFuncError) throw mpesaTxFuncError;
    
    // Create the subscription query function
    const { error: subFuncError } = await supabase.rpc('create_user_subscription_function');
    if (subFuncError) throw subFuncError;
    
    // Create the RPC functions for our TypeScript-safe queries
    const createMpesaRPC = await supabase.rpc('create_get_mpesa_transaction_rpc');
    const createSubRPC = await supabase.rpc('create_get_user_subscription_rpc');
    
    if (createMpesaRPC.error) throw createMpesaRPC.error;
    if (createSubRPC.error) throw createSubRPC.error;
    
    return new Response(JSON.stringify({
      success: true,
      message: "Database helper functions created successfully"
    }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error creating DB helper functions:", error);
    
    return new Response(JSON.stringify({
      success: false,
      message: "Error creating DB helper functions",
      error: error.message
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
});
