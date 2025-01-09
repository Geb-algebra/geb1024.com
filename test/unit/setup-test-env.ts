import { installGlobals } from "react-router";
import { server } from "mocks/mock-server.ts";
import { beforeEach } from "vitest";

installGlobals();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

beforeEach(async () => {
  server.resetHandlers();
});

afterAll(() => server.close());
