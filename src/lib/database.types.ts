export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string | null
          created_at: string | null
          group_id: number | null
          id: number
          media_id: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          group_id?: number | null
          id?: number
          media_id?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          group_id?: number | null
          id?: number
          media_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_media_id_fkey"
            columns: ["media_id"]
            referencedRelation: "media"
            referencedColumns: ["tmdb_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group: {
        Row: {
          created_at: string
          created_by: string
          group_name: string
          id: number
        }
        Insert: {
          created_at?: string
          created_by?: string
          group_name: string
          id?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          group_name?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "group_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group_media: {
        Row: {
          added_by: string
          added_reason: string
          created_at: string
          group_id: number
          id: number
          media_id: number
          watched: boolean
        }
        Insert: {
          added_by?: string
          added_reason: string
          created_at?: string
          group_id: number
          id?: number
          media_id: number
          watched?: boolean
        }
        Update: {
          added_by?: string
          added_reason?: string
          created_at?: string
          group_id?: number
          id?: number
          media_id?: number
          watched?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "group_media_added_by_fkey"
            columns: ["added_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_media_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_media_media_id_fkey"
            columns: ["media_id"]
            referencedRelation: "media"
            referencedColumns: ["tmdb_id"]
          }
        ]
      }
      invite_to_group: {
        Row: {
          created_at: string
          created_by: string
          email: string
          group_id: number
          id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          email: string
          group_id: number
          id?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          email?: string
          group_id?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invite_to_group_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invite_to_group_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          }
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
          media_type: string
          poster_path: string
          title: string
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
          group_id: number | null
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          group_id?: number | null
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          group_id?: number | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_group_join_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_group_join_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_subscribed: boolean
          stripe_customer: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          is_subscribed?: boolean
          stripe_customer?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_subscribed?: boolean
          stripe_customer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
