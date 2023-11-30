import { beforeAll, afterEach, afterAll } from "vitest";
import "@testing-library/jest-dom";
import { server } from "./mocks/msw/node.js";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
