'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type TabType = 'home' | 'practices' | 'gallery' | 'blog' | 'twitter'

interface TabConfig {
  id: TabType
  label: string
  icon: string
  gradient: string
}

const tabs: TabConfig[] = [
  { id: 'home', label: '首页', icon: '🏠', gradient: 'from-slate-600 to-slate-700' },
  { id: 'practices', label: 'AI实践', icon: '💡', gradient: 'from-violet-500 to-purple-500' },
  { id: 'gallery', label: '图片流', icon: '🎨', gradient: 'from-fuchsia-500 to-pink-500' },
  { id: 'blog', label: '博客', icon: '📝', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'twitter', label: 'Twitter', icon: '🐦', gradient: 'from-sky-500 to-indigo-500' },
]

// 组件：首页
function HomeTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="text-center py-16 px-8">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent"
        >
          AI知识库
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto"
        >
          探索、收集、分享AI领域的优秀内容
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 pb-16">
        {tabs.slice(1).map((tab, index) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-slate-700 transition-all hover:scale-105 cursor-pointer group"
          >
            <div className={`text-5xl mb-4 bg-gradient-to-br ${tab.gradient} bg-clip-text text-transparent`}>
              {tab.icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-white">
              {tab.label}
            </h3>
            <p className="text-sm text-slate-400">
              点击上方Tab查看内容
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pb-16"
      >
        <Link href="/admin/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 text-white font-medium hover:from-slate-600 hover:to-slate-700 transition-all shadow-lg hover:shadow-xl"
          >
            管理员入口
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

// 组件：AI实践
function PracticesTab() {
  const [practices, setPractices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/practices')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPractices(data.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-8 py-12"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-100">AI优秀实践</h2>

        {loading ? (
          <div className="text-center text-slate-400">加载中...</div>
        ) : practices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💡</div>
            <p className="text-slate-400">暂无内容</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    practice.type === 'link' ? 'bg-violet-500/10 text-violet-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {practice.type === 'link' ? '链接' : '文章'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{practice.title}</h3>
                {practice.type === 'link' ? (
                  <a href={practice.source_url} target="_blank" rel="noopener noreferrer" className="text-violet-400 text-sm hover:underline block mt-2">
                    {practice.source_url}
                  </a>
                ) : (
                  <p className="text-slate-400 text-sm line-clamp-2">{practice.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// 组件：图片流
function GalleryTab() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        if (data.success) setImages(data.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-8 py-12"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-100">AI图片流</h2>

        {loading ? (
          <div className="text-center text-slate-400">加载中...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-slate-400">暂无图片</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="rounded-xl overflow-hidden bg-slate-900/30 border border-slate-800/50 hover:border-fuchsia-500/30 transition-all">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{image.title}</h3>
                    {image.model_info && (
                      <div className="inline-flex items-center px-2 py-1 rounded-md bg-fuchsia-500/10 text-fuchsia-400 text-xs mb-2">
                        {image.model_info}
                      </div>
                    )}
                    {image.prompt && (
                      <p className="text-xs text-slate-400 line-clamp-3">{image.prompt}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// 组件：博客
function BlogTab() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-8 py-12"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-100">学习博客</h2>

        {loading ? (
          <div className="text-center text-slate-400">加载中...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-slate-400">暂无文章</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/30 transition-all"
              >
                <h3 className="text-2xl font-semibold text-slate-100 mb-3">{post.title}</h3>
                {post.summary && (
                  <p className="text-slate-400 mb-4">{post.summary}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {new Date(post.created_at).toLocaleDateString('zh-CN')}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    阅读更多 →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// 组件：Twitter
function TwitterTab() {
  const [tweets, setTweets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/twitter')
      .then(res => res.json())
      .then(data => {
        if (data.success) setTweets(data.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-8 py-12"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-100">Twitter精选</h2>

        {loading ? (
          <div className="text-center text-slate-400">加载中...</div>
        ) : tweets.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🐦</div>
            <p className="text-slate-400">暂无推文</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tweets.map((tweet, index) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-sky-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  {tweet.author_avatar && (
                    <img src={tweet.author_avatar} alt={tweet.author_name} className="w-10 h-10 rounded-full" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-100">{tweet.author_name}</div>
                    <div className="text-sm text-slate-400">@{tweet.author_handle}</div>
                  </div>
                </div>
                <p className="text-slate-200 mb-4 whitespace-pre-wrap">{tweet.content}</p>
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <span>❤️ {tweet.likes_count}</span>
                  <span>🔄 {tweet.retweets_count}</span>
                  <span>💬 {tweet.replies_count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// 主页面
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('home')

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />
      case 'practices': return <PracticesTab />
      case 'gallery': return <GalleryTab />
      case 'blog': return <BlogTab />
      case 'twitter': return <TwitterTab />
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Apple-style Tab Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-16 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="min-h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          {renderTab()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 text-center text-sm text-slate-500">
        <p>© 2024 AI知识库 | Built with Next.js & Supabase</p>
      </footer>
    </div>
  )
}
