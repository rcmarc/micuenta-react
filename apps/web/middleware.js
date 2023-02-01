export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth)
     * - api/no-auth (Pass Recovery flow)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    '/((?!api/auth|api/no-auth|auth|_next/static|assets|_next/image|favicon.ico).*)',
  ],
};
