import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this'
)

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      )
    }

    try {
      // Verify JWT token
      await jwtVerify(token, JWT_SECRET)

      return NextResponse.json({
        isAuthenticated: true
      })
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
