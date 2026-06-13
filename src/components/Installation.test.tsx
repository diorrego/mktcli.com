import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Installation from "./Installation";

describe("Installation a11y", () => {
  it("copy buttons have accessible aria-labels", () => {
    render(<Installation />);
    const copyButtons = screen.getAllByRole("button", { name: /copy/i });
    expect(copyButtons.length).toBeGreaterThanOrEqual(1);
  });
});
