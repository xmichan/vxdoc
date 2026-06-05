'use client';

import type { Locale } from '@/lib/i18n';
import {
  isProtoMessageType,
  resolveProtoTypeHref,
  splitProtoType,
} from '@/lib/proto-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export interface ProtoFieldProps {
  name: string;
  type?: string;
  /** Override auto-resolved type link. */
  href?: string;
  children?: ReactNode;
}

function localeFromPathname(pathname: string): Locale {
  return pathname.startsWith('/zh/') ? 'zh' : 'en';
}

function TypeLabel({
  type,
  href,
  locale,
}: {
  type: string;
  href?: string;
  locale: Locale;
}) {
  const { base, suffix } = splitProtoType(type);
  const resolvedHref = href ?? resolveProtoTypeHref(type, locale);
  const linkable = Boolean(resolvedHref) && isProtoMessageType(type);

  return (
    <span className="inline-flex items-baseline font-mono text-xs">
      {linkable && resolvedHref ? (
        <Link
          href={resolvedHref}
          className="text-fd-muted-foreground underline decoration-fd-border underline-offset-2 transition-colors hover:text-fd-primary hover:decoration-fd-primary/40"
        >
          {base}
        </Link>
      ) : (
        <span className="text-fd-muted-foreground">{base}</span>
      )}
      {suffix ? (
        <span className="text-fd-muted-foreground">{suffix}</span>
      ) : null}
    </span>
  );
}

export function ProtoField({ name, type, href, children }: ProtoFieldProps) {
  const locale = localeFromPathname(usePathname());

  return (
    <div className="not-prose my-4 border-l-[3px] border-fd-primary/25 pl-4">
      <code className="inline-block rounded-md bg-fd-muted py-0.5 font-mono text-lg font-bold tracking-tight text-fd-foreground">
        {name}
      </code>
      {type ? (
        <div className="mt-1 font-mono text-xs text-fd-muted-foreground">
          <TypeLabel type={type} href={href} locale={locale} />
        </div>
      ) : null}
      {children ? (
        <div className="mt-2 text-sm leading-relaxed text-fd-foreground [&_a]:text-fd-primary [&_a]:underline [&_a]:decoration-fd-border [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-fd-muted [&_code]:px-1 [&_code]:py-px [&_code]:font-mono [&_code]:text-xs [&_code]:font-normal">
          {children}
        </div>
      ) : null}
    </div>
  );
}
