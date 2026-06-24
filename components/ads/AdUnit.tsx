import { AdsterraBanner } from './AdsterraBanner';
import type { AdsterraSlot } from '@/lib/adsterra';
import { cn } from '@/lib/cn';

type AdUnitProps = {
  slot: AdsterraSlot;
  label: string;
  className?: string;
  labelAlign?: 'start' | 'center';
};

export function AdUnit({
  slot,
  label,
  className,
  labelAlign = 'center',
}: AdUnitProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1.5',
        labelAlign === 'start' ? 'items-start' : 'items-center',
        className,
      )}
    >
      <span
        className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
        aria-hidden="true"
      >
        {label}
      </span>
      <AdsterraBanner slot={slot} className="mx-auto max-w-full" />
    </div>
  );
}
