import type { RequestHandler } from "@remix-run/cloudflare";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cookieSession, staticAssets } from "remix-hono/cloudflare";
import { remix } from "remix-hono/handler";
import { getSession, getSessionStorage } from "remix-hono/session";

const app = new Hono<{
  Bindings: {
    PORT: number;
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
      return staticAssets()(c, next);
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
    }
    if (!handler) {
      // @ts-expect-error it's not typed
      const build = await import("virtual:remix/server-build");
      const { createRequestHandler } = await import("@remix-run/cloudflare");
      handler = createRequestHandler(build, "development");
    }
    const remixContext = {
      cloudflare: {
        env: c.env,
      },
    } as unknown as AppLoadContext;
    return handler(c.req.raw, remixContext);
  },
);

export default app;
