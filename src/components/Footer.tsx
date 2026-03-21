import { Github, ExternalLink } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/diorrego/mkt-cli", external: true },
  { label: "CONTRIBUTING", href: "https://github.com/diorrego/mkt-cli/blob/main/CONTRIBUTING.md", external: true },
  { label: "CHANGELOG", href: "https://github.com/diorrego/mkt-cli/blob/main/CHANGELOG.md", external: true },
  { label: "LICENSE", href: "https://github.com/diorrego/mkt-cli/blob/main/LICENSE", external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="font-mono font-semibold text-xl gradient-text">mkt-cli</span>
            <p className="text-muted-foreground text-sm leading-relaxed text-balance">
              An open-source CLI for managing paid and organic marketing across all major platforms from your terminal.
            </p>
            <a
              href="https://github.com/diorrego/mkt-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <Github size={16} />
              <span>diorrego/mkt-cli</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              Resources
            </span>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 items-start md:items-end">
            <a
              href="#install"
              className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:glow-button hover:scale-105 transition-all duration-200 inline-block"
            >
              Get Started
            </a>
            <p className="text-xs text-muted-foreground">
              Licensed under MIT and Apache 2.0
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60">
            Built with Rust 🦀 &mdash; Open source, forever.
          </p>
          <p className="text-xs text-muted-foreground/40 font-mono">
            mkt-cli &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
