import { areAdsEnabled } from '@/lib/ads';
import './global.css';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {areAdsEnabled() && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8299409632430664"
            crossOrigin="anonymous"
          />
        )}
        {areAdsEnabled() && (
          <script src="https://pl30407483.effectivecpmnetwork.com/b1/f4/af/b1f4af572d332b3341e151d37c9ad979.js" />
        )}
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
        {areAdsEnabled() && (
          <script src="https://pl30407484.effectivecpmnetwork.com/76/ce/04/76ce040dfa71ee60e37f17077ab2811a.js" />
        )}
      </body>
    </html>
  );
}
