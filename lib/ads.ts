export function areAdsEnabled(): boolean {
  return process.env.NODE_ENV !== 'development';
}
