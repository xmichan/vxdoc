import { getAdsterraSlots } from '@/lib/adsterra';
import { AdsterraBanner } from './AdsterraBanner';
import { cn } from '@/lib/cn';

const STICKY_BAR_PADDING_Y = 8;

export function AdLayout({ children }: { children: React.ReactNode }) {
  const slots = getAdsterraSlots();

  if (!slots.enabled) {
    return children;
  }

  const sideWidth =
    slots.leftRail?.atOptions.width ?? slots.rightRail?.atOptions.width;
  const stickyBottomHeight = Math.max(
    slots.stickyBottomPhone?.atOptions.height ?? 0,
    slots.stickyBottomSmallTablet?.atOptions.height ?? 0,
    slots.stickyBottomTablet?.atOptions.height ?? 0,
  )
    ? Math.max(
        slots.stickyBottomPhone?.atOptions.height ?? 0,
        slots.stickyBottomSmallTablet?.atOptions.height ?? 0,
        slots.stickyBottomTablet?.atOptions.height ?? 0,
      ) +
      STICKY_BAR_PADDING_Y * 2
    : 0;
  const hasStickyBottom = Boolean(
    slots.stickyBottomPhone ||
      slots.stickyBottomSmallTablet ||
      slots.stickyBottomTablet,
  );

  return (
    <div className="flex min-h-full flex-col">
      <div
        className={cn(
          'flex min-h-0 flex-1',
          hasStickyBottom && 'max-lg:pb-(--ad-sticky-bottom-height)',
        )}
        style={
          hasStickyBottom
            ? ({
                '--ad-sticky-bottom-height': `${stickyBottomHeight}px`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {slots.leftRail && (
          <aside
            className="sticky top-0 hidden h-screen shrink-0 items-start justify-center border-r border-border/60 bg-muted/20 py-4 lg:flex"
            style={sideWidth ? { width: sideWidth + 32 } : undefined}
            aria-label="Advertisement"
          >
            <AdsterraBanner slot={slots.leftRail} />
          </aside>
        )}

        <div className="min-w-0 flex-1">{children}</div>

        {slots.rightRail && (
          <aside
            className="sticky top-0 hidden h-screen shrink-0 items-start justify-center border-l border-border/60 bg-muted/20 py-4 lg:flex"
            style={sideWidth ? { width: sideWidth + 32 } : undefined}
            aria-label="Advertisement"
          >
            <AdsterraBanner slot={slots.rightRail} />
          </aside>
        )}
      </div>

      {hasStickyBottom && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 flex justify-center border-t border-border/60 bg-background/95 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm supports-[padding:max(0px)]:pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
          aria-label="Advertisement"
        >
          {slots.stickyBottomPhone && (
            <AdsterraBanner
              slot={slots.stickyBottomPhone}
              className="mx-auto max-w-full sm:hidden"
            />
          )}
          {slots.stickyBottomSmallTablet && (
            <AdsterraBanner
              slot={slots.stickyBottomSmallTablet}
              className="mx-auto hidden max-w-full sm:block md:hidden"
            />
          )}
          {slots.stickyBottomTablet && (
            <AdsterraBanner
              slot={slots.stickyBottomTablet}
              className="mx-auto hidden max-w-full md:block lg:hidden"
            />
          )}
        </div>
      )}
    </div>
  );
}
