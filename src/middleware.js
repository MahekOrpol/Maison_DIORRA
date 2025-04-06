import { NextResponse } from 'next/server';

const protectedRoutes = ['/account', '/checkout'];

export default function middleware(req) {
  const token = req.cookies.get('token')?.value;
  console.log('middle hit');
  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*']
};
