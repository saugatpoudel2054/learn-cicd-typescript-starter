import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  test("returns API key when authorization header is valid", () => {
    const headers = { authorization: "ApiKey mykey" };
    expect(getAPIKey(headers)).toBe("mykey");
  });

  test("returns null when authorization header is missing", () => {
    const headers = {};
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null when authorization header does not start with ApiKey", () => {
    const headers = { authorization: "Bearer token" };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null when authorization header is ApiKey without key", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null when authorization header has extra spaces", () => {
    const headers = { authorization: "ApiKey  mykey" };
    expect(getAPIKey(headers)).toBe("");
  });
});