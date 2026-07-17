type AdDisclaimerProps = {
  text: string;
};

export function AdDisclaimer({ text }: AdDisclaimerProps) {
  return (
    <p className="border-t border-fd-border px-4 py-3 text-center text-xs text-fd-muted-foreground">
      {text}
    </p>
  );
}
