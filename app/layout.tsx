import './global.css';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8299409632430664"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
