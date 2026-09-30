import path from "node:path";
import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, loadEnv } from "vite";
import { imagetools } from "vite-imagetools";

/**
 * Canonical origin: VITE_SITE_URL if set, else Vercel's production domain,
 * else localhost. Resolved once at build time and baked into the static HTML.
 */
function resolveSiteUrl(env: Record<string, string>): string {
  const explicit = env.VITE_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:5173";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      __SITE_URL__: JSON.stringify(resolveSiteUrl(env)),
    },
    resolve: {
      alias: { "~": path.resolve(import.meta.dirname, "app") },
    },
    plugins: [
      tailwindcss(),
      {
        enforce: "pre",
        ...mdx({
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
          providerImportSource: "@mdx-js/react",
        }),
      },
      imagetools(),
      reactRouter(),
    ],
  };
});
