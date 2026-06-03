import { SidebarToolbar } from '@/components/sidebar-toolbar';
import type { Locale } from '@/lib/i18n';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export default async function Layout({
  children,
  params,
}: LayoutProps<'/[lang]/docs'>) {
  const { lang } = (await params) as { lang: Locale };

  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      sidebar={{ defaultOpenLevel: 1, footer: <SidebarToolbar /> }}
      {...baseOptions(lang)}
    >
      {children}
    </DocsLayout>
  );
}
