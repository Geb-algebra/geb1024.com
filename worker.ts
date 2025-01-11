// worker.ts
import handle from "hono-react-router-adapter/cloudflare-workers";
import * as build from "./build/server";

export default handle(build);
