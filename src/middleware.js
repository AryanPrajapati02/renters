'use server'
import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/room']
const publicRoutes = ['/auth/user/login', '/auth/user/register', '/']
 
export default async function middleware(request) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('token')?.value || ""

  
  if(cookie == ""){
    return NextResponse.redirect(new URL('/auth/user/login', request.nextUrl))
 }
  
  
  
 
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/auth/user/login', request.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
   cookie &&
    !request.nextUrl.pathname.startsWith('/room')
  ) {
    return NextResponse.redirect(new URL('/room', request.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: [  '/room' , '/auth/user/register ', '/auth/user/login'],
}