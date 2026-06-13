import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Docs from "./Docs";

// MCP section must explain the Claude Desktop config format and link
// command+args back to the actual binary invocation (mkt mcp serve).
describe("Docs — MCP section", () => {
  it("renders the MCP config JSON with correct command and args", () => {
    render(
      <MemoryRouter>
        <Docs />
      </MemoryRouter>
    );
    // The code block must contain the Claude Desktop config shape
    expect(screen.getByText(/"command": "mkt"/)).toBeInTheDocument();
    expect(screen.getByText(/"args": \["mcp", "serve"\]/)).toBeInTheDocument();
  });

  it("explains that command+args together run mkt mcp serve", () => {
    render(
      <MemoryRouter>
        <Docs />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/mkt mcp serve/).length).toBeGreaterThanOrEqual(1);
  });
});

// Command shape section must document profile meta-commands.
describe("Docs — command shape", () => {
  it("documents the mkt profile list|show|set meta-commands", () => {
    render(
      <MemoryRouter>
        <Docs />
      </MemoryRouter>
    );
    expect(screen.getByText(/mkt profile list/)).toBeInTheDocument();
    expect(screen.getByText(/mkt profile show/)).toBeInTheDocument();
    expect(screen.getByText(/mkt profile set/)).toBeInTheDocument();
  });
});

// The authentication section must document the full credential matrix the
// CLI actually reads (mkt-cli providers.rs), not a subset.
describe("Docs — authentication", () => {
  it("documents the Meta page and Instagram env vars", () => {
    render(
      <MemoryRouter>
        <Docs />
      </MemoryRouter>
    );
    expect(screen.getByText(/MKT_META_PAGE_ID/)).toBeInTheDocument();
    expect(screen.getByText(/MKT_META_IG_USER_ID/)).toBeInTheDocument();
  });

  it("documents the Google OAuth refresh trio", () => {
    render(
      <MemoryRouter>
        <Docs />
      </MemoryRouter>
    );
    expect(screen.getByText(/MKT_GOOGLE_CLIENT_ID/)).toBeInTheDocument();
    expect(screen.getByText(/MKT_GOOGLE_CLIENT_SECRET/)).toBeInTheDocument();
    expect(screen.getByText(/MKT_GOOGLE_REFRESH_TOKEN/)).toBeInTheDocument();
  });
});
