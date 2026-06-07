import { areAdsEnabled } from '@/lib/ads';

export type AdsterraAtOptions = {
  key: string;
  format: 'iframe';
  height: number;
  width: number;
  params: Record<string, unknown>;
};

export type AdsterraSlot = {
  id: string;
  atOptions: AdsterraAtOptions;
  scriptSrc: string;
};

export type AdsterraSlots = {
  enabled: boolean;
  leftRail: AdsterraSlot | null;
  rightRail: AdsterraSlot | null;
  stickyBottomPhone: AdsterraSlot | null;
  stickyBottomSmallTablet: AdsterraSlot | null;
  stickyBottomTablet: AdsterraSlot | null;
};

const DEFAULT_SCRIPT_HOST = 'www.highperformanceformat.com';

function parseIntEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function buildScriptSrc(key: string, host: string): string {
  const normalizedHost = host.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return `https://${normalizedHost}/${key}/invoke.js`;
}

function buildSlot(
  id: string,
  key: string | undefined,
  width: number,
  height: number,
  scriptHost: string,
): AdsterraSlot | null {
  const trimmedKey = key?.trim();
  if (!trimmedKey) return null;

  const atOptions: AdsterraAtOptions = {
    key: trimmedKey,
    format: 'iframe',
    width,
    height,
    params: {},
  };

  return {
    id,
    atOptions,
    scriptSrc: buildScriptSrc(trimmedKey, scriptHost),
  };
}

export function getAdsterraSlots(): AdsterraSlots {
  const enabled =
    areAdsEnabled() && process.env.NEXT_PUBLIC_ADSTERRA_ENABLED !== 'false';
  const scriptHost =
    process.env.NEXT_PUBLIC_ADSTERRA_SCRIPT_HOST?.trim() ||
    DEFAULT_SCRIPT_HOST;

  const sideWidth = parseIntEnv('NEXT_PUBLIC_ADSTERRA_SIDE_WIDTH', 160);
  const sideHeight = parseIntEnv('NEXT_PUBLIC_ADSTERRA_SIDE_HEIGHT', 600);
  const bottomPhoneWidth = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_PHONE_WIDTH',
    320,
  );
  const bottomPhoneHeight = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_PHONE_HEIGHT',
    50,
  );
  const bottomSmallTabletWidth = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_SMALL_TABLET_WIDTH',
    468,
  );
  const bottomSmallTabletHeight = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_SMALL_TABLET_HEIGHT',
    60,
  );
  const bottomTabletWidth = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_TABLET_WIDTH',
    728,
  );
  const bottomTabletHeight = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_TABLET_HEIGHT',
    90,
  );

  const leftRail = buildSlot(
    'left-rail',
    '01066605ce3288fe33004b1025506f81',
    sideWidth,
    sideHeight,
    scriptHost,
  );
  const rightRail = buildSlot(
    'right-rail',
    '01066605ce3288fe33004b1025506f81',
    sideWidth,
    sideHeight,
    scriptHost,
  );
  const stickyBottomPhone = buildSlot(
    'sticky-bottom-phone',
    'd1999258ab11acd00c51ba71a7fa5f99',
    bottomPhoneWidth,
    bottomPhoneHeight,
    scriptHost,
  );
  const stickyBottomSmallTablet = buildSlot(
    'sticky-bottom-small-tablet',
    '7797b4092fe93fda6984651def3939ef',
    bottomSmallTabletWidth,
    bottomSmallTabletHeight,
    scriptHost,
  );
  const stickyBottomTablet = buildSlot(
    'sticky-bottom-tablet',
    'aa3832a16a4b341d98a87586deef0a2c',
    bottomTabletWidth,
    bottomTabletHeight,
    scriptHost,
  );

  const hasAnySlot = Boolean(
    leftRail ||
      rightRail ||
      stickyBottomPhone ||
      stickyBottomSmallTablet ||
      stickyBottomTablet,
  );

  return {
    enabled: enabled && hasAnySlot,
    leftRail,
    rightRail,
    stickyBottomPhone,
    stickyBottomSmallTablet,
    stickyBottomTablet,
  };
}
