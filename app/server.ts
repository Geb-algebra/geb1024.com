// app/server/index.ts

import { compress } from "hono/compress";
import { secureHeaders } from "hono/secure-headers";
import { createHonoServer } from "react-router-hono-server/cloudflare";

export default await createHonoServer({
  configure: (app) => {
    console.log("Configuring Hono server");
    app.use(secureHeaders());
  },
});
