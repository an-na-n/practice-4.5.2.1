import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../test/utils";
import { VacancyPage } from "./VacancyPage";

afterEach(() => {
  vi.clearAllMocks();
});

vi.mock("../../api/hhApi", () => ({
  fetchVacancies: vi.fn().mockResolvedValue({
    items: [
      {
        id: "1",
        name: "Frontend Developer",
        area: { name: "Москва" },
        employer: { name: "Yandex" },
        salary: { from: 100000, to: 200000, currency: "RUB" },
        experience: { id: "between1And3", name: "От 1 года до 3 лет" },
        work_format: [{ id: "REMOTE", name: "Удалённая работа" }],
        snippet: {
          requirement: "Lorem ipsumLorem ipsum dolor sit amet",
          responsibility: "Ut enim ad minim veniam",
        },
      },
    ],
    found: 1,
    pages: 1,
  }),
}));

describe("VacancyPage", () => {
  it("should render Vacancy Page correctly", async () => {
    renderWithProviders(
      <MemoryRouter>
        <VacancyPage />
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
    waitFor(() => {
      expect(
        screen.getByText("Lorem ipsumLorem ipsum dolor sit amet")
      ).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText("Ut enim ad minim veniam")).toBeInTheDocument();
    });
  });

  it("should open the vacancy page on hh.ru by clicking the apply button", async () => {
    renderWithProviders(
      <MemoryRouter>
        <VacancyPage />
      </MemoryRouter>
    );
    waitFor(() => {
      expect(
        screen.queryByRole("link", { name: /откликнуться на hh.ru/i })
      ).toBeInTheDocument();
    });
    waitFor(() => {
      expect(
        screen.queryByRole("link", { name: /откликнуться/i })
      ).toHaveAttribute("href", "https://hh.ru/vacancy/1");
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
