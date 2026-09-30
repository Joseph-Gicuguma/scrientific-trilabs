import { index, route, type RouteConfig } from "@react-router/dev/routes";

const devOnly =
  process.env.NODE_ENV === "production"
    ? []
    : [route("styleguide", "routes/styleguide.tsx")];

export default [
  index("routes/home.tsx"),
  ...devOnly,
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
