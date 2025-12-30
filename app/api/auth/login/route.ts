import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { db, supabase } from '@/lib/supabase'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this'
)

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Get admin config from database
    const adminConfig = await db.getAdminConfig()

    if (!adminConfig) {
      // Check if there's a default password in env
      const defaultPassword = process.env.ADMIN_PASSWORD
      if (defaultPassword && password === defaultPassword) {
        // Create admin config with hashed password
        const hash = bcrypt.hashSync(defaultPassword, 10)
        await supabase
          .from('admin_config')
          .insert({ id: 'default-config', password_hash: hash })
      } else {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    }

    // Verify password
    const isValid = bcrypt.compareSync(password, adminConfig?.password_hash || '')

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await new SignJWT({ isAuthenticated: true })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .setIssuedAt()
      .sign(JWT_SECRET)

    // Update session token in database
    if (adminConfig) {
      await db.updateAdminConfig({ session_token: token })
    }

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful'
    })

    // Set HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
