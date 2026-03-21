import { useEffect, useRef, useState } from "react";

const crates = [
  {
    name: "mkt-cli",
    desc: "Binary entry point. Parses args, dispatches commands.",
    color: "text-violet border-violet/30 bg-violet/10",
  },
  {
    name: "mkt-core",
    desc: "Shared types, traits (MarketingProvider), and error handling.",
    color: "text-brand-blue border-brand-blue/30 bg-brand-blue/10",
  },
  {
    name: "mkt-meta",
    desc: "Full Meta Graph API implementation for campaigns, audiences, insights, posts.",
    color: "text-cyan border-cyan/30 bg-cyan/10",
  },
  {
    name: "mkt-google",
    desc: "Google Ads API integration. Work in progress.",
    color: "text-muted-foreground border-border bg-white/5",
  },
  {
    name: "mkt-tiktok",
    desc: "TikTok for Business API. Planned.",
    color: "text-muted-foreground border-border bg-white/5",
  },
  {
    name: "mkt-linkedin",
    desc: "LinkedIn Marketing API. Planned.",
    color: "text-muted-foreground border-border bg-white/5",
  },
  {
    name: "mkt-config",
    desc: "Profile-based credential storage and multi-account configuration.",
    color: "text-green-neon border-green-neon/30 bg-green-neon/10",
  },
];

export default function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-sm font-mono text-primary mb-3 tracking-widest uppercase">Architecture</p>
          <h2 className="text-4xl md:text-5xl font-semibold">
            A Rust workspace{" "}
            <span className="gradient-text">built to extend</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Each platform lives in its own crate implementing the same{" "}
            <code className="font-mono text-sm text-primary bg-primary/10 px-1.5 py-0.5 rounded">
              MarketingProvider
            </code>{" "}
            trait. Adding a new platform is adding a crate.
          </p>
        </div>

        {/* Crates visual */}
        <div className="fade-in-up glass rounded-2xl p-8 border border-white/10">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {crates.map((crate) => (
              <div
                key={crate.name}
                className="relative"
                onMouseEnter={() => setTooltip(crate.name)}
                onMouseLeave={() => setTooltip(null)}
              >
                <span
                  className={`inline-flex items-center font-mono text-sm px-3 py-1.5 rounded-lg border cursor-default transition-all duration-200 hover:scale-105 ${crate.color}`}
                >
                  {crate.name}
                </span>
                {tooltip === crate.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-56 glass rounded-lg px-3 py-2 text-xs text-muted-foreground border border-white/15 pointer-events-none">
                    {crate.desc}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Trait explanation */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-sm text-muted-foreground text-center mb-5">
              The{" "}
              <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                MarketingProvider
              </code>{" "}
              trait defined in{" "}
              <code className="font-mono text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
                mkt-core
              </code>{" "}
              is the contract every platform must satisfy:
            </p>
            <div className="glass rounded-xl p-6 font-mono text-sm overflow-x-auto border border-white/5 notranslate" translate="no">
              <div className="flex flex-col gap-1.5">
                <span className="text-muted-foreground/50">// mkt-core/src/provider.rs</span>
                <span>
                  <span className="text-violet">pub trait</span>
                  <span className="text-foreground"> MarketingProvider </span>
                  <span className="text-muted-foreground">{"{"}</span>
                </span>
                <span className="pl-6 text-muted-foreground">
                  <span className="text-brand-blue">fn</span>
                  <span> list_campaigns</span>
                  <span className="text-muted-foreground">{"(&self, opts: &CampaignListOpts) -> Result<Vec<Campaign>>;"}</span>
                </span>
                <span className="pl-6 text-muted-foreground">
                  <span className="text-brand-blue">fn</span>
                  <span> create_audience</span>
                  <span className="text-muted-foreground">{"(&self, opts: &AudienceCreateOpts) -> Result<Audience>;"}</span>
                </span>
                <span className="pl-6 text-muted-foreground">
                  <span className="text-brand-blue">fn</span>
                  <span> get_insights</span>
                  <span className="text-muted-foreground">{"(&self, opts: &InsightOpts) -> Result<Insights>;"}</span>
                </span>
                <span className="pl-6 text-muted-foreground">
                  <span className="text-muted-foreground/50">// ... and more</span>
                </span>
                <span className="text-muted-foreground">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
