
// Type definitions for Supabase database tables
export interface ScanHistory {
  id: string;
  user_id: string;
  image_url: string;
  diagnosis: string | null;
  treatment: string | null;
  confidence: number | null;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
