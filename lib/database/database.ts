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
      _DispensaryMenuToStrain: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_DispensaryMenuToStrain_A_fkey"
            columns: ["A"]
            referencedRelation: "dispensary_menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_DispensaryMenuToStrain_B_fkey"
            columns: ["B"]
            referencedRelation: "strains"
            referencedColumns: ["id"]
          }
        ]
      }
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
            referencedRelation: "dispensary_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensary_comment_likes_userId_fkey"
            columns: ["userId"]
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
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensary_comments_userId_fkey"
            columns: ["userId"]
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
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensary_subscriptions_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
            referencedRelation: "strain_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_comment_likes_userId_fkey"
            columns: ["userId"]
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
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_comments_userId_fkey"
            columns: ["userId"]
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
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strain_likes_userId_fkey"
            columns: ["userId"]
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
          strainId: string
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
          strainId: string
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
          strainId?: string
        }
        Relationships: [
          {
            foreignKeyName: "strain_mixers_strainId_fkey"
            columns: ["strainId"]
            referencedRelation: "strains"
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
