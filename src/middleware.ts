import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware will run on all requests
export function middleware(request: NextRequest) {
  // Add security headers
  const response = NextResponse.next();
  
  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Match all pages except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};