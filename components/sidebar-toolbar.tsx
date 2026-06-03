'use client';

import { GitHubIcon } from '@/components/github-repo-button';
import { cn } from '@/lib/cn';
import { gitConfig } from '@/lib/shared';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

export function SidebarToolbar() {
  const href = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <div className="flex w-full items-center border bg-fd-secondary/50 p-0.5 pe-0 rounded-lg text-fd-muted-foreground">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub"
        className={cn(
          buttonVariants({ color: 'ghost', size: 'sm' }),
          'min-h-8 flex-1 justify-start rounded-md px-2',
        )}
      >
        <GitHubIcon />
      </a>
      <ThemeSwitch className="shrink-0 px-1 py-0 border-y-0 border-e-0 rounded-none *:rounded-md" />
    </div>
  );
}
