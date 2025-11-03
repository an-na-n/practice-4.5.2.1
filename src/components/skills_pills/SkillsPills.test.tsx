import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkillsPills } from "./SkillsPills";
import { renderWithProviders } from "../../test/utils";

describe("SkillsPills", () => {
  it("should render basic skills", async () => {
    renderWithProviders(<SkillsPills />);
    waitFor(() => {
      expect(screen.queryByText("TypeScript")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.queryByText("React")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.queryByText("Redux")).toBeInTheDocument();
    });
  });

  it("should add a new skill", async () => {
    renderWithProviders(<SkillsPills />);
    act(async () => {
      fireEvent.change(await screen.findByPlaceholderText("Навык..."), {
        target: { value: "Next.js" },
      });
    });
    act(async () => {
      fireEvent.keyDown(await screen.findByPlaceholderText("Навык..."), {
        key: "Enter",
        code: "Enter",
      });
    });
    waitFor(() => {
      expect(screen.queryByText("Next.js")).toBeInTheDocument();
    });
  });
});
