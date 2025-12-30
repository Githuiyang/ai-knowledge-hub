-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. AI Practices Table
CREATE TABLE IF NOT EXISTS ai_practices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  source_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('link', 'article')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sort_order INTEGER DEFAULT 0
);

-- 2. AI Images Table
CREATE TABLE IF NOT EXISTS ai_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  prompt TEXT,
  model_info TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sort_order INTEGER DEFAULT 0
);

-- 3. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  cover_image TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Twitter Posts Table
CREATE TABLE IF NOT EXISTS twitter_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tweet_id TEXT UNIQUE NOT NULL,
  author_handle TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  media_urls TEXT[],
  likes_count INTEGER DEFAULT 0,
  retweets_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  bookmarks_count INTEGER,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source_account TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE
);

-- 5. Twitter Thresholds Table
CREATE TABLE IF NOT EXISTS twitter_thresholds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  min_likes INTEGER DEFAULT 0,
  min_retweets INTEGER DEFAULT 0,
  min_replies INTEGER DEFAULT 0,
  min_bookmarks INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Admin Config Table
CREATE TABLE IF NOT EXISTS admin_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  password_hash TEXT NOT NULL,
  session_token TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_practices_type ON ai_practices(type);
CREATE INDEX IF NOT EXISTS idx_ai_images_tags ON ai_images USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_twitter_posts_tweet_id ON twitter_posts(tweet_id);
CREATE INDEX IF NOT EXISTS idx_twitter_posts_source ON twitter_posts(source_account);
CREATE INDEX IF NOT EXISTS idx_twitter_posts_published ON twitter_posts(is_published);

-- Insert default thresholds
INSERT INTO twitter_thresholds (min_likes, min_retweets, min_replies, min_bookmarks, is_active)
VALUES (100, 50, 20, 50, TRUE)
ON CONFLICT DO NOTHING;

-- Insert default admin config (password: admin123 - CHANGE THIS!)
-- Hash for 'admin123' using bcrypt (10 rounds)
INSERT INTO admin_config (id, password_hash)
VALUES ('default-config', '$2a$10$YourHashedPasswordHere')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE ai_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE twitter_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE twitter_thresholds ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read access to ai_practices"
  ON ai_practices FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to ai_images"
  ON ai_images FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to published blog_posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Allow public read access to published twitter_posts"
  ON twitter_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Allow public read access to twitter_thresholds"
  ON twitter_thresholds FOR SELECT
  USING (true);

-- Policies for service role (full access via service key)
CREATE POLICY "Allow service full access to ai_practices"
  ON ai_practices FOR ALL
  USING (true);

CREATE POLICY "Allow service full access to ai_images"
  ON ai_images FOR ALL
  USING (true);

CREATE POLICY "Allow service full access to blog_posts"
  ON blog_posts FOR ALL
  USING (true);

CREATE POLICY "Allow service full access to twitter_posts"
  ON twitter_posts FOR ALL
  USING (true);

CREATE POLICY "Allow service full access to twitter_thresholds"
  ON twitter_thresholds FOR ALL
  USING (true);

CREATE POLICY "Allow service full access to admin_config"
  ON admin_config FOR ALL
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_ai_practices_updated_at
  BEFORE UPDATE ON ai_practices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_twitter_thresholds_updated_at
  BEFORE UPDATE ON twitter_thresholds
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
