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
  inContentPhone: AdsterraSlot | null;
  inContentSmallTablet: AdsterraSlot | null;
  inContentTablet: AdsterraSlot | null;
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
  const inContentPhoneWidth = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_PHONE_WIDTH',
    320,
  );
  const inContentPhoneHeight = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_PHONE_HEIGHT',
    50,
  );
  const inContentSmallTabletWidth = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_SMALL_TABLET_WIDTH',
    468,
  );
  const inContentSmallTabletHeight = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_SMALL_TABLET_HEIGHT',
    60,
  );
  const inContentTabletWidth = parseIntEnv(
    'NEXT_PUBLIC_ADSTERRA_BOTTOM_TABLET_WIDTH',
    728,
  );
  const inContentTabletHeight = parseIntEnv(
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
  const inContentPhone = buildSlot(
    'in-content-phone',
    'd1999258ab11acd00c51ba71a7fa5f99',
    inContentPhoneWidth,
    inContentPhoneHeight,
    scriptHost,
  );
  const inContentSmallTablet = buildSlot(
    'in-content-small-tablet',
    '7797b4092fe93fda6984651def3939ef',
    inContentSmallTabletWidth,
    inContentSmallTabletHeight,
    scriptHost,
  );
  const inContentTablet = buildSlot(
    'in-content-tablet',
    'aa3832a16a4b341d98a87586deef0a2c',
    inContentTabletWidth,
    inContentTabletHeight,
    scriptHost,
  );

  const hasAnySlot = Boolean(
    leftRail ||
      rightRail ||
      inContentPhone ||
      inContentSmallTablet ||
      inContentTablet,
  );

  return {
    enabled: enabled && hasAnySlot,
    leftRail,
    rightRail,
    inContentPhone,
    inContentSmallTablet,
    inContentTablet,
  };
}
