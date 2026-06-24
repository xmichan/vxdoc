import { getAdsterraSlots } from '@/lib/adsterra';
import { AdUnit } from './AdUnit';
import { cn } from '@/lib/cn';

type InContentAdProps = {
  label: string;
  className?: string;
};

export function InContentAd({ label, className }: InContentAdProps) {
  const slots = getAdsterraSlots();
  const hasInContent = Boolean(
    slots.inContentPhone ||
      slots.inContentSmallTablet ||
      slots.inContentTablet,
  );

  if (!slots.enabled || !hasInContent) {
    return null;
  }

  return (
    <div
      className={cn('flex justify-center py-8 lg:hidden', className)}
      role="complementary"
      aria-label="Advertisement"
    >
      {slots.inContentPhone && (
        <AdUnit
          slot={slots.inContentPhone}
          label={label}
          className="mx-auto max-w-full sm:hidden"
        />
      )}
      {slots.inContentSmallTablet && (
        <AdUnit
          slot={slots.inContentSmallTablet}
          label={label}
          className="mx-auto hidden max-w-full sm:flex md:hidden"
        />
      )}
      {slots.inContentTablet && (
        <AdUnit
          slot={slots.inContentTablet}
          label={label}
          className="mx-auto hidden max-w-full md:flex lg:hidden"
        />
      )}
    </div>
  );
}
