import { AdDisclaimer } from '@/components/ads/AdDisclaimer';
import { AdLayout } from '@/components/ads/AdLayout';
import { SetHtmlLang } from '@/components/set-html-lang';
import { areAdsEnabled } from '@/lib/ads';
import { adDisclaimers, adLabels, i18n, i18nTranslations } from '@/lib/i18n';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;

  if (!i18n.languages.includes(langParam as (typeof i18n.languages)[number])) {
    notFound();
  }

  const lang = langParam as (typeof i18n.languages)[number];
  const fontClass = lang === 'zh' ? notoSansSC.className : inter.className;
  const adLabel = adLabels[lang];

  return (
    <div className={`${fontClass} flex min-h-screen flex-col`}>
      <SetHtmlLang lang={lang} />
      <RootProvider i18n={i18nProvider(i18nTranslations, lang)}>
        <div className="flex min-h-0 flex-1 flex-col">
          <AdLayout adLabel={adLabel}>{children}</AdLayout>
        </div>
        {areAdsEnabled() && <AdDisclaimer text={adDisclaimers[lang]} />}
      </RootProvider>
    </div>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
