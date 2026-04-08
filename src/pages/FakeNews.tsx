import { ArrowLeft, Search, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AiAssistant from "@/components/AiAssistant";

const FakeNews = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleCheck = () => {
    if (!query.trim()) return;
    setChecking(true);
    setTimeout(() => { setChecking(false); setVerified(true); }, 2500);
  };

  const credibility = 28;

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="mx-auto max-w-md px-5">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="mb-1 text-2xl font-bold text-foreground">Verify News</h1>
        <p className="mb-6 text-sm text-muted-foreground">Check the credibility of any claim</p>

        {/* Input */}
        <div className="glass-card mb-6 p-2">
          <textarea
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVerified(false); }}
            placeholder="Paste a headline, article, or claim..."
            className="w-full resize-none bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              onClick={handleCheck}
              disabled={checking}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {checking ? "Checking..." : "Verify"}
            </button>
          </div>
        </div>

        {checking && (
          <div className="glass-card mb-6 p-6 text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Cross-referencing sources...</p>
          </div>
        )}

        {verified && (
          <>
            {/* Credibility Score */}
            <div className="glass-card mb-4 border border-danger/30 bg-danger/5 p-6 text-center glow-danger">
              <div className="relative mx-auto mb-4 h-32 w-32">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="hsl(var(--danger))" strokeWidth="8"
                    strokeDasharray={`${(credibility / 100) * 327} 327`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-danger">{credibility}%</span>
                  <span className="text-[10px] text-muted-foreground">Credibility</span>
                </div>
              </div>
              <p className="text-lg font-bold text-danger">Likely False</p>
              <p className="text-xs text-muted-foreground">Low credibility — proceed with caution</p>
            </div>

            {/* Source checks */}
            <div className="glass-card mb-4 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source Analysis</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Verified news sources", status: "fail" },
                  { label: "Fact-check databases", status: "fail" },
                  { label: "Academic references", status: "warn" },
                  { label: "Official statements", status: "fail" },
                  { label: "Social media consensus", status: "warn" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    {s.status === "pass" ? (
                      <CheckCircle2 size={16} className="text-success" />
                    ) : s.status === "warn" ? (
                      <MinusCircle size={16} className="text-warning" />
                    ) : (
                      <XCircle size={16} className="text-danger" />
                    )}
                    <span className="text-sm text-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <AiAssistant
              message="This claim has no backing from verified news sources or fact-check databases. It appears to originate from unverified social media posts. We recommend not sharing this information."
              status="danger"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FakeNews;
