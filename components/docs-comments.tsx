'use client';

import { giscusConfig, giscusLang, isGiscusConfigured } from '@/lib/giscus';
import type { Locale } from '@/lib/i18n';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

const commentsTitle: Record<Locale, string> = {
  en: 'Comments',
  zh: '评论',
};

export function DocsComments({ locale }: { locale: Locale }) {
  const { resolvedTheme } = useTheme();

  if (!isGiscusConfigured()) {
    return null;
  }

  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <section className="not-prose mt-10 border-t pt-8">
      <h2 className="mb-4 text-lg font-semibold text-fd-foreground">
        {commentsTitle[locale]}
      </h2>
      <Giscus
        key={locale}
        repo={giscusConfig.repo}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang={giscusLang(locale)}
        loading="lazy"
      />
    </section>
  );
}
