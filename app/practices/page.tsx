import { db } from '@/lib/supabase'
import { motion } from 'framer-motion'
import Link from 'next/link'

async function getPractices() {
  try {
    return await db.getPractices()
  } catch (error) {
    console.error('Error fetching practices:', error)
    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function PracticesPage() {
  const practices = await getPractices()

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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          AI优秀实践
        </h1>
        <p className="text-slate-400">
          收录来自各网站的优秀AI实践案例和资源
        </p>
      </motion.div>

      {/* Practices List */}
      {practices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">💡</div>
          <p className="text-slate-400 text-lg">暂无内容</p>
          <p className="text-slate-500 text-sm mt-2">
            管理员可以通过管理后台添加内容
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {practices.map((practice: any) => (
            <motion.div
              key={practice.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {practice.type === 'link' ? (
                <a
                  href={practice.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="h-full p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <svg className="w-5 h-5 text-slate-500 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
                      {practice.title}
                    </h3>
                    {practice.content && (
                      <p className="text-slate-400 text-sm line-clamp-3">
                        {practice.content}
                      </p>
                    )}
                    <div className="mt-4 text-xs text-slate-500">
                      {new Date(practice.created_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </a>
              ) : (
                <Link
                  href={`/practices/${practice.id}`}
                  className="block h-full"
                >
                  <div className="h-full p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <svg className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {practice.title}
                    </h3>
                    {practice.content && (
                      <p className="text-slate-400 text-sm line-clamp-3">
                        {practice.content}
                      </p>
                    )}
                    <div className="mt-4 text-xs text-slate-500">
                      {new Date(practice.created_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
