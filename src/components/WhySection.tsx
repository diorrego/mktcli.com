import { useEffect, useRef } from "react";
import { Layers, Code2, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: Layers,
    title: "One command, all platforms",
    desc: "Stop switching between dashboards. Run campaigns across Meta, Google, TikTok and LinkedIn from a single, consistent CLI interface.",
    gradient: "from-violet/20 to-brand-blue/10",
  },
  {
    icon: Code2,
    title: "Scriptable and automatable",
    desc: "Pipe outputs into bash scripts, CI workflows, or cron jobs. JSON output mode makes it trivial to integrate with any tool in your stack.",
    gradient: "from-brand-blue/20 to-cyan/10",
  },
  {
    icon: ShieldCheck,
    title: "Ship safely with dry-run",
    desc: "Every destructive or creative command supports --dry-run. Preview exactly what would happen before it actually touches your ad account.",
    gradient: "from-cyan/20 to-violet/10",
  },
];

export default function WhySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-sm font-mono text-primary mb-3 tracking-widest uppercase">Why mkt</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-balance">
            Built for people who think in{" "}
            <span className="gradient-text">commands</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="fade-in-up glass rounded-2xl p-8 flex flex-col gap-5 hover:border-white/20 transition-all duration-300 gradient-border"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.gradient}`}
              >
                <card.icon size={22} className="text-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-balance">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
