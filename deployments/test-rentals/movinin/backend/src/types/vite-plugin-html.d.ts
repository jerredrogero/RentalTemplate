declare module 'vite-plugin-html' {
  export interface HtmlOption {
    inject?: {
      data?: Record<string, any>;
      tags?: string[];
    };
    minify?: boolean;
  }

  export function createHtmlPlugin(options?: HtmlOption): any;
} 