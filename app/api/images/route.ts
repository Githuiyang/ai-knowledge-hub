import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { AIImageInsert } from '@/types'

// GET all images
export async function GET() {
  try {
    const images = await db.getImages()
    return NextResponse.json({
      success: true,
      data: images
    })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

// POST create image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.image_url) {
      return NextResponse.json(
        { success: false, error: 'Title and image_url are required' },
        { status: 400 }
      )
    }

    const imageData: AIImageInsert = {
      title: body.title,
      image_url: body.image_url,
      prompt: body.prompt || null,
      model_info: body.model_info || null,
      tags: body.tags || null,
      sort_order: body.sort_order || 0
    }

    const image = await db.createImage(imageData)

    return NextResponse.json({
      success: true,
      data: image
    })
  } catch (error) {
    console.error('Error creating image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create image' },
      { status: 500 }
    )
  }
}

// DELETE image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      )
    }

    await db.deleteImage(id)

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
