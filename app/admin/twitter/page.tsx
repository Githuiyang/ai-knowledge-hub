'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

type Threshold = {
  min_likes: number
  min_retweets: number
  min_replies: number
  min_bookmarks: number
  is_active: boolean
}

export default function AdminTwitterPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [username, setUsername] = useState('')
  const [scraping, setScraping] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [thresholds, setThresholds] = useState<Threshold>({
    min_likes: 100,
    min_retweets: 50,
    min_replies: 20,
    min_bookmarks: 0,
    is_active: true
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchThresholds()
    }
  }, [isAuthenticated])

  const fetchThresholds = async () => {
    try {
      const res = await fetch('/api/twitter/thresholds')
      const data = await res.json()
      if (data.success && data.data) {
        setThresholds(data.data)
      }
    } catch (error) {
      console.error('Error fetching thresholds:', error)
    }
  }

  const handleScrape = async () => {
    if (!username.trim()) {
      setMessage({ type: 'error', text: '请输入用户名' })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    setScraping(true)
    setResult(null)

    try {
      const res = await fetch('/api/twitter/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })

      const data = await res.json()

      if (data.success) {
        setResult(data.data)
        setMessage({ type: 'success', text: data.message || '抓取成功' })
      } else {
        setMessage({ type: 'error', text: data.error || '抓取失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误' })
    } finally {
      setScraping(false)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleSaveThresholds = async () => {
    try {
      const res = await fetch('/api/twitter/thresholds', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(thresholds)
      })

      const data = await res.json()

      if (data.success) {
        setMessage({ type: 'success', text: '阈值已保存' })
      } else {
        setMessage({ type: 'error', text: data.error || '保存失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误' })
    }

    setTimeout(() => setMessage(null), 3000)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-slate-400">加载中...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link href="/admin" className="text-sky-400 hover:text-sky-300 text-sm">
          ← 返回仪表盘
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2 text-slate-100">Twitter抓取工具</h1>
        <p className="text-slate-400">抓取Twitter账号的推文，按阈值筛选优质内容</p>
      </motion.div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Scrape Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
        >
          <h2 className="text-xl font-semibold mb-4 text-slate-100">抓取推文</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Twitter用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="例如: elonmusk"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                disabled={scraping}
              />
              <p className="mt-2 text-xs text-slate-400">
                输入Twitter用户名（不需要@符号）
              </p>
            </div>

            <button
              onClick={handleScrape}
              disabled={scraping || !username.trim()}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium hover:from-sky-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {scraping ? '抓取中...' : '开始抓取'}
            </button>

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-slate-800/50 space-y-2"
              >
                <h3 className="font-semibold text-slate-100">抓取结果</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">总推文数：</span>
                    <span className="text-sky-400 font-semibold ml-2">{result.total}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">符合阈值：</span>
                    <span className="text-green-400 font-semibold ml-2">{result.filtered}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">新增：</span>
                    <span className="text-violet-400 font-semibold ml-2">{result.saved}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">已存在：</span>
                    <span className="text-slate-400 font-semibold ml-2">{result.skipped}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Thresholds Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
        >
          <h2 className="text-xl font-semibold mb-4 text-slate-100">筛选阈值</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">
                启用阈值筛选
              </label>
              <button
                onClick={() => setThresholds({ ...thresholds, is_active: !thresholds.is_active })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  thresholds.is_active ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    thresholds.is_active ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                最小点赞数
              </label>
              <input
                type="number"
                value={thresholds.min_likes}
                onChange={(e) => setThresholds({ ...thresholds, min_likes: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                最小转发数
              </label>
              <input
                type="number"
                value={thresholds.min_retweets}
                onChange={(e) => setThresholds({ ...thresholds, min_retweets: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                最小回复数
              </label>
              <input
                type="number"
                value={thresholds.min_replies}
                onChange={(e) => setThresholds({ ...thresholds, min_replies: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                最小收藏数（可选）
              </label>
              <input
                type="number"
                value={thresholds.min_bookmarks}
                onChange={(e) => setThresholds({ ...thresholds, min_bookmarks: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              onClick={handleSaveThresholds}
              className="w-full py-3 px-6 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-all duration-200"
            >
              保存阈值设置
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
