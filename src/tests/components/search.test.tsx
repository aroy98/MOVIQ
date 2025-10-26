// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Search } from "@/components/search";
import { renderWithRouter } from "../utils";

describe("Search component", () => {
  it("renders and calls onChange", async () => {
    const onChange = vi.fn();
    renderWithRouter(
      <Search value="" onChange={onChange} placeholder="Search movies" />
    );
    const input = screen.getByRole("searchbox");
    await userEvent.type(input, "Inc");
    expect(onChange).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("shows a clear button when length > 2 and calls onClear", async () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    renderWithRouter(
      <Search value="Ince" onChange={onChange} onClear={onClear} />
    );
    const clear = await screen.findByRole("button");
    await userEvent.click(clear);
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
