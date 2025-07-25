import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenExpired } from './lib/isTokenExpired';
import { logout } from './api/auth';
import { axiosInstance } from './api/axios';


export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get('access-token')?.value;


  if(url === '/login'){
    if(token) return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (url.startsWith('/dashboard')) {
    if (token) {
      if (await isTokenExpired(token)===true) {
        const refreshToken = request.cookies.get('refresh-token')?.value
        try {
          const res = await axiosInstance.post(`/auth/refresh-token`, { refreshToken: refreshToken });
          if(res.status===200){
            const accessToken = res.data['access-token'];
            const response = NextResponse.next();
            response.cookies.set("access-token", accessToken, { httpOnly: true });
            return response; // Attach refreshed tokens
          }
          await logout()
          return NextResponse.redirect(new URL("/login", request.url))
        } catch {
            await logout()
            return NextResponse.redirect(new URL("/login", request.url));
        }
      }
    }
    if(!token) return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();  
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'], // Apply middleware to protected routes
};