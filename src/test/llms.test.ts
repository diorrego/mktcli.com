import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Quality gates for /llms.txt per the llmstxt.org spec and current best
// practice: H1 + blockquote summary, free-form context before the first
// H2, H2 sections that are pure link lists, 10-40 absolute links with
// descriptions, and content that is concrete and dated.
const llms = readFileSync("public/llms.txt", "utf-8");
const lines = llms.split("\n");

describe("llms.txt", () => {
  it("starts with the H1 and a blockquote summary", () => {
    expect(lines[0]).toBe("# mkt");
    expect(llms).toMatch(/\n> /);
  });

  it("keeps every link absolute (the SPA shell is useless to crawlers)", () => {
    const hrefs = [...llms.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href, `relative link: ${href}`).toMatch(/^https:\/\//);
    }
  });

  it("stays within the 10-40 annotated links best practice", () => {
    const linkLines = lines.filter((l) => /^- \[.+\]\(https:\/\/.+\): .+/.test(l));
    expect(linkLines.length).toBeGreaterThanOrEqual(10);
    expect(linkLines.length).toBeLessThanOrEqual(40);
  });

  it("gives agents the operating essentials inline", () => {
    for (const essential of [
      "mkt [global flags] <provider> <domain> <action>",
      "MKT_META_ACCESS_TOKEN",
      "MKT_GOOGLE_DEVELOPER_TOKEN",
      "MKT_TIKTOK_ACCESS_TOKEN",
      "MKT_LINKEDIN_ACCESS_TOKEN",
      "--dry-run",
      "exit code",
      "PAUSED",
    ]) {
      expect(llms).toContain(essential);
    }
  });

  it("maps the source tree so agents can navigate the code", () => {
    expect(llms).toMatch(/## Source map/);
    for (const path of ["mkt-core", "mkt-meta", "mkt-google", "mkt-tiktok", "mkt-linkedin"]) {
      expect(llms).toContain(path);
    }
  });

  it("is dated and versioned so staleness is detectable", () => {
    expect(llms).toMatch(/0\.2\.0/);
    expect(llms).toMatch(/2026-06/);
  });

  it("ends with the spec's Optional section for secondary material", () => {
    expect(llms).toMatch(/## Optional/);
  });
});
