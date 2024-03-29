export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          }
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
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          }
        ]
      }
      group_media: {
        Row: {
          added_by: string
          added_reason: string
          created_at: string
          group_id: string
          id: number
          media_id: number
          watched: boolean
        }
        Insert: {
          added_by?: string
          added_reason?: string
          created_at?: string
          group_id: string
          id?: number
          media_id: number
          watched?: boolean
        }
        Update: {
          added_by?: string
          added_reason?: string
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
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
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
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "invite_user_to_group_group_id_fkey"
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
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_group_join_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_public_profile"
            referencedColumns: ["user_id"]
          }
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_primary_created_fkey"
            columns: ["primary_created"]
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_primary_joined_fkey"
            columns: ["primary_joined"]
            referencedRelation: "group"
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
