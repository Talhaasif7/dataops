export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      data_sources: {
        Row: {
          id: string
          name: string
          type: string
          status: string
          last_sync: string | null
          credentials: Json | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          status?: string
          last_sync?: string | null
          credentials?: Json | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          status?: string
          last_sync?: string | null
          credentials?: Json | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      pipelines: {
        Row: {
          id: string
          name: string
          description: string | null
          status: string
          last_run: string | null
          next_run: string | null
          steps: Json
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: string
          last_run?: string | null
          next_run?: string | null
          steps?: Json
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: string
          last_run?: string | null
          next_run?: string | null
          steps?: Json
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      pipeline_data_sources: {
        Row: {
          pipeline_id: string
          data_source_id: string
        }
        Insert: {
          pipeline_id: string
          data_source_id: string
        }
        Update: {
          pipeline_id?: string
          data_source_id?: string
        }
      }
      dashboards: {
        Row: {
          id: string
          name: string
          description: string | null
          charts: Json
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          charts?: Json
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          charts?: Json
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      pipeline_runs: {
        Row: {
          id: string
          pipeline_id: string
          status: string
          started_at: string
          completed_at: string | null
          logs: string | null
          metrics: Json
        }
        Insert: {
          id?: string
          pipeline_id: string
          status: string
          started_at?: string
          completed_at?: string | null
          logs?: string | null
          metrics?: Json
        }
        Update: {
          id?: string
          pipeline_id?: string
          status?: string
          started_at?: string
          completed_at?: string | null
          logs?: string | null
          metrics?: Json
        }
      }
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type InsertTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type UpdateTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
