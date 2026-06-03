type YouTubeProps = {
  /** YouTube video ID (e.g. `xarHLgNEbkM`) or full watch URL */
  id: string;
  title?: string;
};

function parseVideoId(id: string): string {
  try {
    const url = new URL(id);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.slice(1).split('/')[0] ?? id;
    }
    return url.searchParams.get('v') ?? id;
  } catch {
    return id;
  }
}

export function YouTube({ id, title = 'YouTube video' }: YouTubeProps) {
  const videoId = parseVideoId(id);

  return (
    <div className="relative my-4 aspect-video w-full overflow-hidden rounded-lg border bg-fd-muted">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
