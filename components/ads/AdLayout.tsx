import { getAdsterraSlots } from '@/lib/adsterra';
import { AdsterraRail } from './AdsterraRails';

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
        <AdsterraRail
          slot={slots.leftRail}
          label={adLabel}
          sideWidth={sideWidth}
          side="left"
        />
      )}

      <div className="min-w-0 flex-1">{children}</div>

      {slots.rightRail && (
        <AdsterraRail
          slot={slots.rightRail}
          label={adLabel}
          sideWidth={sideWidth}
          side="right"
        />
      )}
    </div>
  );
}
