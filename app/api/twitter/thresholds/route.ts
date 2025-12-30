import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

// GET thresholds
export async function GET() {
  try {
    const thresholds = await db.getThresholds()

    return NextResponse.json({
      success: true,
      data: thresholds || {
        min_likes: 100,
        min_retweets: 50,
        min_replies: 20,
        min_bookmarks: 0,
        is_active: true
      }
    })
  } catch (error) {
    console.error('Error fetching thresholds:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch thresholds' },
      { status: 500 }
    )
  }
}

// PUT update thresholds
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const thresholds = {
      min_likes: body.min_likes || 0,
      min_retweets: body.min_retweets || 0,
      min_replies: body.min_replies || 0,
      min_bookmarks: body.min_bookmarks || 0,
      is_active: body.is_active ?? true
    }

    const result = await db.updateThresholds(thresholds)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error updating thresholds:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update thresholds' },
      { status: 500 }
    )
  }
}
