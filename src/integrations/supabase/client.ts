// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bswtctukvtnigbqmccpg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzd3RjdHVrdnRuaWdicW1jY3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNTAwMjYsImV4cCI6MjA1OTYyNjAyNn0.jbE1gxEKNHmOKN1JI9xUlHMcwaGjgGcSRfsAE7TKDd0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);