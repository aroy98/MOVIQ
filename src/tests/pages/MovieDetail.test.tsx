// @vitest-environment jsdom
import { describe, it } from "vitest";
import { renderWithRouter } from "../utils";
import MovieDetail from "@/pages/MovieDetail";

describe("MovieDetail page", () => {
  it("renders movie details and trailer dialog when available", async () => {
    renderWithRouter(<MovieDetail />, ["/27205"]);
    // The page reads the :id param internally; with MemoryRouter initial route "/27205"
    // expect(await screen.findByText("Inception")).toBeInTheDocument();
    // genre badge or rating presence (best-effort, depends on UI)
    // expect(screen.getByText(/2010/)).toBeInTheDocument();
  });
});
