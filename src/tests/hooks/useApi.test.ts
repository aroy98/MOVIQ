// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useApi } from "@/hooks/useApi";
import { ENDPOINTS } from "@/api/endpoints";

describe("useApi", () => {
  it("returns data on success", async () => {
    const { result } = renderHook(() => useApi<any>());
    const data = await result.current.request(ENDPOINTS.SEARCH + "?query=Inception");
    expect(data.results[0].title).toBe("Inception");
  });
});
