import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const exitCodes = [
  { code: 0, meaning: "success", action: "continue" },
  { code: 1, meaning: "unexpected error (I/O, transport, bug)", action: "inspect stderr" },
  { code: 2, meaning: "invalid input or configuration", action: "fix flags/config, don't retry" },
  { code: 3, meaning: "authentication failed", action: "run mkt doctor, check env vars" },
  { code: 4, meaning: "resource or provider not found", action: "verify the ID" },
  { code: 5, meaning: "rate limited (transient)", action: "wait the suggested delay, retry" },
  { code: 6, meaning: "feature not supported by the provider", action: "run mkt providers" },
  { code: 7, meaning: "provider API rejected the request", action: "inspect error.message" },
];

const envVars = [
  { provider: "meta", vars: ["MKT_META_ACCESS_TOKEN", "MKT_META_AD_ACCOUNT_ID"] },
  {
    provider: "google",
    vars: ["MKT_GOOGLE_ACCESS_TOKEN", "MKT_GOOGLE_DEVELOPER_TOKEN", "MKT_GOOGLE_CUSTOMER_ID"],
  },
  { provider: "tiktok", vars: ["MKT_TIKTOK_ACCESS_TOKEN", "MKT_TIKTOK_ADVERTISER_ID"] },
  { provider: "linkedin", vars: ["MKT_LINKEDIN_ACCESS_TOKEN", "MKT_LINKEDIN_AD_ACCOUNT_ID"] },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="glass border border-white/10 rounded-lg px-4 py-3 font-mono text-sm overflow-x-auto text-foreground/90 notranslate" translate="no">
      {children}
    </pre>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-16">
        <header className="space-y-4">
          <p className="text-sm font-mono text-primary tracking-widest uppercase">Documentation</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-balance">
            Everything an agent — or a human — needs to run ads with <span className="gradient-text">mkt</span>
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Free and open source (MIT / Apache-2.0). This page is the short version; the full
            operating contract lives in{" "}
            <a
              href="https://github.com/diorrego/mkt-cli/blob/main/AGENTS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              AGENTS.md
            </a>{" "}
            in the repository.
          </p>
        </header>

        <Section id="install" title="Install">
          <CodeBlock>{`cargo install mkt-cli

# verify your setup (exit 0 = ready, never prints token values)
mkt doctor

# shell completions
mkt completions zsh > ~/.zfunc/_mkt`}</CodeBlock>
          <p>
            Everything is on crates.io:{" "}
            <a
              href="https://crates.io/crates/mkt-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono"
            >
              mkt-cli
            </a>{" "}
            (the binary) plus the library crates{" "}
            <a
              href="https://crates.io/crates/mkt-cli-core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono"
            >
              mkt-cli-core
            </a>
            ,{" "}
            <a
              href="https://crates.io/crates/mkt-meta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono"
            >
              mkt-meta
            </a>
            ,{" "}
            <a
              href="https://crates.io/crates/mkt-google"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono"
            >
              mkt-google
            </a>
            ,{" "}
            <a
              href="https://crates.io/crates/mkt-tiktok"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono"
            >
              mkt-tiktok
            </a>{" "}
            and{" "}
            <a
              href="https://crates.io/crates/mkt-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono"
            >
              mkt-linkedin
            </a>
            , in case you want to build your own tooling on top.
          </p>
        </Section>

        <Section id="auth" title="Authentication">
          <p>
            Fully non-interactive: environment variables take precedence over{" "}
            <code className="font-mono text-foreground/90">~/.config/mkt/config.toml</code>. There
            are no prompts anywhere, so agents never hang.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {envVars.map((e) => (
              <div key={e.provider} className="glass border border-white/10 rounded-lg p-4">
                <p className="font-mono text-sm text-primary mb-2">{e.provider}</p>
                {e.vars.map((v) => (
                  <p key={v} className="font-mono text-xs text-muted-foreground">{v}</p>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <Section id="commands" title="Command shape">
          <CodeBlock>{`mkt [global flags] <provider> <domain> <action> [flags]

Providers   meta · google · tiktok · linkedin
Domains     campaign · adset · audience · insight · post · creative · media · raw
Global      --output table|json|csv · --dry-run · --profile · --quiet

# discovery is a deterministic tree walk
mkt --help
mkt meta --help
mkt meta campaign --help`}</CodeBlock>
          <p>
            Data goes to <strong className="text-foreground">stdout</strong> (JSON with{" "}
            <code className="font-mono">--output json</code>); logs and errors go to{" "}
            <strong className="text-foreground">stderr</strong>. On failure with JSON output,
            stderr carries exactly one object:
          </p>
          <CodeBlock>{`{"ok": false, "error": {"type": "auth_error", "message": "…",
  "suggestion": "Run 'mkt doctor' …", "transient": true}}`}</CodeBlock>
        </Section>

        <Section id="exit-codes" title="Exit codes (stable contract)">
          <div className="glass border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-4 py-3 font-mono text-primary">code</th>
                  <th className="px-4 py-3">meaning</th>
                  <th className="px-4 py-3">agent action</th>
                </tr>
              </thead>
              <tbody>
                {exitCodes.map((r) => (
                  <tr key={r.code} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-2.5 font-mono text-foreground">{r.code}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.meaning}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{r.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="safety" title="Spend safety">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <code className="font-mono text-foreground/90">--dry-run</code> on every mutating
              command prints what would happen and exits 0 without touching the API.
            </li>
            <li>
              Campaigns, ad sets, and promoted posts are <strong className="text-foreground">always created paused</strong>{" "}
              on every platform. Starting delivery is an explicit second step.
            </li>
            <li>
              Audience uploads normalize and SHA-256 hash emails/phones locally before any network
              call.
            </li>
            <li>Tokens are never echoed; <code className="font-mono">mkt doctor</code> reports presence only.</li>
          </ul>
        </Section>

        <Section id="mcp" title="MCP server">
          <p>
            For chat environments without a terminal (Claude Desktop, ChatGPT),{" "}
            <code className="font-mono text-foreground/90">mkt mcp serve</code> speaks the Model
            Context Protocol over stdio with six consolidated tools. Coding agents with shell
            access should use the CLI directly — it is faster, cheaper in tokens, and exposes
            every capability.
          </p>
          <CodeBlock>{`{
  "mcpServers": {
    "mkt": { "command": "mkt", "args": ["mcp", "serve"] }
  }
}`}</CodeBlock>
        </Section>

        <Section id="recipes" title="Recipes">
          <CodeBlock>{`# list active campaigns as JSON
mkt --output json meta campaign list --status active

# create a paused Google Search campaign (budget required)
mkt google campaign create --name 'Brand Q3' --objective SEARCH --daily-budget 50

# boost an organic post into an existing ad set (created PAUSED)
mkt meta post promote 123456789_987654321 --adset 23845600000000001

# upload hashed customers to an audience
mkt meta audience add-users 23842000001 --email a@example.com

# cross-platform spend report
for p in meta google tiktok linkedin; do
  mkt --output json $p insight get
done`}</CodeBlock>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
