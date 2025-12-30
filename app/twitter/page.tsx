import { db } from '@/lib/supabase'
import { motion } from 'framer-motion'

async function getTwitterPosts() {
  try {
    return await db.getTwitterPosts()
  } catch (error) {
    console.error('Error fetching twitter posts:', error)
    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function TwitterPage() {
  const posts = await getTwitterPosts()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Twitter精选
        </h1>
        <p className="text-slate-400">
          来自Twitter的优质AI内容，按点赞数等维度筛选
        </p>
      </motion.div>

      {/* Posts */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🐦</div>
          <p className="text-slate-400 text-lg">暂无推文</p>
          <p className="text-slate-500 text-sm mt-2">
            管理员可以通过管理后台抓取Twitter内容
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto space-y-4"
        >
          {posts.map((post: any) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
            >
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 transition-all duration-300">
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  {post.author_avatar && (
                    <img
                      src={post.author_avatar}
                      alt={post.author_name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-slate-100">
                      {post.author_name}
                    </div>
                    <div className="text-sm text-slate-400">
                      @{post.author_handle}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-200 mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>

                {/* Media */}
                {post.media_urls && post.media_urls.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    {post.media_urls.map((url: string, index: number) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Tweet media ${index + 1}`}
                        className="rounded-lg w-full object-cover aspect-square"
                      />
                    ))}
                  </div>
                )}

                {/* Engagement */}
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{post.likes_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    <span>{post.retweets_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <span>{post.replies_count}</span>
                  </div>
                  <div className="ml-auto text-xs text-slate-500">
                    {new Date(post.posted_at).toLocaleDateString('zh-CN')}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
