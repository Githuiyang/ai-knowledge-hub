'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'

const adminModules = [
  {
    title: 'AI优秀实践',
    description: '管理AI实践案例，添加新内容或编辑现有内容',
    href: '/admin/practices',
    icon: '💡',
    gradient: 'from-violet-500 to-purple-500',
    stats: '管理链接和文章'
  },
  {
    title: '图片流',
    description: '上传AI生成图片，添加提示词和标签',
    href: '/admin/gallery',
    icon: '🎨',
    gradient: 'from-fuchsia-500 to-pink-500',
    stats: '管理图片'
  },
  {
    title: '学习博客',
    description: '撰写和发布学习心得',
    href: '/admin/blog',
    icon: '📝',
    gradient: 'from-blue-500 to-cyan-500',
    stats: '管理文章'
  },
  {
    title: 'Twitter工具',
    description: '抓取Twitter内容，管理阈值和筛选规则',
    href: '/admin/twitter',
    icon: '🐦',
    gradient: 'from-sky-500 to-indigo-500',
    stats: '抓取推文'
  }
]

export default function AdminDashboardPage() {
  const { logout, isAuthenticated, isLoading } = useAuth()

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">加载中...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Middleware will redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            管理仪表盘
          </h1>
          <p className="text-slate-400">
            选择要管理的模块
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-red-500/50 hover:text-red-400 transition-all duration-200"
        >
          退出登录
        </motion.button>
      </motion.div>

      {/* Modules Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {adminModules.map((module) => (
          <motion.div
            key={module.href}
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <Link href={module.href}>
              <div className="group h-full p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-4xl bg-gradient-to-br ${module.gradient} bg-clip-text text-transparent`}>
                    {module.icon}
                  </div>
                  <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors">
                  {module.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4">
                  {module.description}
                </p>

                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${module.gradient} text-white text-xs`}>
                  {module.stats}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 max-w-5xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-slate-100">快速统计</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '总访问', value: '0' },
            { label: '文章数', value: '0' },
            { label: '图片数', value: '0' },
            { label: '推文数', value: '0' }
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-slate-900/30 border border-slate-800"
            >
              <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
