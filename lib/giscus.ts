import type { AvailableLanguage } from '@giscus/react';
import type { Locale } from './i18n';
import { gitConfig } from './shared';

/** Giscus UI language codes (not the same as site locale slugs). */
const giscusLangByLocale: Record<Locale, AvailableLanguage> = {
  en: 'en',
  zh: 'zh-CN',
};

export function giscusLang(locale: Locale): AvailableLanguage {
  return giscusLangByLocale[locale];
}

export const giscusRepo = `${gitConfig.user}/${gitConfig.repo}` as const;

export const giscusConfig = {
  repo: giscusRepo,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? '',
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? 'General',
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? '',
};

export function isGiscusConfigured(): boolean {
  return Boolean(giscusConfig.repoId && giscusConfig.categoryId);
}
