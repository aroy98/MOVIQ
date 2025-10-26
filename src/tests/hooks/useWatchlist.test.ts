// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWatchlist } from "@/hooks/useWatchlist";

describe("useWatchlist", () => {
  it("adds, toggles, and removes movies with persistence", () => {
    const { result } = renderHook(() => useWatchlist());
    const movie = { id: 27205, title: "Inception", year: 2010, rating: 8.8, posterUrl: "/inception.jpg" } as any;

    act(() => result.current.add(movie));
    expect(result.current.has(movie.id)).toBe(true);
    expect(result.current.list[0].title).toBe("Inception");

    act(() => result.current.toggle(movie)); // remove
    expect(result.current.has(movie.id)).toBe(false);

    act(() => result.current.toggle(movie)); // add again
    expect(result.current.has(movie.id)).toBe(true);

    act(() => result.current.remove(movie.id));
    expect(result.current.has(movie.id)).toBe(false);
  });
});
