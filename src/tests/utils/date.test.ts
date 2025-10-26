import { describe, it, expect } from "vitest";
import { formatRuntime } from "@/utils"; // available from src/utils/index.ts re-export?

describe("formatRuntime", () => {
  it("formats minutes to h m", () => {
    expect(formatRuntime(148)).toMatch(/2h/);
  });
});
