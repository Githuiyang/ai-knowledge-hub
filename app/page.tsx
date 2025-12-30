import Link from 'next/link'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'AI优秀实践',
    description: '收录来自各网站的优秀AI实践案例，包括文章和链接资源',
    href: '/practices',
    icon: '💡',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    title: 'AI图片流',
    description: '展示优秀的AI生成图片，附带提示词和模型信息',
    href: '/gallery',
    icon: '🎨',
    gradient: 'from-fuchsia-500 to-pink-500'
  },
  {
    title: '学习博客',
    description: '记录AI学习过程中的心得体会和技术总结',
    href: '/blog',
    icon: '📝',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Twitter精选',
    description: '抓取Twitter上的优质AI内容，按点赞数等维度筛选',
    href: '/twitter',
    icon: '🐦',
    gradient: 'from-sky-500 to-indigo-500'
  }
]

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
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            AI知识学习平台
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          探索、收集、分享AI领域的优秀内容
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.href}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={feature.href}>
              <div className="group relative h-full p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`text-5xl mb-4 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-3 text-slate-100 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className={`absolute bottom-8 right-8 bg-gradient-to-br ${feature.gradient} p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-sm">
          <span>管理员入口</span>
          <Link href="/admin/login" className="text-violet-400 hover:text-violet-300 transition-colors">
            点击登录
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
