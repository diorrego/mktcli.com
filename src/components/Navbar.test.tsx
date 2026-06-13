import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";

describe("Navbar a11y", () => {
  it("hamburger button has an accessible aria-label", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("button", { name: /toggle navigation/i })
    ).toBeInTheDocument();
  });

  it("logo link points to / not #", () => {
    render(<Navbar />);
    const logo = screen.getByRole("link", { name: /mkt/i });
    expect(logo).toHaveAttribute("href", "/");
  });
});
