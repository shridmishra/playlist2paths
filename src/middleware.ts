import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/(home)')) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (token && (
    request.nextUrl.pathname.startsWith('/signin') ||
    request.nextUrl.pathname.startsWith('/signup')
  )) {
    return NextResponse.redirect(new URL('/(home)', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/(paths)/:path*', '/signin', '/signup']
}