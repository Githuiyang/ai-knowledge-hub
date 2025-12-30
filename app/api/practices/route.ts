import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { AIPracticeInsert } from '@/types'

// GET all practices
export async function GET() {
  try {
    const practices = await db.getPractices()
    return NextResponse.json({
      success: true,
      data: practices
    })
  } catch (error) {
    console.error('Error fetching practices:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch practices' },
      { status: 500 }
    )
  }
}

// POST create practice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.type) {
      return NextResponse.json(
        { success: false, error: 'Title and type are required' },
        { status: 400 }
      )
    }

    // Validate type
    if (!['link', 'article'].includes(body.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid type. Must be "link" or "article"' },
        { status: 400 }
      )
    }

    // For link type, source_url is required
    if (body.type === 'link' && !body.source_url) {
      return NextResponse.json(
        { success: false, error: 'Source URL is required for link type' },
        { status: 400 }
      )
    }

    const practiceData: AIPracticeInsert = {
      title: body.title,
      type: body.type,
      content: body.content || null,
      source_url: body.source_url || null,
      sort_order: body.sort_order || 0
    }

    const practice = await db.createPractice(practiceData)

    return NextResponse.json({
      success: true,
      data: practice
    })
  } catch (error) {
    console.error('Error creating practice:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create practice' },
      { status: 500 }
    )
  }
}

// PUT update practice
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Practice ID is required' },
        { status: 400 }
      )
    }

    const updates: Partial<AIPracticeInsert> = {
      title: body.title,
      content: body.content || null,
      source_url: body.source_url || null,
      type: body.type,
      sort_order: body.sort_order
    }

    const practice = await db.updatePractice(body.id, updates)

    return NextResponse.json({
      success: true,
      data: practice
    })
  } catch (error) {
    console.error('Error updating practice:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update practice' },
      { status: 500 }
    )
  }
}

// DELETE practice
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Practice ID is required' },
        { status: 400 }
      )
    }

    await db.deletePractice(id)

    return NextResponse.json({
      success: true,
      message: 'Practice deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting practice:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete practice' },
      { status: 500 }
    )
  }
}
