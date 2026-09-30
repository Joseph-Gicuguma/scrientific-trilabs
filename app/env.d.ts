/// <reference types="vite/client" />

/** Canonical site origin, injected at build time by vite.config.ts. */
declare const __SITE_URL__: string;

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_CALENDLY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** vite-imagetools `as=picture` imports, used for responsive AVIF/WebP images. */
declare module "*&as=picture" {
  const picture: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default picture;
}
