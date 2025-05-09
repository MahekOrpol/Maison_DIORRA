import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define your protected and public routes
const protectedRoutes = ['/account', '/checkout'];
// const publicRoutes = ['/'];

// Secret key to verify JWT (same as used to sign the token)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  // Check if route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next(); // allow public

  // Check for token in cookies
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // If no token and protected route → redirect to login
    return NextResponse.rewrite(new URL('/login', req.url));
  }

  // Verify token
  try {
    await jwtVerify(token, JWT_SECRET); // throws if invalid
    return NextResponse.next();
  } catch (err) {
    console.warn('Invalid token', err);
    return NextResponse.rewrite(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    /*
      Apply middleware to all pages, excluding public/static/api by pattern
    */
    '/((?!_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webpapi/auth).*)'
  ]
};
