import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

// GET all twitter posts
export async function GET() {
  try {
    const posts = await db.getTwitterPosts()
    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error) {
    console.error('Error fetching twitter posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch twitter posts' },
      { status: 500 }
    )
  }
}

// DELETE twitter post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Twitter post ID is required' },
        { status: 400 }
      )
    }

    await db.deleteTwitterPost(id)

    return NextResponse.json({
      success: true,
      message: 'Twitter post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting twitter post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete twitter post' },
      { status: 500 }
    )
  }
}
