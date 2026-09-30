import { index, route, type RouteConfig } from "@react-router/dev/routes";

const devOnly =
  process.env.NODE_ENV === "production"
    ? []
    : [route("styleguide", "routes/styleguide.tsx")];

export default [
  index("routes/home.tsx"),
  route("services", "routes/services.tsx"),
  route("how-we-work", "routes/how-we-work.tsx"),
  route("about", "routes/about.tsx"),
  route("insights", "routes/insights._index.tsx"),
  route("insights/:slug", "routes/insights.$slug.tsx"),
  route("contact", "routes/contact.tsx"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  route("robots.txt", "routes/robots.txt.ts"),
  ...devOnly,
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
