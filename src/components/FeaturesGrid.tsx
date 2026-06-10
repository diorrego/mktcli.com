import { useEffect, useRef } from "react";
import { Bot, ShieldCheck, Braces, Users, BarChart2, Plug } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Agent-first contract",
    desc: "Documented exit codes (0-7), structured JSON errors with recovery hints, and an AGENTS.md operating guide. Agents branch on codes, not on prose.",
  },
  {
    icon: ShieldCheck,
    title: "Spend safety by default",
    desc: "Every mutating command supports --dry-run, and campaigns, ad sets and boosts are always created paused. Activating spend is an explicit step.",
  },
  {
    icon: Braces,
    title: "Stable JSON output",
    desc: "Data goes to stdout as JSON with --output json; logs go to stderr. Pipe into jq, scripts, or straight into an agent's context.",
  },
  {
    icon: Users,
    title: "Audiences with local PII hashing",
    desc: "Emails and phones are normalized and SHA-256 hashed on your machine before any upload — the same contract on every platform.",
  },
  {
    icon: BarChart2,
    title: "Unified analytics",
    desc: "Impressions, clicks and cost in currency units across Meta, Google (GAQL), TikTok and LinkedIn, in table, JSON or CSV.",
  },
  {
    icon: Plug,
    title: "MCP server included",
    desc: "mkt mcp serve speaks the Model Context Protocol over stdio for Claude Desktop and ChatGPT. Coding agents just use the CLI.",
  },
];

export default function FeaturesGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-sm font-mono text-primary mb-3 tracking-widest uppercase">Features</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-balance">
            Everything you need,{" "}
            <span className="gradient-text">nothing you don't</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className="fade-in-up glass rounded-2xl p-7 flex flex-col gap-4 group cursor-default gradient-border hover:bg-white/[0.06] transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-lg gradient-bg-subtle flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <feat.icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1.5">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-balance">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
