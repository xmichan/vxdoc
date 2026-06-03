import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import type { Locale } from './i18n';
import { appName, docsRoute } from './shared';

function docsHomeUrl(lang?: string) {
  return lang === 'zh' ? `/zh${docsRoute}` : docsRoute;
}

export function baseOptions(lang?: Locale): BaseLayoutProps {
  return {
    nav: {
      url: docsHomeUrl(lang),
      title: (
        <span className="inline-flex items-center gap-2">
          <Image src="/icon.png" alt="VX" width={24} height={24} />
          {appName}
        </span>
      ),
    },
    themeSwitch: { enabled: false },
  };
}
