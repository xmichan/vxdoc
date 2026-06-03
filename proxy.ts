import { docsContentRoute, docsRoute } from '@/lib/shared';
import { i18n } from '@/lib/i18n';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const handleI18n = createI18nMiddleware(i18n);

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const i18nResponse = await handleI18n(request, event);
  if (
    i18nResponse &&
    (i18nResponse.headers.has('x-middleware-rewrite') ||
      (i18nResponse.status >= 300 && i18nResponse.status < 400))
  ) {
    return i18nResponse;
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const rewritten = rewriteDocs(request.nextUrl.pathname);

    if (rewritten) {
      return NextResponse.rewrite(new URL(rewritten, request.nextUrl));
    }
  }

  return i18nResponse ?? NextResponse.next();
}

export const config = {
  matcher: ['/docs', '/docs/:path*', '/zh/docs', '/zh/docs/:path*'],
};
