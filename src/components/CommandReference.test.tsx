import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import CommandReference from "./CommandReference";

describe("CommandReference", () => {
  it("renders a tab for creative", () => {
    render(<CommandReference />);
    expect(screen.getByRole("button", { name: /creative/i })).toBeInTheDocument();
  });

  it("renders a tab for media", () => {
    render(<CommandReference />);
    expect(screen.getByRole("button", { name: /media/i })).toBeInTheDocument();
  });

  it("shows creative commands when creative tab is clicked", async () => {
    const user = userEvent.setup();
    render(<CommandReference />);
    await user.click(screen.getByRole("button", { name: /creative/i }));
    expect(screen.getByText(/meta creative create/)).toBeInTheDocument();
    expect(screen.getByText(/meta creative dark-post/)).toBeInTheDocument();
  });

  it("shows media commands when media tab is clicked", async () => {
    const user = userEvent.setup();
    render(<CommandReference />);
    await user.click(screen.getByRole("button", { name: /media/i }));
    expect(screen.getByText(/meta media upload-image/)).toBeInTheDocument();
    expect(screen.getByText(/meta media upload-video/)).toBeInTheDocument();
  });

  it("creative create command includes real CLI flags", async () => {
    const user = userEvent.setup();
    render(<CommandReference />);
    await user.click(screen.getByRole("button", { name: /creative/i }));
    // Both creative lines contain --image-url; use getAllBy to confirm presence
    expect(screen.getAllByText(/--image-url/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/--link-url/)).toBeInTheDocument();
    expect(screen.getByText(/--name/)).toBeInTheDocument();
  });

  it("media upload-image command includes --url and --name flags", async () => {
    const user = userEvent.setup();
    render(<CommandReference />);
    await user.click(screen.getByRole("button", { name: /media/i }));
    expect(screen.getByText(/--url.*--name pixel/)).toBeInTheDocument();
  });
});
