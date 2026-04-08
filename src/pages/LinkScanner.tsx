import { ArrowLeft, Link2, Search, AlertTriangle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AiAssistant from "@/components/AiAssistant";

const sampleResults = {
  "bit.ly/free-prize": {
    risk: "scam" as const,
    score: 95,
    highlights: [
      { text: "Congratulations! You've been selected for a ", suspicious: false },
      { text: "FREE $1000 gift card", suspicious: true },
      { text: ". Click here to ", suspicious: false },
      { text: "claim your prize NOW", suspicious: true },
      { text: " before it ", suspicious: false },
      { text: "expires in 5 minutes", suspicious: true },
      { text: "!", suspicious: false },
    ],
    flags: ["Urgency tactics", "Too-good-to-be-true offer", "Suspicious redirect chain", "No HTTPS"],
  },
};

const LinkScanner = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (!url.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  };

  const result = sampleResults["bit.ly/free-prize"];

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="mx-auto max-w-md px-5">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="mb-1 text-2xl font-bold text-foreground">Link Scanner</h1>
        <p className="mb-6 text-sm text-muted-foreground">Paste a URL or message to analyze</p>

        {/* Input */}
        <div className="glass-card mb-6 flex items-center gap-3 p-2">
          <Link2 size={18} className="ml-2 text-muted-foreground" />
          <input
            value={url}
            onChange={(e) => { setUrl(e.target.value); setScanned(false); }}
            placeholder="Paste link or message here..."
            className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={handleScan}
            disabled={scanning}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          >
            {scanning ? "..." : <Search size={18} />}
          </button>
        </div>

        {/* Scanning animation */}
        {scanning && (
          <div className="glass-card mb-6 overflow-hidden p-6">
            <div className="relative mx-auto h-32 w-full rounded-xl bg-secondary/50">
              <div className="absolute inset-x-0 h-0.5 bg-primary/60 animate-scan-line" />
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground animate-pulse">Analyzing content...</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {scanned && (
          <>
            {/* Risk badge */}
            <div className="glass-card mb-4 border border-danger/30 bg-danger/10 p-5 text-center glow-danger">
              <AlertTriangle size={32} className="mx-auto mb-2 text-danger" />
              <p className="text-lg font-bold text-danger">Scam Detected</p>
              <p className="text-xs text-muted-foreground">Risk Score: {result.score}%</p>
              <div className="mx-auto mt-3 h-2 w-48 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-danger" style={{ width: `${result.score}%` }} />
              </div>
            </div>

            {/* Highlighted text */}
            <div className="glass-card mb-4 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content Analysis</h3>
              <p className="text-sm leading-relaxed">
                {result.highlights.map((h, i) => (
                  <span key={i} className={h.suspicious ? "rounded bg-danger/20 px-1 py-0.5 font-semibold text-danger" : "text-foreground/80"}>
                    {h.text}
                  </span>
                ))}
              </p>
            </div>

            {/* Flags */}
            <div className="glass-card mb-4 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Red Flags</h3>
              <div className="space-y-2">
                {result.flags.map((flag) => (
                  <div key={flag} className="flex items-center gap-2 rounded-xl bg-danger/10 px-3 py-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-danger" />
                    <span className="text-sm text-foreground">{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            <AiAssistant
              message="This link contains multiple scam indicators. Do not click or share personal information. The URL uses redirect chains to mask its true destination."
              status="danger"
            />
          </>
        )}

        {!scanned && !scanning && (
          <div className="glass-card flex flex-col items-center p-8 text-center">
            <ShieldCheck size={48} className="mb-3 text-primary/30" />
            <p className="text-sm text-muted-foreground">Paste a URL or forward a suspicious message to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkScanner;
