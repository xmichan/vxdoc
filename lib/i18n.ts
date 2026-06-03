import { defineI18n } from 'fumadocs-core/i18n';
import { defaultTranslations, uiTranslations } from 'fumadocs-ui/i18n';

export const i18n = defineI18n({
  languages: ['en', 'zh'],
  defaultLanguage: 'en',
  hideLocale: 'default-locale',
  parser: 'dir',
  fallbackLanguage: 'en',
});

export const zhTranslations = {
  displayName: '中文',
  search: '搜索',
  searchNoResult: '未找到结果',
  searchOpen: '打开搜索',
  searchClose: '关闭搜索',
  toc: '本页目录',
  tocNoHeadings: '无标题',
  tocInline: '目录',
  lastUpdate: '最后更新于',
  chooseLanguage: '选择语言',
  nextPage: '下一页',
  previousPage: '上一页',
  chooseTheme: '主题',
  editOnGithub: '在 GitHub 上编辑',
  themeToggle: '切换主题',
  themeLight: '浅色',
  themeDark: '深色',
  themeSystem: '跟随系统',
  codeBlockCopy: '复制',
  codeBlockCopied: '已复制',
  accordionCopyAnchor: '复制链接',
  headingCopyAnchor: '复制锚点链接',
  bannerClose: '关闭',
  menuToggle: '菜单',
  pageActionsCopyMarkdown: '复制 Markdown',
  pageActionsOpen: '打开',
  pageActionsOpenGitHub: '在 GitHub 中打开',
  pageActionsViewMarkdown: '查看 Markdown',
  pageActionsOpenScira: '在 Scira AI 中打开',
  pageActionsOpenChatGPT: '在 ChatGPT 中打开',
  pageActionsOpenClaude: '在 Claude 中打开',
  pageActionsOpenCursor: '在 Cursor 中打开',
  pageActionsOpenInLLMPrompt: '阅读 {url}，我想就此提问。',
  sidebarOpen: '打开侧边栏',
  sidebarCollapse: '收起侧边栏',
  typeTableProp: '属性',
  typeTableType: '类型',
  typeTableDefault: '默认值',
  typeTableParameters: '参数',
  typeTableReturns: '返回值',
  notFoundTitle: '页面未找到',
  notFoundDescription: '您访问的页面可能已被移除、更名或暂时不可用。',
  notFoundLink: '返回首页',
} satisfies Partial<typeof defaultTranslations>;

export const i18nTranslations = i18n
  .translations()
  .extend(uiTranslations())
  .add('ui', {
    en: { displayName: 'English' },
    zh: zhTranslations,
  });

export type Locale = (typeof i18n)['languages'][number];
