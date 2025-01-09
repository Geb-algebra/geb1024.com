import { RequestHandler } from "@react-router/cloudflare";
import type { AppLoadContext } from "react-router";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cookieSession, staticAssets } from "remix-hono/cloudflare";
import { remix } from "remix-hono/handler";
import { getSession, getSessionStorage } from "remix-hono/session";

const app = new Hono<{
  Bindings: {
    SESSION_SECRET: string;
  };
}>();

let handler: RequestHandler | undefined;

app.use(secureHeaders());

app.use(
  "*",
  cookieSession({
    autoCommit: true,
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: (c) => [c.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

app.use(
  async (c, next) => {
    if (process.env.NODE_ENV !== "development" || import.meta.env.PROD) {
      return staticAssets({
        cache: {
          maxAge: "1week",
          staleWhileRevalidate: "1year",
        },
      })(c, next);
    }
    await next();
  },
  async (c, next) => {
    if (process.env.NODE_ENV !== "development" || import.meta.env.PROD) {
      const serverBuild = await import("./build/server");
      return remix({
        // @ts-ignore
        build: serverBuild,
        mode: "production",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getLoadContext(c) {
          const sessionStorage = getSessionStorage(c);
          const session = getSession(c);
          return {
            cloudflare: {
              env: c.env,
            },
            session,
            sessionStorage,
          };
        },
      })(c, next);
      // biome-ignore lint/style/noUselessElse: removal of this else statement causes a compilation error
    } else {
      if (!handler) {
        // @ts-expect-error it's not typed
        const build = await import("virtual:react-router/server-build");
        const { createRequestHandler } = await import("@react-router/cloudflare");
        handler = createRequestHandler(build, "development");
      }
      const remixContext = {
        cloudflare: {
          env: c.env,
        },
      } as unknown as AppLoadContext;
      return handler(c.req.raw, remixContext);
    }
  },
);

export default app;
