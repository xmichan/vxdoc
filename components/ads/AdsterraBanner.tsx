'use client';

import { useEffect, useRef } from 'react';
import type { AdsterraSlot } from '@/lib/adsterra';
import { cn } from '@/lib/cn';

type AdsterraBannerProps = {
  slot: AdsterraSlot;
  className?: string;
};

/** Serializes official Adsterra embeds so each unit's atOptions is set before invoke.js runs. */
let adLoadQueue: Promise<void> = Promise.resolve();

function enqueueAdLoad(task: () => Promise<void>): Promise<void> {
  adLoadQueue = adLoadQueue.then(task).catch(() => undefined);
  return adLoadQueue;
}

/**
 * Renders Adsterra's official body embed:
 * 1. inline script setting atOptions
 * 2. external invoke.js for the ad key
 * @see https://adsterra.com publishers → get code
 */
export function AdsterraBanner({ slot, className }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = slot.atOptions;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.dataset.adLoaded === 'true') {
      return;
    }

    let cancelled = false;

    enqueueAdLoad(
      () =>
        new Promise((resolve) => {
          if (cancelled) {
            resolve();
            return;
          }

          const optionsScript = document.createElement('script');
          optionsScript.text = `atOptions = ${JSON.stringify(slot.atOptions)};`;

          const invokeScript = document.createElement('script');
          invokeScript.src = slot.scriptSrc;
          invokeScript.async = true;
          invokeScript.onload = () => resolve();
          invokeScript.onerror = () => resolve();

          container.append(optionsScript, invokeScript);
          container.dataset.adLoaded = 'true';
        }),
    );

    return () => {
      cancelled = true;
    };
  }, [slot]);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
      style={{
        width: `min(100%, ${width}px)`,
        minHeight: height,
        maxWidth: '100%',
      }}
      aria-label="Advertisement"
    />
  );
}
