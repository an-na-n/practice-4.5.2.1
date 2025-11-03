import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { renderWithProviders } from "../../test/utils";

describe("Header", () => {
  it("should render Header correctly", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.queryByText("hh .FE")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.queryByText("Вакансии FE")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.queryByText("Обо мне")).toBeInTheDocument();
    });
  });
});
