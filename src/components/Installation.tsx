import { useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-xl overflow-hidden border border-white/10 flex-1">
      {label && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
          <span className="text-xs font-mono text-muted-foreground">{label}</span>
          <button
            onClick={copy}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            {copied ? <Check size={14} className="text-green-neon" /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <div className="px-5 py-4 font-mono text-sm text-foreground whitespace-pre notranslate" translate="no">
        {code}
      </div>
    </div>
  );
}

const steps = [
  {
    num: "01",
    title: "Install the CLI",
    code: "cargo install mkt-cli",
  },
  {
    num: "02",
    title: "Set your credentials (env vars or config.toml)",
    code: `export MKT_META_ACCESS_TOKEN=<your_token>
export MKT_META_AD_ACCOUNT_ID=act_<account_id>
mkt doctor   # exit 0 = ready`,
  },
  {
    num: "03",
    title: "Run your first command",
    code: "mkt --output json meta campaign list",
  },
];

export default function Installation() {
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
    <section id="install" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* subtle bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, hsla(263,70%,57%,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-sm font-mono text-primary mb-3 tracking-widest uppercase">Installation</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-balance">
            Up and running{" "}
            <span className="gradient-text">in 60 seconds</span>
          </h2>
        </div>

        {/* Two install options */}
        <div className="fade-in-up flex flex-col sm:flex-row gap-5 mb-6">
          <CodeBlock label="From Cargo (recommended)" code="cargo install mkt-cli" />
          <CodeBlock
            label="From Releases (prebuilt binary)"
            code={`# Linux x86_64; see Releases for macOS and Windows\ncurl -L https://github.com/diorrego/mkt-cli/releases/latest/download/mkt-x86_64-unknown-linux-musl.tar.gz \\
  | tar xz && sudo mv mkt /usr/local/bin/`}
          />
        </div>
        <p className="fade-in-up text-center text-sm text-muted-foreground mb-16">
          Published on{" "}
          <a
            href="https://crates.io/crates/mkt-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            crates.io
          </a>
          , prebuilt binaries on{" "}
          <a
            href="https://github.com/diorrego/mkt-cli/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub Releases
          </a>
          .
        </p>

        {/* Quick start steps */}
        <div className="fade-in-up">
          <h3 className="text-xl font-semibold mb-8 text-center text-muted-foreground">
            Quick start in 3 steps
          </h3>
          <div className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="fade-in-up glass rounded-2xl p-7 flex flex-col sm:flex-row gap-6 items-start border border-white/10"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex-shrink-0">
                  <span className="font-mono text-4xl font-bold gradient-text leading-none">
                    {step.num}
                  </span>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <h4 className="font-semibold text-lg">{step.title}</h4>
                  <div className="glass rounded-lg px-5 py-3 font-mono text-sm text-foreground whitespace-pre-wrap border border-white/5 notranslate" translate="no">
                    {step.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
