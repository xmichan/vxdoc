import { getAdsterraSlots } from '@/lib/adsterra';
import { AdUnit } from './AdUnit';

type AdLayoutProps = {
  children: React.ReactNode;
  adLabel: string;
};

export function AdLayout({ children, adLabel }: AdLayoutProps) {
  const slots = getAdsterraSlots();

  if (!slots.enabled) {
    return children;
  }

  const sideWidth =
    slots.leftRail?.atOptions.width ?? slots.rightRail?.atOptions.width;

  return (
    <div className="flex min-h-full">
      {slots.leftRail && (
        <aside
          className="sticky top-0 hidden h-screen shrink-0 flex-col items-center border-r border-border/60 bg-muted/20 py-4 lg:flex"
          style={sideWidth ? { width: sideWidth + 32 } : undefined}
          role="complementary"
          aria-label="Advertisement"
        >
          <AdUnit slot={slots.leftRail} label={adLabel} labelAlign="start" />
        </aside>
      )}

      <div className="min-w-0 flex-1">{children}</div>

      {slots.rightRail && (
        <aside
          className="sticky top-0 hidden h-screen shrink-0 flex-col items-center border-l border-border/60 bg-muted/20 py-4 lg:flex"
          style={sideWidth ? { width: sideWidth + 32 } : undefined}
          role="complementary"
          aria-label="Advertisement"
        >
          <AdUnit slot={slots.rightRail} label={adLabel} labelAlign="start" />
        </aside>
      )}
    </div>
  );
}
