import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-6">
      <div className="w-full max-w-xl rounded-xl overflow-hidden glass border border-white/10 text-left notranslate" translate="no">
        {/* Terminal titlebar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="ml-4 text-xs font-mono text-muted-foreground">terminal</span>
        </div>

        {/* Terminal body — styled like a real mkt structured error */}
        <div className="px-6 py-6 font-mono text-sm flex flex-col gap-3">
          <div>
            <span className="text-green-neon">❯</span>{" "}
            <span className="text-violet">mkt</span>
            <span className="text-foreground"> page get {location.pathname}</span>
          </div>
          <pre className="text-muted-foreground whitespace-pre-wrap text-xs leading-relaxed">
{`{"ok": false, "error": {
  "type": "not_found",
  "message": "404 — this page does not exist",
  "suggestion": "Return home or read the docs"
}}`}
          </pre>
          <div className="text-muted-foreground/60 text-xs"># exit code 4 — resource not found</div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/"
              className="gradient-bg text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:glow-button transition-all duration-200"
            >
              cd ~
            </Link>
            <Link
              to="/docs"
              className="glass border border-white/15 text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              mkt docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
