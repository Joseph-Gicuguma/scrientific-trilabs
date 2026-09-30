import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { Config } from "@react-router/dev/config";
import { STATIC_PATHS } from "./app/lib/routes-list";

async function insightPaths(): Promise<string[]> {
  const dir = path.resolve(import.meta.dirname, "app/content/insights");
  const files = await readdir(dir);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => `/insights/${f.replace(/\.mdx$/, "")}`);
}

export default {
  appDirectory: "app",
  // Fully static: every route is prerendered to HTML at build time.
  ssr: false,
  async prerender() {
    return [
      ...STATIC_PATHS,
      ...(await insightPaths()),
      "/sitemap.xml",
      "/robots.txt",
      "/404",
    ];
  },
  // Static hosts (Vercel, serve) answer unknown URLs with /404.html.
  async buildEnd({ reactRouterConfig }) {
    const client = path.join(reactRouterConfig.buildDirectory, "client");
    await copyFile(
      path.join(client, "404/index.html"),
      path.join(client, "404.html"),
    );
  },
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
