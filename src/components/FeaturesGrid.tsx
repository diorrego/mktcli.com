import { useEffect, useRef } from "react";
import { Megaphone, Users, FileText, BarChart2, Table2, Settings2 } from "lucide-react";

const features = [
  {
    icon: Megaphone,
    title: "Campaign management",
    desc: "Create, list, update and delete campaigns across platforms with a consistent set of flags.",
  },
  {
    icon: Users,
    title: "Audience creation",
    desc: "Build custom and lookalike audiences directly from the CLI without touching any UI.",
  },
  {
    icon: FileText,
    title: "Organic post publishing",
    desc: "Publish posts and schedule content on pages and profiles from your terminal.",
  },
  {
    icon: BarChart2,
    title: "Analytics and insights",
    desc: "Pull impressions, CTR, spend and reach metrics for any campaign or time window.",
  },
  {
    icon: Table2,
    title: "Multiple output formats",
    desc: "Switch between table, JSON and CSV output to fit any workflow or downstream tool.",
  },
  {
    icon: Settings2,
    title: "Profile-based multi-account",
    desc: "Manage multiple ad accounts and profiles without re-authenticating. Switch in one flag.",
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
