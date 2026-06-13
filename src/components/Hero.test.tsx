import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  it("mentions Cursor as a supported agent alongside Claude Code and Codex", () => {
    render(<Hero />);
    const subheadline = screen.getByText(/Claude Code/i);
    expect(subheadline.textContent).toMatch(/Cursor/i);
    expect(subheadline.textContent).toMatch(/Codex/i);
  });
});
