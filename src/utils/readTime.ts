// Minimal webpack type shim for require.context (avoids needing @types/webpack-env).
declare const require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): { keys(): string[]; (id: string): any };
};

// !! prefix bypasses all configured loaders (markdown-loader + html-loader) so we
// get the raw markdown text directly from raw-loader, which is already installed.
const contentContext = require.context('!!raw-loader!@/assets/content', false, /\.md$/);

const readTimeMap: Record<string, string> = {};

contentContext.keys().forEach((key: string) => {
  const mod = contentContext(key);
  // raw-loader v4 exports { default: "raw string" }
  const raw: string = typeof mod === 'string' ? mod : mod?.default ?? '';
  const words = raw.split(/\s+/).filter((w: string) => w.length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  readTimeMap[key.replace('./', '')] = `${minutes} min read`;
});

export function getReadTime(contentFile: string): string {
  if (!contentFile) return '';
  return readTimeMap[contentFile] ?? '';
}
