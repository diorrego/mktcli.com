import { useState, useEffect, useRef } from "react";

const tabs = [
  {
    id: "campaign",
    label: "campaign",
    lines: [
      { type: "comment", text: "# Campaign management" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign list", flags: "--format table" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign list", flags: "--format json" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign get", flags: "--id <campaign_id>" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign create", flags: "--name 'Q4 Launch' --objective LINK_CLICKS" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign update", flags: "--id <campaign_id> --status PAUSED" },
      { type: "prompt", cmd: "mkt", sub: "meta campaign delete", flags: "--id <campaign_id> --dry-run" },
    ],
  },
  {
    id: "audience",
    label: "audience",
    lines: [
      { type: "comment", text: "# Audience creation and management" },
      { type: "prompt", cmd: "mkt", sub: "meta audience list", flags: "--format table" },
      { type: "prompt", cmd: "mkt", sub: "meta audience create", flags: "--name 'Lookalike US' --type lookalike --source-id <id>" },
      { type: "prompt", cmd: "mkt", sub: "meta audience create", flags: "--name 'Website visitors' --type custom" },
      { type: "prompt", cmd: "mkt", sub: "meta audience get", flags: "--id <audience_id>" },
      { type: "prompt", cmd: "mkt", sub: "meta audience delete", flags: "--id <audience_id> --dry-run" },
    ],
  },
  {
    id: "insight",
    label: "insight",
    lines: [
      { type: "comment", text: "# Analytics and performance metrics" },
      { type: "prompt", cmd: "mkt", sub: "meta insight get", flags: "--campaign-id <id> --metric impressions,ctr,spend" },
      { type: "prompt", cmd: "mkt", sub: "meta insight get", flags: "--date-preset last_7d --format json" },
      { type: "prompt", cmd: "mkt", sub: "meta insight get", flags: "--since 2024-01-01 --until 2024-03-31 --format csv" },
    ],
  },
  {
    id: "post",
    label: "post",
    lines: [
      { type: "comment", text: "# Organic post publishing" },
      { type: "prompt", cmd: "mkt", sub: "meta post list", flags: "--format table" },
      { type: "prompt", cmd: "mkt", sub: "meta post publish", flags: "--message 'Hello world!' --dry-run" },
      { type: "prompt", cmd: "mkt", sub: "meta post publish", flags: "--message 'Launch day!' --image ./banner.png" },
    ],
  },
  {
    id: "creative",
    label: "creative",
    lines: [
      { type: "comment", text: "# Ad creative management" },
      { type: "prompt", cmd: "mkt", sub: "meta creative list", flags: "--campaign-id <id>" },
      { type: "prompt", cmd: "mkt", sub: "meta creative create", flags: "--name 'Hero Banner' --image ./creative.png --title 'Try it now'" },
      { type: "prompt", cmd: "mkt", sub: "meta creative get", flags: "--id <creative_id>" },
    ],
  },
  {
    id: "raw",
    label: "raw",
    lines: [
      { type: "comment", text: "# Raw API passthrough for advanced usage" },
      { type: "prompt", cmd: "mkt", sub: "meta raw", flags: "GET /me/adaccounts --fields id,name,account_status" },
      { type: "prompt", cmd: "mkt", sub: "meta raw", flags: "POST /act_<id>/campaigns --fields name,objective" },
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
          <h2 className="text-4xl md:text-5xl font-semibold">
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
