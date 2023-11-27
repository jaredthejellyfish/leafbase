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
      backup_strains: {
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
      long_pairings: {
        Row: {
          body: string | null
          created_at: string
          id: string
          image: string | null
          strain1_id: string
          strain2_id: string
          strain2_name: string
          strain2_slug: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          image?: string | null
          strain1_id: string
          strain2_id: string
          strain2_name: string
          strain2_slug: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          image?: string | null
          strain1_id?: string
          strain2_id?: string
          strain2_name?: string
          strain2_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "long_pairings_strain1_id_fkey"
            columns: ["strain1_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "long_pairings_strain2_id_fkey"
            columns: ["strain2_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          about: string | null
          birth_date: string | null
          comment_notify: boolean
          dispensary_notify: boolean
          id: string
          image: string | null
          language: string | null
          location: string | null
          name: string | null
          phone: string | null
          profile_id: string
          username: string
        }
        Insert: {
          about?: string | null
          birth_date?: string | null
          comment_notify?: boolean
          dispensary_notify?: boolean
          id: string
          image?: string | null
          language?: string | null
          location?: string | null
          name?: string | null
          phone?: string | null
          profile_id?: string
          username: string
        }
        Update: {
          about?: string | null
          birth_date?: string | null
          comment_notify?: boolean
          dispensary_notify?: boolean
          id?: string
          image?: string | null
          language?: string | null
          location?: string | null
          name?: string | null
          phone?: string | null
          profile_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      short_pairings: {
        Row: {
          body: string | null
          created_at: string
          id: string
          image: string | null
          strain1_id: string
          strain2_id: string
          strain2_name: string
          strain2_slug: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          image?: string | null
          strain1_id: string
          strain2_id: string
          strain2_name: string
          strain2_slug: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          image?: string | null
          strain1_id?: string
          strain2_id?: string
          strain2_name?: string
          strain2_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "short_pairings_strain1_id_fkey"
            columns: ["strain1_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "short_pairings_strain2_id_fkey"
            columns: ["strain2_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          }
        ]
      }
      strain_comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          strain_id: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          strain_id: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          strain_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "strain_comments_strain_id_fkey"
            columns: ["strain_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      strain_likes: {
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
            foreignKeyName: "strain_likes_strain_id_fkey"
            columns: ["strain_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          name: string
          nugImage: string | null
          phenotype: string | null
          shortDescription: string | null
          slug: string
          subtitle: string
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
          name: string
          nugImage?: string | null
          phenotype?: string | null
          shortDescription?: string | null
          slug: string
          subtitle: string
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
          name?: string
          nugImage?: string | null
          phenotype?: string | null
          shortDescription?: string | null
          slug?: string
          subtitle?: string
          terps?: Json | null
          thcPercent?: number | null
          topEffect?: string | null
          topTerpene?: string | null
        }
        Relationships: []
      }
      strains_vectors: {
        Row: {
          id: string
          slug: string
          strain_id: string
          vector: string
        }
        Insert: {
          id?: string
          slug: string
          strain_id: string
          vector: string
        }
        Update: {
          id?: string
          slug?: string
          strain_id?: string
          vector?: string
        }
        Relationships: [
          {
            foreignKeyName: "strains_vectors_strain_id_fkey"
            columns: ["strain_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_closest_strains: {
        Args: {
          input_slug: string
          limit_count: number
        }
        Returns: {
          id: string
          slug: string
          strain_id: string
          nug_image: string
        }[]
      }
      get_related_strains: {
        Args: {
          input_slug: string
          limit_count: number
        }
        Returns: {
          id: number
          slug: string
          strain_id: number
          image: string
        }[]
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
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
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
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
