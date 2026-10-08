export function areAdsEnabled(): boolean {
  return false;
  return process.env.NODE_ENV !== 'development';
}
