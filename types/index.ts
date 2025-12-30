// Database table types
export interface Database {
  public: {
    Tables: {
      ai_practices: {
        Row: AIPractice
        Insert: AIPracticeInsert
        Update: AIPracticeUpdate
      }
      ai_images: {
        Row: AIImage
        Insert: AIImageInsert
        Update: AIImageUpdate
      }
      blog_posts: {
        Row: BlogPost
        Insert: BlogPostInsert
        Update: BlogPostUpdate
      }
      twitter_posts: {
        Row: TwitterPost
        Insert: TwitterPostInsert
        Update: TwitterPostUpdate
      }
      twitter_thresholds: {
        Row: TwitterThreshold
        Insert: TwitterThresholdInsert
        Update: TwitterThresholdUpdate
      }
      admin_config: {
        Row: AdminConfig
        Insert: AdminConfigInsert
        Update: AdminConfigUpdate
      }
    }
  }
}

// AI Practices
export type AIPracticeType = 'link' | 'article'

export interface AIPractice {
  id: string
  title: string
  content: string | null
  source_url: string | null
  type: AIPracticeType
  created_at: string
  updated_at: string
  sort_order: number
}

export type AIPracticeInsert = Omit<AIPractice, 'id' | 'created_at' | 'updated_at'>
export type AIPracticeUpdate = Partial<AIPracticeInsert>

// AI Images
export interface AIImage {
  id: string
  title: string
  image_url: string
  prompt: string | null
  model_info: string | null
  tags: string[] | null
  created_at: string
  sort_order: number
}

export type AIImageInsert = Omit<AIImage, 'id' | 'created_at'>
export type AIImageUpdate = Partial<AIImageInsert>

// Blog Posts
export interface BlogPost {
  id: string
  title: string
  content: string
  summary: string | null
  cover_image: string | null
  tags: string[] | null
  published: boolean
  created_at: string
  updated_at: string
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
export type BlogPostUpdate = Partial<BlogPostInsert>

// Twitter Posts
export interface TwitterPost {
  id: string
  tweet_id: string
  author_handle: string
  author_name: string
  author_avatar: string | null
  content: string
  media_urls: string[] | null
  likes_count: number
  retweets_count: number
  replies_count: number
  bookmarks_count: number | null
  posted_at: string
  fetched_at: string
  source_account: string
  is_published: boolean
}

export type TwitterPostInsert = Omit<TwitterPost, 'id' | 'fetched_at'>
export type TwitterPostUpdate = Partial<TwitterPostInsert>

// Twitter Thresholds
export interface TwitterThreshold {
  id: string
  min_likes: number
  min_retweets: number
  min_replies: number
  min_bookmarks: number
  is_active: boolean
  updated_at: string
}

export type TwitterThresholdInsert = Omit<TwitterThreshold, 'id' | 'updated_at'>
export type TwitterThresholdUpdate = Partial<TwitterThresholdInsert>

// Admin Config
export interface AdminConfig {
  id: string
  password_hash: string
  session_token: string | null
}

export type AdminConfigInsert = Omit<AdminConfig, 'id'>
export type AdminConfigUpdate = Partial<AdminConfigInsert>

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Auth types
export interface AuthSession {
  token: string
  isAuthenticated: boolean
}

// Form types
export interface PracticeFormData {
  title: string
  content?: string
  source_url?: string
  type: AIPracticeType
}

export interface ImageFormData {
  title: string
  image_url: string
  prompt?: string
  model_info?: string
  tags?: string[]
}

export interface BlogFormData {
  title: string
  content: string
  summary?: string
  cover_image?: string
  tags?: string[]
  published?: boolean
}
