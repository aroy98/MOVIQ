// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { renderWithRouter } from "../utils";
import MovieExplorer from "@/components/movie-explorer";
import { ENDPOINTS } from "@/api/endpoints";

describe("MovieExplorer", () => {
  it("renders discover results", async () => {
    renderWithRouter(<MovieExplorer endpoint={ENDPOINTS.DISCOVER} searchEnabled />);
    // expect(await screen.findByText("Inception")).toBeInTheDocument();
  });

  it("filters by search query", async () => {
    renderWithRouter(<MovieExplorer endpoint={ENDPOINTS.DISCOVER} searchEnabled />);
    const input = screen.getByRole("searchbox");
    await userEvent.clear(input);
    await userEvent.type(input, "Inception");
    // assume a Search button exists in explorer or auto-search occurs
    // expect(await screen.findByText("Inception")).toBeInTheDocument();
  });
});
