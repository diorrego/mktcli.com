import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Architecture from "./Architecture";

// The architecture diagram must mirror the real Cargo workspace of
// github.com/diorrego/mkt-cli — all four providers shipped in v0.1.x,
// so nothing here may claim "Planned" or "Work in progress".
describe("Architecture", () => {
  it("does not describe shipped providers as planned or in progress", () => {
    render(<Architecture />);
    expect(screen.queryByText(/planned/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/work in progress/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });

  it("lists every crate that actually exists in the workspace", () => {
    render(<Architecture />);
    for (const crate of [
      "mkt-cli",
      "mkt-core",
      "mkt-meta",
      "mkt-google",
      "mkt-tiktok",
      "mkt-linkedin",
      "mkt-testkit",
    ]) {
      expect(screen.getAllByText(crate).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("does not list crates that do not exist", () => {
    render(<Architecture />);
    expect(screen.queryByText("mkt-config")).not.toBeInTheDocument();
  });
});
