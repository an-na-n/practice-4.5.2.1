import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { VacanciesPage } from "./VacanciesPage";
import { renderWithProviders } from "../../test/utils";

describe("VacanciesPage", () => {
  it("should render Main Page", async () => {
    renderWithProviders(
      <MemoryRouter>
        <VacanciesPage />
      </MemoryRouter>
    );
    waitFor(() => {
      expect(
        screen.getByText("Список вакансий по профессии Frontend-разработчик")
      ).toBeInTheDocument();
    });
  });
});
