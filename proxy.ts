import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export default function proxy(request: NextRequest): NextResponse<unknown> {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || /\.(.*)$/.test(pathname)) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}
