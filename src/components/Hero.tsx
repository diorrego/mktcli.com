import { useEffect, useState } from "react";
import { Terminal, ArrowRight, Github } from "lucide-react";

const commands = [
  { prompt: "mkt", cmd: "--output json meta campaign list --status active", comment: "# stable JSON on stdout — agents parse this" },
  { prompt: "mkt", cmd: "--dry-run google campaign create --name 'Q3' --objective SEARCH --daily-budget 50", comment: "# preview first, spend never starts by accident" },
  { prompt: "mkt", cmd: "meta adset create --campaign 1203… --status paused --daily-budget 2500", comment: "# everything is created paused" },
  { prompt: "mkt", cmd: "tiktok insight get --metrics spend,impressions,clicks", comment: "# unified metrics across platforms" },
  { prompt: "mkt", cmd: "doctor", comment: "# exit 0 = credentials ready (values never printed)" },
];

export default function Hero() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const full = commands[cmdIndex].cmd;
    if (typing) {
      if (displayed.length < full.length) {
        const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => {
        setDisplayed("");
        setCmdIndex((i) => (i + 1) % commands.length);
        setTyping(true);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [displayed, typing, cmdIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-radial-pulse"
          style={{
            background: "radial-gradient(ellipse, hsla(263,70%,57%,0.18) 0%, hsla(217,91%,55%,0.1) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsla(217,91%,55%,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-mono text-muted-foreground animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-neon animate-pulse inline-block" />
          Free &amp; open source &middot; Written in Rust &middot; MIT / Apache
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight animate-fade-in text-balance">
          <span className="gradient-text">The ads CLI built for</span>
          <br />
          <span className="text-foreground">coding agents.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in text-balance">
          Claude Code, Codex, and any agent with a shell can run your ads on Meta,
          Google, TikTok and LinkedIn — the same way they use the AWS or GitHub CLIs.
          Stable JSON output, documented exit codes, dry-run everywhere, and
          campaigns that are always created paused.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <a
            href="#install"
            className="gradient-bg text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center gap-2 justify-center hover:glow-button hover:scale-105 transition-all duration-200"
          >
            <Terminal size={16} />
            Install via Cargo
          </a>
          <a
            href="https://github.com/diorrego/mkt-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="glass border border-white/15 text-foreground px-6 py-3 rounded-lg font-medium flex items-center gap-2 justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-200"
          >
            <Github size={16} />
            View on GitHub
            <ArrowRight size={14} className="text-muted-foreground" />
          </a>
        </div>

        {/* Animated Terminal */}
        <div className="w-full max-w-2xl mt-4 rounded-xl overflow-hidden glass border border-white/10 text-left animate-fade-in notranslate" translate="no">
          {/* Terminal titlebar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-4 text-xs font-mono text-muted-foreground">terminal</span>
          </div>

          {/* Terminal body */}
          <div className="px-6 py-5 font-mono text-sm min-h-[120px] flex flex-col gap-3">
            {/* Previous commands (ghost) */}
            <div className="text-muted-foreground/40 text-xs">
              {commands[(cmdIndex + commands.length - 1) % commands.length] && (
                <span>
                  <span className="text-green-neon/40">❯</span>{" "}
                  {commands[(cmdIndex + commands.length - 1) % commands.length].prompt}{" "}
                  {commands[(cmdIndex + commands.length - 1) % commands.length].cmd}
                </span>
              )}
            </div>
            {/* Active line */}
            <div className="flex items-start gap-2">
              <span className="text-green-neon">❯</span>
              <div>
                <span className="text-violet">{commands[cmdIndex].prompt}</span>
                <span className="text-foreground"> {displayed}</span>
                {typing && <span className="terminal-cursor text-muted-foreground" />}
              </div>
            </div>
            {/* Comment */}
            <div className="text-muted-foreground/60 text-xs pl-4">
              {commands[cmdIndex].comment}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
