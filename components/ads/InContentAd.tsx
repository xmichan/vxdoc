'use client';

import { useEffect, useState } from 'react';
import { getAdsterraSlots, type AdsterraSlot } from '@/lib/adsterra';
import { AdUnit } from './AdUnit';
import { cn } from '@/lib/cn';

type InContentAdProps = {
  label: string;
  className?: string;
};

/** Matches Tailwind: phone < sm, small-tablet sm–md, tablet md–lg, none at lg+. */
type InContentBreakpoint = 'phone' | 'small-tablet' | 'tablet';

const SM = 640;
const MD = 768;
const LG = 1024;

function resolveBreakpoint(width: number): InContentBreakpoint | null {
  if (width >= LG) return null;
  if (width >= MD) return 'tablet';
  if (width >= SM) return 'small-tablet';
  return 'phone';
}

function useInContentBreakpoint(): InContentBreakpoint | null {
  const [breakpoint, setBreakpoint] = useState<InContentBreakpoint | null>(
    null,
  );

  useEffect(() => {
    const update = () => setBreakpoint(resolveBreakpoint(window.innerWidth));
    update();

    const mqSm = window.matchMedia(`(min-width: ${SM}px)`);
    const mqMd = window.matchMedia(`(min-width: ${MD}px)`);
    const mqLg = window.matchMedia(`(min-width: ${LG}px)`);
    mqSm.addEventListener('change', update);
    mqMd.addEventListener('change', update);
    mqLg.addEventListener('change', update);
    return () => {
      mqSm.removeEventListener('change', update);
      mqMd.removeEventListener('change', update);
      mqLg.removeEventListener('change', update);
    };
  }, []);

  return breakpoint;
}

function pickSlot(
  breakpoint: InContentBreakpoint,
  slots: ReturnType<typeof getAdsterraSlots>,
): AdsterraSlot | null {
  if (breakpoint === 'phone') return slots.inContentPhone;
  if (breakpoint === 'small-tablet') return slots.inContentSmallTablet;
  return slots.inContentTablet;
}

export function InContentAd({ label, className }: InContentAdProps) {
  const breakpoint = useInContentBreakpoint();
  const slots = getAdsterraSlots();

  if (!slots.enabled || breakpoint === null) {
    return null;
  }

  const slot = pickSlot(breakpoint, slots);
  if (!slot) {
    return null;
  }

  return (
    <div
      className={cn('flex justify-center py-8', className)}
      role="complementary"
      aria-label="Advertisement"
    >
      <AdUnit slot={slot} label={label} className="mx-auto max-w-full" />
    </div>
  );
}
