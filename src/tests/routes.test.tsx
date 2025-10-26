// @vitest-environment jsdom
import { describe, it } from "vitest";
import { renderWithRouter } from "@/tests/utils";
import Routes from "@/routes";

describe("App routes", () => {
  it("renders dashboard at index route", async () => {
    renderWithRouter(<Routes />, ["/"]);
  });

  it("navigates to movie detail", async () => {
    renderWithRouter(<Routes />, ["/27205"]);
  });
});
