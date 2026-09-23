import { areAdsEnabled } from '@/lib/ads';
import './global.css';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {areAdsEnabled() && (
          <script data-cfasync="false" src="https://abscloud.org/1/b1f4af572d332b3341e151d37c9ad979"></script>
        )}
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
        {areAdsEnabled() && (
          <script data-cfasync="false" src="https://bauval.org/14/76ce040dfa71ee60e37f17077ab2811a"></script>
        )}
      </body>
    </html>
  );
}
