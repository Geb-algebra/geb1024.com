import { installGlobals } from '@remix-run/node';
import { beforeEach } from 'vitest';
import { server } from 'mocks/mock-server.ts';

installGlobals();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

beforeEach(async () => {
  server.resetHandlers();
});

afterAll(() => server.close());
