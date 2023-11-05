export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      accounts: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      dispensaries: {
        Row: {
          address: string | null
          averageRating: number | null
          city: string | null
          createdAt: string
          description: string | null
          email: string | null
          hours: string | null
          id: string
          image: string | null
          latitude: number | null
          logo: string | null
          longitude: number | null
          name: string | null
          phone: string | null
          slug: string
          updatedAt: string
          website: string | null
        }
        Insert: {
          address?: string | null
          averageRating?: number | null
          city?: string | null
          createdAt?: string
          description?: string | null
          email?: string | null
          hours?: string | null
          id: string
          image?: string | null
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          name?: string | null
          phone?: string | null
          slug: string
          updatedAt: string
          website?: string | null
        }
        Update: {
          address?: string | null
          averageRating?: number | null
          city?: string | null
          createdAt?: string
          description?: string | null
          email?: string | null
          hours?: string | null
          id?: string
          image?: string | null
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          name?: string | null
          phone?: string | null
          slug?: string
          updatedAt?: string
          website?: string | null
        }
        Relationships: []
      }
      dispensary_comment_likes: {
        Row: {
          commentId: string
          createdAt: string
          id: string
          userId: string
        }
        Insert: {
          commentId: string
          createdAt?: string
          id: string
          userId: string
        }
        Update: {
          commentId?: string
          createdAt?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispensary_comment_likes_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: false
            referencedRelation: "dispensary_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensary_comment_likes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      dispensary_comments: {
        Row: {
          body: string | null
          createdAt: string
          dispensaryId: string
          id: string
          userId: string
        }
        Insert: {
          body?: string | null
          createdAt?: string
          dispensaryId: string
          id: string
          userId: string
        }
        Update: {
          body?: string | null
          createdAt?: string
          dispensaryId?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispensary_comments_dispensaryId_fkey"
            columns: ["dispensaryId"]
            isOneToOne: false
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensary_comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      dispensary_menus: {
        Row: {
          createdAt: string
          dispensaryId: string
          id: string
          prices: Json[] | null
        }
        Insert: {
          createdAt?: string
          dispensaryId: string
          id: string
          prices?: Json[] | null
        }
        Update: {
          createdAt?: string
          dispensaryId?: string
          id?: string
          prices?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "dispensary_menus_dispensaryId_fkey"
            columns: ["dispensaryId"]
            isOneToOne: false
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          }
        ]
      }
      dispensary_subscriptions: {
        Row: {
          createdAt: string
          dispensaryId: string
          id: string
          userId: string
        }
        Insert: {
          createdAt?: string
          dispensaryId: string
          id: string
          userId: string
        }
        Update: {
          createdAt?: string
          dispensaryId?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispensary_subscriptions_dispensaryId_fkey"
            columns: ["dispensaryId"]
            isOneToOne: false
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensary_subscriptions_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      public_profiles: {
        Row: {
          aboutMe: string | null
          birthDate: string | null
          displayName: string
          id: string
          image: string | null
          languages: string | null
          location: string | null
          name: string | null
        }
        Insert: {
          aboutMe?: string | null
          birthDate?: string | null
          displayName: string
          id: string
          image?: string | null
          languages?: string | null
          location?: string | null
          name?: string | null
        }
        Update: {
          aboutMe?: string | null
          birthDate?: string | null
          displayName?: string
          id?: string
          image?: string | null
          languages?: string | null
          location?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      public_strain_likes: {
        Row: {
          created_at: string
          id: string
          strain_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          strain_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          strain_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_strain_likes_strain_id_fkey"
            columns: ["strain_id"]
            isOneToOne: false
            referencedRelation: "public_strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_strain_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      public_strains: {
        Row: {
          averageRating: number | null
          cannabinoids: Json | null
          category: string | null
          description: string | null
          dispensaryMenuId: string | null
          effects: Json | null
          flowerImageSvg: string | null
          id: string
          likes_count: number | null
          name: string | null
          nugImage: string | null
          phenotype: string | null
          shortDescription: string | null
          slug: string
          subtitle: string | null
          terps: Json | null
          thcPercent: number | null
          topEffect: string | null
          topTerpene: string | null
        }
        Insert: {
          averageRating?: number | null
          cannabinoids?: Json | null
          category?: string | null
          description?: string | null
          dispensaryMenuId?: string | null
          effects?: Json | null
          flowerImageSvg?: string | null
          id: string
          likes_count?: number | null
          name?: string | null
          nugImage?: string | null
          phenotype?: string | null
          shortDescription?: string | null
          slug: string
          subtitle?: string | null
          terps?: Json | null
          thcPercent?: number | null
          topEffect?: string | null
          topTerpene?: string | null
        }
        Update: {
          averageRating?: number | null
          cannabinoids?: Json | null
          category?: string | null
          description?: string | null
          dispensaryMenuId?: string | null
          effects?: Json | null
          flowerImageSvg?: string | null
          id?: string
          likes_count?: number | null
          name?: string | null
          nugImage?: string | null
          phenotype?: string | null
          shortDescription?: string | null
          slug?: string
          subtitle?: string | null
          terps?: Json | null
          thcPercent?: number | null
          topEffect?: string | null
          topTerpene?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Insert: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      strain_comment_likes: {
        Row: {
          commentId: string
          createdAt: string
          id: string
          userId: string
        }
        Insert: {
          commentId: string
          createdAt?: string
          id: string
          userId: string
        }
        Update: {
          commentId?: string
          createdAt?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "strain_comment_likes_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: false
            referencedRelation: "strain_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_comment_likes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      strain_comments: {
        Row: {
          body: string | null
          createdAt: string
          id: string
          strainId: string
          userId: string
        }
        Insert: {
          body?: string | null
          createdAt?: string
          id: string
          strainId: string
          userId: string
        }
        Update: {
          body?: string | null
          createdAt?: string
          id?: string
          strainId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "strain_comments_strainId_fkey"
            columns: ["strainId"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      strain_likes: {
        Row: {
          createdAt: string
          id: string
          strainId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id: string
          strainId: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          strainId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "strain_likes_strainId_fkey"
            columns: ["strainId"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_likes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      strain_mixers: {
        Row: {
          averageRating: number
          category: string
          createdAt: string
          id: string
          name: string
          nugImage: string
          recommendation: string
          slug: string
        }
        Insert: {
          averageRating: number
          category: string
          createdAt?: string
          id: string
          name: string
          nugImage: string
          recommendation: string
          slug: string
        }
        Update: {
          averageRating?: number
          category?: string
          createdAt?: string
          id?: string
          name?: string
          nugImage?: string
          recommendation?: string
          slug?: string
        }
        Relationships: []
      }
      strains: {
        Row: {
          averageRating: number | null
          cannabinoids: Json | null
          category: string | null
          description: string | null
          dispensaryMenuId: string | null
          effects: Json | null
          flowerImageSvg: string | null
          id: string
          likes_count: number | null
          name: string | null
          nugImage: string | null
          phenotype: string | null
          shortDescription: string | null
          slug: string
          subtitle: string | null
          terps: Json | null
          thcPercent: number | null
          topEffect: string | null
          topTerpene: string | null
        }
        Insert: {
          averageRating?: number | null
          cannabinoids?: Json | null
          category?: string | null
          description?: string | null
          dispensaryMenuId?: string | null
          effects?: Json | null
          flowerImageSvg?: string | null
          id: string
          likes_count?: number | null
          name?: string | null
          nugImage?: string | null
          phenotype?: string | null
          shortDescription?: string | null
          slug: string
          subtitle?: string | null
          terps?: Json | null
          thcPercent?: number | null
          topEffect?: string | null
          topTerpene?: string | null
        }
        Update: {
          averageRating?: number | null
          cannabinoids?: Json | null
          category?: string | null
          description?: string | null
          dispensaryMenuId?: string | null
          effects?: Json | null
          flowerImageSvg?: string | null
          id?: string
          likes_count?: number | null
          name?: string | null
          nugImage?: string | null
          phenotype?: string | null
          shortDescription?: string | null
          slug?: string
          subtitle?: string | null
          terps?: Json | null
          thcPercent?: number | null
          topEffect?: string | null
          topTerpene?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          aboutMe: string | null
          birthDate: string | null
          commentNotify: boolean
          createdAt: string
          dispensaryNotify: boolean
          displayName: string | null
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          languages: string | null
          location: string
          name: string | null
          phone: string | null
          updatedAt: string
        }
        Insert: {
          aboutMe?: string | null
          birthDate?: string | null
          commentNotify?: boolean
          createdAt?: string
          dispensaryNotify?: boolean
          displayName?: string | null
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          languages?: string | null
          location?: string
          name?: string | null
          phone?: string | null
          updatedAt: string
        }
        Update: {
          aboutMe?: string | null
          birthDate?: string | null
          commentNotify?: boolean
          createdAt?: string
          dispensaryNotify?: boolean
          displayName?: string | null
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          languages?: string | null
          location?: string
          name?: string | null
          phone?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      verification_tokens: {
        Row: {
          expires: string
          id: string
          identifier: string
          token: string
        }
        Insert: {
          expires: string
          id: string
          identifier: string
          token: string
        }
        Update: {
          expires?: string
          id?: string
          identifier?: string
          token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      pgroonga_command:
        | {
            Args: {
              groongacommand: string
            }
            Returns: string
          }
        | {
            Args: {
              groongacommand: string
              arguments: string[]
            }
            Returns: string
          }
      pgroonga_command_escape_value: {
        Args: {
          value: string
        }
        Returns: string
      }
      pgroonga_equal_query_text_array: {
        Args: {
          targets: string[]
          query: string
        }
        Returns: boolean
      }
      pgroonga_equal_query_varchar_array: {
        Args: {
          targets: string[]
          query: string
        }
        Returns: boolean
      }
      pgroonga_equal_text: {
        Args: {
          target: string
          other: string
        }
        Returns: boolean
      }
      pgroonga_equal_text_condition: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_equal_varchar: {
        Args: {
          target: string
          other: string
        }
        Returns: boolean
      }
      pgroonga_equal_varchar_condition: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_escape:
        | {
            Args: {
              value: boolean
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: string
            }
            Returns: string
          }
        | {
            Args: {
              value: string
            }
            Returns: string
          }
        | {
            Args: {
              value: string
            }
            Returns: string
          }
        | {
            Args: {
              value: string
              special_characters: string
            }
            Returns: string
          }
      pgroonga_flush: {
        Args: {
          indexname: unknown
        }
        Returns: boolean
      }
      pgroonga_handler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgroonga_highlight_html:
        | {
            Args: {
              target: string
              keywords: string[]
            }
            Returns: string
          }
        | {
            Args: {
              target: string
              keywords: string[]
              indexname: unknown
            }
            Returns: string
          }
        | {
            Args: {
              targets: string[]
              keywords: string[]
            }
            Returns: unknown
          }
        | {
            Args: {
              targets: string[]
              keywords: string[]
              indexname: unknown
            }
            Returns: unknown
          }
      pgroonga_index_column_name:
        | {
            Args: {
              indexname: unknown
              columnindex: number
            }
            Returns: string
          }
        | {
            Args: {
              indexname: unknown
              columnname: string
            }
            Returns: string
          }
      pgroonga_is_writable: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      pgroonga_match_positions_byte:
        | {
            Args: {
              target: string
              keywords: string[]
            }
            Returns: unknown
          }
        | {
            Args: {
              target: string
              keywords: string[]
              indexname: unknown
            }
            Returns: unknown
          }
      pgroonga_match_positions_character:
        | {
            Args: {
              target: string
              keywords: string[]
            }
            Returns: unknown
          }
        | {
            Args: {
              target: string
              keywords: string[]
              indexname: unknown
            }
            Returns: unknown
          }
      pgroonga_match_term:
        | {
            Args: {
              target: string[]
              term: string
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string[]
              term: string
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              term: string
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              term: string
            }
            Returns: boolean
          }
      pgroonga_match_text_array_condition: {
        Args: {
          target: string[]
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_match_text_array_condition_with_scorers: {
        Args: {
          target: string[]
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_match_text_condition: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_match_text_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_match_varchar_condition: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_match_varchar_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_normalize:
        | {
            Args: {
              target: string
            }
            Returns: string
          }
        | {
            Args: {
              target: string
              normalizername: string
            }
            Returns: string
          }
      pgroonga_prefix_varchar_condition: {
        Args: {
          target: string
          conditoin: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_query_escape: {
        Args: {
          query: string
        }
        Returns: string
      }
      pgroonga_query_expand: {
        Args: {
          tablename: unknown
          termcolumnname: string
          synonymscolumnname: string
          query: string
        }
        Returns: string
      }
      pgroonga_query_extract_keywords: {
        Args: {
          query: string
          index_name?: string
        }
        Returns: unknown
      }
      pgroonga_query_text_array_condition: {
        Args: {
          targets: string[]
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_query_text_array_condition_with_scorers: {
        Args: {
          targets: string[]
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_query_text_condition: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_query_text_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_query_varchar_condition: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
        }
        Returns: boolean
      }
      pgroonga_query_varchar_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_result_to_jsonb_objects: {
        Args: {
          result: Json
        }
        Returns: Json
      }
      pgroonga_result_to_recordset: {
        Args: {
          result: Json
        }
        Returns: Record<string, unknown>[]
      }
      pgroonga_score:
        | {
            Args: {
              row: Record<string, unknown>
            }
            Returns: number
          }
        | {
            Args: {
              tableoid: unknown
              ctid: unknown
            }
            Returns: number
          }
      pgroonga_set_writable: {
        Args: {
          newwritable: boolean
        }
        Returns: boolean
      }
      pgroonga_snippet_html: {
        Args: {
          target: string
          keywords: string[]
          width?: number
        }
        Returns: unknown
      }
      pgroonga_table_name: {
        Args: {
          indexname: unknown
        }
        Returns: string
      }
      pgroonga_tokenize: {
        Args: {
          target: string
        }
        Returns: unknown
      }
      pgroonga_vacuum: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      pgroonga_wal_apply:
        | {
            Args: Record<PropertyKey, never>
            Returns: number
          }
        | {
            Args: {
              indexname: unknown
            }
            Returns: number
          }
      pgroonga_wal_set_applied_position:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              block: number
              offset: number
            }
            Returns: boolean
          }
        | {
            Args: {
              indexname: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              indexname: unknown
              block: number
              offset: number
            }
            Returns: boolean
          }
      pgroonga_wal_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          oid: unknown
          current_block: number
          current_offset: number
          current_size: number
          last_block: number
          last_offset: number
          last_size: number
        }[]
      }
      pgroonga_wal_truncate:
        | {
            Args: Record<PropertyKey, never>
            Returns: number
          }
        | {
            Args: {
              indexname: unknown
            }
            Returns: number
          }
      search_strains: {
        Args: {
          search_term: string
          limit_num: number
        }
        Returns: {
          slug: string
          name: string
          nugimage: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      pgroonga_full_text_search_condition: {
        query: string
        weigths: unknown
        indexname: string
      }
      pgroonga_full_text_search_condition_with_scorers: {
        query: string
        weigths: unknown
        scorers: unknown
        indexname: string
      }
    }
  }
}
