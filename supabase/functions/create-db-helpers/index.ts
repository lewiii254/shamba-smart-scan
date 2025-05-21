
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Creating DB helper functions");

serve(async (req) => {
  try {
    // Create a Supabase client with the auth context of the function
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create the database tables and functions
    const { error: tablesError } = await supabase.rpc('create_mpesa_tables');
    if (tablesError) throw tablesError;
    
    const { error: funcError1 } = await supabase.rpc('create_mpesa_transaction_function');
    if (funcError1) throw funcError1;
    
    const { error: funcError2 } = await supabase.rpc('create_user_subscription_function');
    if (funcError2) throw funcError2;
    
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
