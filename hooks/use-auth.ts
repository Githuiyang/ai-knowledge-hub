'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify')
      const data = await response.json()

      if (response.ok && data.isAuthenticated) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to verify authentication'
      })
    }
  }

  const login = async (password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (response.ok) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
        router.push('/admin')
        return { success: true }
      } else {
        const error = data.error || 'Login failed'
        setAuthState(prev => ({
          ...prev,
          error
        }))
        return { success: false, error }
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.'
      setAuthState(prev => ({
        ...prev,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    ...authState,
    login,
    logout,
    refreshAuth: checkAuth
  }
}
