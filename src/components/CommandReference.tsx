import { useState, useEffect, useRef } from "react";

const tabs = [
  {
    id: "agents",
    label: "for agents",
    lines: [
      { type: "comment", text: "# Stable JSON on stdout; structured errors on stderr; exit codes 0-7" },
      { type: "prompt", cmd: "mkt", sub: "--output json meta campaign list", flags: "--status active" },
      { type: "prompt", cmd: "mkt", sub: "--dry-run meta campaign create", flags: "--name 'Q3' --objective OUTCOME_SALES" },
      { type: "comment", text: "# exit 3 = auth, 4 = not found, 5 = rate limited (retry)" },
      { type: "prompt", cmd: "mkt", sub: "doctor", flags: "" },
      { type: "prompt", cmd: "mkt", sub: "mcp serve", flags: "# MCP for Claude Desktop / ChatGPT" },
    ],
  },
  {
    id: "campaign",
    label: "campaign",
    lines: [
      { type: "comment", text: "# Same shape on meta, google, tiktok, linkedin" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign list", flags: "--status active --limit 10" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign get", flags: "<campaign_id>" },
      { type: "prompt", cmd: "mkt", sub: "google campaign create", flags: "--name 'Brand' --objective SEARCH --daily-budget 50" },
      { type: "prompt", cmd: "mkt", sub: "tiktok campaign update", flags: "<id> --status paused" },
      { type: "prompt", cmd: "mkt", sub: "linkedin campaign create", flags: "--name 'Leads' --objective LEAD_GENERATION --daily-budget 18 --extra '{\"campaignGroup\":\"urn:li:sponsoredCampaignGroup:123\"}'" },
    ],
  },
  {
    id: "adset",
    label: "adset",
    lines: [
      { type: "comment", text: "# Meta ad sets: targeting, budget, optimization" },
      { type: "prompt", cmd: "mkt", sub: "meta adset list", flags: "--campaign <campaign_id>" },
      { type: "prompt", cmd: "mkt", sub: "meta adset create", flags: "--campaign <id> --name 'US 25-55' --status paused --daily-budget 2500 --targeting '{\"geo_locations\":{\"countries\":[\"US\"]}}'" },
    ],
  },
  {
    id: "audience",
    label: "audience",
    lines: [
      { type: "comment", text: "# PII is SHA-256 hashed locally before any upload" },
      { type: "prompt", cmd: "mkt", sub: "meta audience list", flags: "" },
      { type: "prompt", cmd: "mkt", sub: "meta audience create", flags: "--name 'Newsletter subs' --description 'From CRM'" },
      { type: "prompt", cmd: "mkt", sub: "meta audience add-users", flags: "<id> --email a@example.com --phone '+1 555 123 4567'" },
      { type: "prompt", cmd: "mkt", sub: "tiktok audience list", flags: "" },
    ],
  },
  {
    id: "insight",
    label: "insight",
    lines: [
      { type: "comment", text: "# Unified analytics; cost converted to currency units everywhere" },
      { type: "prompt", cmd: "mkt", sub: "meta insight get", flags: "--range 7d --metrics impressions,clicks,spend" },
      { type: "prompt", cmd: "mkt", sub: "--output json google insight get", flags: "" },
      { type: "prompt", cmd: "mkt", sub: "--output csv linkedin insight get", flags: "" },
    ],
  },
  {
    id: "post",
    label: "post",
    lines: [
      { type: "comment", text: "# Organic posts + boosting (promoted ads are created PAUSED)" },
      { type: "prompt", cmd: "mkt", sub: "meta post create", flags: "--platform instagram --image-url https://cdn.example.com/photo.jpg --message 'Launch day!'" },
      { type: "prompt", cmd: "mkt", sub: "meta post promote", flags: "<post_id> --adset <adset_id>" },
    ],
  },
  {
    id: "raw",
    label: "raw",
    lines: [
      { type: "comment", text: "# Raw API escape hatch when a niche endpoint isn't wrapped" },
      { type: "prompt", cmd: "mkt", sub: "meta raw get", flags: "'act_123/campaigns' --fields id,name,status" },
      { type: "prompt", cmd: "mkt", sub: "meta raw post", flags: "'act_123/campaigns' --body '{\"name\":\"X\",\"objective\":\"OUTCOME_TRAFFIC\",\"special_ad_categories\":[]}'" },
    ],
  },
];

export default function CommandReference() {
  const [active, setActive] = useState("campaign");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = tabs.find((t) => t.id === active)!;

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-sm font-mono text-primary mb-3 tracking-widest uppercase">Reference</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-balance">
            Every command,{" "}
            <span className="gradient-text">right here</span>
          </h2>
        </div>

        <div className="fade-in-up glass rounded-2xl overflow-hidden border border-white/10">
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-white/10 bg-white/5 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex-shrink-0 px-5 py-3.5 text-sm font-mono transition-all duration-200 ${
                  active === tab.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code block */}
          <div className="p-6 font-mono text-sm overflow-x-auto notranslate" translate="no">
            <div className="flex flex-col gap-3">
              {current.lines.map((line, i) => (
                <div key={i} className="flex items-start gap-3 leading-relaxed">
                  {line.type === "comment" ? (
                    <span className="text-muted-foreground/50">{line.text}</span>
                  ) : (
                    <>
                      <span className="text-green-neon flex-shrink-0 select-none">❯</span>
                      <span>
                        <span className="text-violet">{line.cmd}</span>
                        <span className="text-brand-blue"> {line.sub}</span>
                        {line.flags && (
                          <span className="text-muted-foreground"> {line.flags}</span>
                        )}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
