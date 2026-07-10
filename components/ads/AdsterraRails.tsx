'use client';

import { useEffect, useState } from 'react';
import type { AdsterraSlot } from '@/lib/adsterra';
import { AdUnit } from './AdUnit';

const LG_BREAKPOINT = 1024; // matches Tailwind's `lg`

function useIsLg(): boolean {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isLg;
}

type AdsterraRailProps = {
  slot: AdsterraSlot;
  label: string;
  sideWidth?: number;
  side: 'left' | 'right';
};

/** Side rail — only mounted on lg+ so invoke.js never runs while hidden. */
export function AdsterraRail({
  slot,
  label,
  sideWidth,
  side,
}: AdsterraRailProps) {
  const isLg = useIsLg();

  if (!isLg) return null;

  const borderClass =
    side === 'left'
      ? 'border-r border-border/60'
      : 'border-l border-border/60';

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col items-center bg-muted/20 py-4 ${borderClass}`}
      style={sideWidth ? { width: sideWidth + 32 } : undefined}
      role="complementary"
      aria-label="Advertisement"
    >
      <AdUnit slot={slot} label={label} labelAlign="start" />
    </aside>
  );
}
