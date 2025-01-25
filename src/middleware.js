'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'


// 1. Specify protected and public routes
const protectedRoutes = ['/room' , '/profile' , '/wishlist' , '/post-room']
const publicRoutes = ['/auth/user/login', '/auth/user/register', '/']

export default async function middleware(request) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookieStore =await cookies()
  const token = cookieStore.get('token')?.value || ""
  let user = null
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      
      user = payload
   

    
    
    } catch (error) {
      console.error("JWT verification failed:", error)
    }
  }
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/user/login', request.nextUrl))
  }

  // 5. Redirect to /room if the user is authenticated and trying to access a public route
  if (isPublicRoute && token && !request.nextUrl.pathname.startsWith('/room')) {
    return NextResponse.redirect(new URL('/room', request.nextUrl))
  }
 

  const response = NextResponse.next()

  // Attach user data to the response headers
  if (user) {
    response.cookies.set('user', JSON.stringify(user), { httpOnly: true })
  }

  return response
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/room', '/auth/user/register', '/auth/user/login' , '/profile' , '/wishlist' , '/post-room'],
}