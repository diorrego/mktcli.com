import { useEffect, useRef } from "react";
import { SiMeta, SiGoogleads, SiTiktok } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";

const platformIcons = {
  Meta: SiMeta,
  "Google Ads": SiGoogleads,
  "TikTok for Business": SiTiktok,
  LinkedIn: Linkedin,
};

const platforms = [
  {
    name: "Meta" as const,
    sub: "Facebook & Instagram Ads",
    status: "available",
    statusLabel: "Available",
    glow: true,
    commands: ["campaign", "audience", "insight", "post", "creative", "raw"],
  },
  {
    name: "Google Ads" as const,
    sub: "Search, Display & Shopping",
    status: "soon",
    statusLabel: "Coming Soon",
    glow: false,
    commands: [],
  },
  {
    name: "TikTok for Business" as const,
    sub: "TikTok Ads Manager",
    status: "soon",
    statusLabel: "Coming Soon",
    glow: false,
    commands: [],
  },
  {
    name: "LinkedIn" as const,
    sub: "LinkedIn Marketing Solutions",
    status: "soon",
    statusLabel: "Coming Soon",
    glow: false,
    commands: [],
  },
];

export default function Platforms() {
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
    <section id="platforms" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* subtle bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsla(217,91%,55%,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-sm font-mono text-primary mb-3 tracking-widest uppercase">Platforms</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-balance">
            One CLI,{" "}
            <span className="gradient-text">every major platform</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-balance">
            Meta is fully supported today. Google, TikTok and LinkedIn are on the roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className={`fade-in-up rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 ${
                p.glow
                  ? "glass border-white/15 hover:border-white/25 animate-pulse-glow"
                  : "glass border-white/5 opacity-70 hover:opacity-90"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                {(() => {
                  const Icon = platformIcons[p.name];
                  return <Icon className="w-9 h-9 text-muted-foreground" />;
                })()}
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                    p.status === "available"
                      ? "bg-green-neon/15 text-green-neon border border-green-neon/30"
                      : "bg-muted text-muted-foreground border border-white/10"
                  }`}
                >
                  {p.statusLabel}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-muted-foreground text-sm text-balance">{p.sub}</p>
              </div>

              {p.commands.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.commands.map((cmd) => (
                    <span
                      key={cmd}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
