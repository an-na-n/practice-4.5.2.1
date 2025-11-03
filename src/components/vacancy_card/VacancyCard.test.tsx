import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { VacancyCard } from "./VacancyCard";
import { renderWithProviders } from "../../test/utils";

const vacancyMock = {
  id: "1",
  name: "Frontend Developer",
  area: { name: "Москва" },
  employer: { name: "Yandex" },
  salary: { from: 100000, to: 200000, currency: "RUB" },
  experience: { id: "between1And3", name: "От 1 года до 3 лет" },
  work_format: [{ id: "REMOTE", name: "Удалённая работа" }],
  alternate_url: "https://hh.ru/vacancy/1",
  snippet: { requirement: "", responsibility: "" },
};

describe("VacancyCard", () => {
  it("should render Vacancy Card correctly", async () => {
    renderWithProviders(
      <MemoryRouter>
        <VacancyCard vacancy={vacancyMock} />
      </MemoryRouter>
    );
    waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText("Yandex")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText("Москва")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText("Можно удалённо")).toBeInTheDocument();
    });
  });

  it("should open the vacancy page on hh.ru by clicking the apply button", async () => {
    renderWithProviders(
      <MemoryRouter>
        <VacancyCard vacancy={vacancyMock} />
      </MemoryRouter>
    );
    waitFor(() => {
      expect(
        screen.queryByRole("link", { name: /откликнуться/i })
      ).toBeInTheDocument();
    });
    waitFor(() => {
      expect(
        screen.queryByRole("link", { name: /откликнуться/i })
      ).toHaveAttribute("href", vacancyMock.alternate_url);
    });
    waitFor(() => {
      expect(
        screen.queryByRole("link", { name: /откликнуться/i })
      ).toHaveAttribute("target", "_blank");
    });
    waitFor(() => {
      expect(
        screen.queryByRole("link", { name: /откликнуться/i })
      ).toHaveAttribute("rel", "noreferrer");
    });
  });
});
