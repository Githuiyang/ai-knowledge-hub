import { db } from '@/lib/supabase'
import { motion } from 'framer-motion'
import Link from 'next/link'

async function getBlogPosts() {
  try {
    return await db.getBlogPosts(true)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getBlogPosts()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          学习博客
        </h1>
        <p className="text-slate-400">
          AI学习过程中的心得体会和技术总结
        </p>
      </motion.div>

      {/* Blog Posts */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">📝</div>
          <p className="text-slate-400 text-lg">暂无文章</p>
          <p className="text-slate-500 text-sm mt-2">
            管理员可以通过管理后台发布文章
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >
          {posts.map((post: any) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              <Link href={`/blog/${post.id}`}>
                <article className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                      {post.title}
                    </h2>
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {post.summary && (
                    <p className="text-slate-400 mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500">
                        {new Date(post.created_at).toLocaleDateString('zh-CN')}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
