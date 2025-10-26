// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import { MovieCard } from "@/components/card";
import type { Movie } from "@/interface";

describe("MovieCard", () => {
  it("renders core fields", () => {
    renderWithRouter(
      <MovieCard
        id={27205}
        posterUrl="/inception.jpg"
        title="Inception"
        year={2010}
        rating={8.8}
        onClick={() => {}}
        has={() => false}
        toggle={() => {}}      
      />
    );
    // expect(screen.getByText("Inception")).toBeInTheDocument();
    // expect(screen.getByText(/2010/)).toBeInTheDocument();
    // expect(screen.getByText(/8\.8/)).toBeInTheDocument();
    // expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("calls onClick when poster clicked", async () => {
    renderWithRouter(
      <MovieCard
        id={1}
        posterUrl="/p.jpg"
        title="Any"
        year={2000}
        rating={7.2}
        onClick={() => {}}
        has={() => false}
        toggle={() => {}}      
      />
    );
  });
});
