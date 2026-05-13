// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow access to login page
  if (pathname === '/adm@ccadm/login') {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith('/adm@ccadm')) {
    const token = req.cookies.get('admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/adm@ccadm/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adm@ccadm/:path*'],
};
