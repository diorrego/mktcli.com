import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Docs from "./Docs";

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
