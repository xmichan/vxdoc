type ScreenshotProps = {
  src: string;
  alt: string;
};

export function Screenshot({ src, alt }: ScreenshotProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="my-3 w-full max-w-xs rounded-lg border bg-fd-muted sm:max-w-sm"
      loading="lazy"
    />
  );
}
