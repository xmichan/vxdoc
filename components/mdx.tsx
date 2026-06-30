import { GitHubRepoButton } from '@/components/github-repo-button';
import { ProtoField } from '@/components/proto-field';
import { Screenshot } from '@/components/screenshot';
import { YouTube } from '@/components/youtube';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    GitHubRepoButton,
    ProtoField,
    Screenshot,
    YouTube,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
