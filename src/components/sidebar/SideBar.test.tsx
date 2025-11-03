import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SideBar } from "./SideBar";
import { renderWithProviders } from "../../test/utils";

describe("SideBar", () => {
  it("should render Select with cities", async () => {
    renderWithProviders(<SideBar />);
    waitFor(() => {
      expect(screen.queryByText("Москва")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.queryByText("Санкт-Петербург")).toBeInTheDocument();
    });
  });

  it("should react to the coice of city", () => {
    renderWithProviders(<SideBar />);
    act(async () => {
      fireEvent.change(await screen.findByRole("combobox"), {
        target: { value: "Москва" },
      });
    });
    waitFor(() => {
      expect(screen.queryByRole("combobox")).toHaveValue("Москва");
    });
  });
});
