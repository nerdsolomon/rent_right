import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("routes/landing.tsx"),
    route("/home", "./routes/home.tsx"),
    route("/profile", "./routes/profile.tsx"),
    route("/notifications", "./routes/notifications.tsx"),
  ]),
] satisfies RouteConfig;