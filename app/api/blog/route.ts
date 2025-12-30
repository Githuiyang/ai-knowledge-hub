import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { BlogPostInsert } from '@/types'

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') !== 'false'

    const posts = await db.getBlogPosts(publishedOnly)
    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST create blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const postData: BlogPostInsert = {
      title: body.title,
      content: body.content,
      summary: body.summary || null,
      cover_image: body.cover_image || null,
      tags: body.tags || null,
      published: body.published ?? false
    }

    const post = await db.createBlogPost(postData)

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

// PUT update blog post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Blog post ID is required' },
        { status: 400 }
      )
    }

    const updates: Partial<BlogPostInsert> = {
      title: body.title,
      content: body.content,
      summary: body.summary || null,
      cover_image: body.cover_image || null,
      tags: body.tags || null,
      published: body.published ?? false
    }

    const post = await db.updateBlogPost(body.id, updates)

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog post ID is required' },
        { status: 400 }
      )
    }

    await db.deleteBlogPost(id)

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
