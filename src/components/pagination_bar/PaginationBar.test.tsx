import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PaginationBar } from "./PaginationBar";
import { renderWithProviders } from "../../test/utils";

describe("PaginationBar", () => {
  it("should call onChange when switching pagess", () => {
    const onChange = vi.fn();
    renderWithProviders(
      <PaginationBar page={1} total={5} onChange={onChange} />
    );
    const nextButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(nextButton);
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
