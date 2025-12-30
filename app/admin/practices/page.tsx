'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

type Practice = {
  id: string
  title: string
  content: string | null
  source_url: string | null
  type: 'link' | 'article'
  created_at: string
}

type FormData = {
  title: string
  content: string
  source_url: string
  type: 'link' | 'article'
}

export default function AdminPracticesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [practices, setPractices] = useState<Practice[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Practice | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    source_url: '',
    type: 'link'
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchPractices()
    }
  }, [isAuthenticated])

  const fetchPractices = async () => {
    try {
      const res = await fetch('/api/practices')
      const data = await res.json()
      if (data.success) {
        setPractices(data.data)
      }
    } catch (error) {
      console.error('Error fetching practices:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editing ? '/api/practices' : '/api/practices'
      const method = editing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing ? { ...formData, id: editing.id } : formData)
      })

      const data = await res.json()

      if (data.success) {
        setMessage({ type: 'success', text: editing ? '更新成功' : '创建成功' })
        fetchPractices()
        resetForm()
      } else {
        setMessage({ type: 'error', text: data.error || '操作失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误' })
    }

    setTimeout(() => setMessage(null), 3000)
  }

  const handleEdit = (practice: Practice) => {
    setEditing(practice)
    setFormData({
      title: practice.title,
      content: practice.content || '',
      source_url: practice.source_url || '',
      type: practice.type
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除吗？')) return

    try {
      const res = await fetch(`/api/practices?id=${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        setMessage({ type: 'success', text: '删除成功' })
        fetchPractices()
      } else {
        setMessage({ type: 'error', text: data.error || '删除失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误' })
    }

    setTimeout(() => setMessage(null), 3000)
  }

  const resetForm = () => {
    setFormData({ title: '', content: '', source_url: '', type: 'link' })
    setEditing(null)
    setShowForm(false)
  }

  if (isLoading || loading) {
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
        className="flex items-center justify-between mb-8"
      >
        <div>
          <Link href="/admin" className="text-violet-400 hover:text-violet-300 text-sm">
            ← 返回仪表盘
          </Link>
          <h1 className="text-3xl font-bold mt-2 mb-2 text-slate-100">AI优秀实践管理</h1>
          <p className="text-slate-400">管理链接和文章内容</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium hover:from-violet-600 hover:to-purple-600 transition-all duration-200"
        >
          {showForm ? '取消' : '+ 添加新内容'}
        </motion.button>
      </motion.div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">类型</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="link"
                      checked={formData.type === 'link'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'link' | 'article' })}
                      className="w-4 h-4 text-violet-500"
                    />
                    <span className="text-slate-300">链接</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="article"
                      checked={formData.type === 'article'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'link' | 'article' })}
                      className="w-4 h-4 text-violet-500"
                    />
                    <span className="text-slate-300">文章</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              {formData.type === 'link' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">链接URL</label>
                  <input
                    type="url"
                    value={formData.source_url}
                    onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">内容</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                >
                  {editing ? '更新' : '创建'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                >
                  取消
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="space-y-4">
        {practices.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            暂无内容，点击上方按钮添加
          </div>
        ) : (
          practices.map((practice, index) => (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    practice.type === 'link' ? 'bg-violet-500/10 text-violet-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {practice.type === 'link' ? '链接' : '文章'}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-100">{practice.title}</h3>
                </div>
                {practice.type === 'link' ? (
                  <a href={practice.source_url!} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 text-sm">
                    {practice.source_url}
                  </a>
                ) : (
                  <p className="text-slate-400 text-sm line-clamp-2">{practice.content}</p>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(practice)}
                  className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm transition-colors"
                >
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(practice.id)}
                  className="px-3 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm transition-colors"
                >
                  删除
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
