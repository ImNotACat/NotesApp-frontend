// src/types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
        }
      }
      // add more tables here
    }
  }
}
