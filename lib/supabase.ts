import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error)
  return error?.message || 'An unexpected error occurred'
}

// Type-safe table queries
export const db = {
  // AI Practices
  async getPractices() {
    const { data, error } = await supabase
      .from('ai_practices')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async getPracticeById(id: string) {
    const { data, error } = await supabase
      .from('ai_practices')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async createPractice(practice: any) {
    const { data, error } = await supabase
      .from('ai_practices')
      .insert(practice)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updatePractice(id: string, updates: any) {
    const { data, error } = await supabase
      .from('ai_practices')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deletePractice(id: string) {
    const { error } = await supabase
      .from('ai_practices')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // AI Images
  async getImages() {
    const { data, error } = await supabase
      .from('ai_images')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  async createImage(image: any) {
    const { data, error } = await supabase
      .from('ai_images')
      .insert(image)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateImage(id: string, updates: any) {
    const { data, error } = await supabase
      .from('ai_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteImage(id: string) {
    const { error } = await supabase
      .from('ai_images')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Blog Posts
  async getBlogPosts(publishedOnly = true) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', publishedOnly)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getBlogPostById(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async createBlogPost(post: any) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateBlogPost(id: string, updates: any) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Twitter Posts
  async getTwitterPosts() {
    const { data, error } = await supabase
      .from('twitter_posts')
      .select('*')
      .eq('is_published', true)
      .order('posted_at', { ascending: false })

    if (error) throw error
    return data
  },

  async createTwitterPost(post: any) {
    const { data, error } = await supabase
      .from('twitter_posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteTwitterPost(id: string) {
    const { error } = await supabase
      .from('twitter_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Twitter Thresholds
  async getThresholds() {
    const { data, error } = await supabase
      .from('twitter_thresholds')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateThresholds(thresholds: any) {
    const { data, error } = await supabase
      .from('twitter_thresholds')
      .upsert(thresholds)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin
  async getAdminConfig() {
    const { data, error } = await supabase
      .from('admin_config')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateAdminConfig(updates: any) {
    const { data, error } = await supabase
      .from('admin_config')
      .update(updates)
      .eq('id', 'default')
      .select()
      .single()

    if (error) throw error
    return data
  },
}
