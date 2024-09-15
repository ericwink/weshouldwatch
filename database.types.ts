export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string
          created_at: string
          group_id: string
          id: number
          media_id: number
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          group_id: string
          id?: number
          media_id: number
          user_id?: string
        }
        Update: {
          comment?: string
          created_at?: string
          group_id?: string
          id?: number
          media_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["tmdb_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      delete_account: {
        Row: {
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delete_account_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      group: {
        Row: {
          created_at: string
          created_by: string
          group_name: string
          id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          group_name?: string
          id?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          group_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      group_media: {
        Row: {
          added_by: string
          added_reason: string | null
          created_at: string
          group_id: string
          id: number
          media_id: number
          watched: boolean
        }
        Insert: {
          added_by?: string
          added_reason?: string | null
          created_at?: string
          group_id: string
          id?: number
          media_id: number
          watched?: boolean
        }
        Update: {
          added_by?: string
          added_reason?: string | null
          created_at?: string
          group_id?: string
          id?: number
          media_id?: number
          watched?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "group_media_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "group_media_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["tmdb_id"]
          },
        ]
      }
      invite_user_to_group: {
        Row: {
          created_at: string | null
          created_by: string
          email: string
          group_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string
          email?: string
          group_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          email?: string
          group_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invite_user_to_group_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "invite_user_to_group_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          created_at: string
          genres: string[]
          media_type: string
          poster_path: string
          title: string
          tmdb_id: number
        }
        Insert: {
          created_at?: string
          genres: string[]
          media_type?: string
          poster_path?: string
          title?: string
          tmdb_id: number
        }
        Update: {
          created_at?: string
          genres?: string[]
          media_type?: string
          poster_path?: string
          title?: string
          tmdb_id?: number
        }
        Relationships: []
      }
      user_group_join: {
        Row: {
          created_at: string | null
          group_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          group_id: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          group_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_group_join_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_group_join_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_public_profile: {
        Row: {
          created_at: string
          profile_pic: string | null
          user_id: string
          user_name: string
        }
        Insert: {
          created_at?: string
          profile_pic?: string | null
          user_id: string
          user_name?: string
        }
        Update: {
          created_at?: string
          profile_pic?: string | null
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_public_profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          interval: string | null
          is_subscribed: boolean
          primary_created: string | null
          primary_created_update: string | null
          primary_joined: string | null
          primary_joined_update: string | null
          stripe_customer: string | null
        }
        Insert: {
          created_at?: string
          email?: string
          id: string
          interval?: string | null
          is_subscribed?: boolean
          primary_created?: string | null
          primary_created_update?: string | null
          primary_joined?: string | null
          primary_joined_update?: string | null
          stripe_customer?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interval?: string | null
          is_subscribed?: boolean
          primary_created?: string | null
          primary_created_update?: string | null
          primary_joined?: string | null
          primary_joined_update?: string | null
          stripe_customer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_primary_created_fkey"
            columns: ["primary_created"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_primary_joined_fkey"
            columns: ["primary_joined"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
