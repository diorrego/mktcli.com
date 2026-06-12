import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FeaturesGrid from "./FeaturesGrid";

describe("FeaturesGrid", () => {
  it("advertises the automatic retry behavior shipped in 0.2.0", () => {
    render(<FeaturesGrid />);
    expect(screen.getByText(/retries built in/i)).toBeInTheDocument();
    expect(screen.getByText(/Retry-After/)).toBeInTheDocument();
  });

  it("keeps the JSON output contract visible somewhere in the grid", () => {
    render(<FeaturesGrid />);
    expect(screen.getByText(/--output json/)).toBeInTheDocument();
  });

  it("keeps an even six-card grid", () => {
    const { container } = render(<FeaturesGrid />);
    const grid = container.querySelector(".grid");
    expect(grid?.children).toHaveLength(6);
  });
});
