import { db } from '@/lib/supabase'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

async function getImages() {
  try {
    return await db.getImages()
  } catch (error) {
    console.error('Error fetching images:', error)
    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const images = await getImages()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          AI图片流
        </h1>
        <p className="text-slate-400">
          优秀的AI生成图片，附带提示词和模型信息
        </p>
      </motion.div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-slate-400 text-lg">暂无图片</p>
          <p className="text-slate-500 text-sm mt-2">
            管理员可以通过管理后台添加图片
          </p>
        </motion.div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image: any, index: number) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid"
            >
              <div className="group relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-fuchsia-500/50 transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">
                    {image.title}
                  </h3>

                  {image.model_info && (
                    <div className="inline-flex items-center px-2 py-1 rounded-md bg-fuchsia-500/10 text-fuchsia-400 text-xs mb-2">
                      {image.model_info}
                    </div>
                  )}

                  {image.prompt && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-800/50">
                      <p className="text-xs text-slate-400 line-clamp-3">
                        {image.prompt}
                      </p>
                    </div>
                  )}

                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {image.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
