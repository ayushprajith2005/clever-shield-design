import { useState, useEffect, useCallback } from "react";
import { Link2, Newspaper, Search, ShieldCheck, AlertTriangle, ShieldAlert, Bell, X, Clock, ExternalLink } from "lucide-react";
import AiAssistant from "@/components/AiAssistant";

type Tab = "link" | "news";
type RiskLevel = "safe" | "suspicious" | "scam" | null;

interface ScanRecord {
  id: number;
  type: Tab;
  input: string;
  result: RiskLevel;
  timestamp: Date;
}

const Dashboard = () => {
  const [tab, setTab] = useState<Tab>("link");
  const [input, setInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<RiskLevel>(null);
  const [history, setHistory] = useState<ScanRecord[]>([
    { id: 1, type: "link", input: "https://bit.ly/fr33-pr1ze", result: "scam", timestamp: new Date(Date.now() - 3600000) },
    { id: 2, type: "news", input: "Government giving free $10,000 grants to all citizens", result: "suspicious", timestamp: new Date(Date.now() - 7200000) },
    { id: 3, type: "link", input: "https://google.com", result: "safe", timestamp: new Date(Date.now() - 86400000) },
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertFlash, setAlertFlash] = useState(false);

  // Flash effect for scam alert
  useEffect(() => {
    if (!showAlert || result !== "scam") return;
    const interval = setInterval(() => setAlertFlash((p) => !p), 500);
    const timeout = setTimeout(() => { clearInterval(interval); setAlertFlash(false); }, 4000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [showAlert, result]);

  const handleScan = useCallback(() => {
    if (!input.trim()) return;
    setScanning(true);
    setResult(null);
    setShowAlert(false);
    setTimeout(() => {
      const outcomes: RiskLevel[] = ["safe", "suspicious", "scam"];
      const newResult = tab === "link"
        ? (input.includes("bit.ly") || input.includes("free") || input.includes("prize") ? "scam" : input.includes("suspicious") ? "suspicious" : outcomes[Math.floor(Math.random() * 3)])
        : (input.toLowerCase().includes("free") || input.toLowerCase().includes("grant") ? "suspicious" : outcomes[Math.floor(Math.random() * 3)]);

      setScanning(false);
      setResult(newResult);

      // Add to history
      setHistory((prev) => [
        { id: Date.now(), type: tab, input: input.slice(0, 100), result: newResult, timestamp: new Date() },
        ...prev,
      ]);

      // Trigger alert for scam/suspicious
      if (newResult === "scam" || newResult === "suspicious") {
        setShowAlert(true);
      }
    }, 2200);
  }, [input, tab]);

  const riskConfig = {
    safe: { icon: ShieldCheck, label: "Safe", color: "text-success", bg: "bg-success/10", border: "border-success/20", glow: "glow-success", desc: "No threats detected. This content appears legitimate." },
    suspicious: { icon: AlertTriangle, label: "Suspicious", color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", glow: "glow-warning", desc: "Some red flags found. Proceed with caution and verify from trusted sources." },
    scam: { icon: ShieldAlert, label: "Scam Detected", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", glow: "glow-danger", desc: "High-risk content identified. Do not engage or share personal information." },
  };

  const tabs = [
    { id: "link" as Tab, icon: Link2, label: "Link / Text Scanner" },
    { id: "news" as Tab, icon: Newspaper, label: "News Verification" },
  ];

  const formatTime = (d: Date) => {
    const diff = Date.now() - d.getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Scam Alert Popup */}
      {showAlert && result && (result === "scam" || result === "suspicious") && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 pointer-events-none">
          <div className={`pointer-events-auto max-w-md w-full rounded-2xl border-2 p-6 shadow-2xl transition-all animate-fade-in-up ${
            result === "scam"
              ? `bg-card border-danger/60 ${alertFlash ? "glow-danger" : ""}`
              : "bg-card border-warning/60 glow-warning"
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {result === "scam" ? (
                  <div className={`rounded-full p-2 transition-colors ${alertFlash ? "bg-danger/30" : "bg-danger/15"}`}>
                    <ShieldAlert size={24} className={`text-danger ${alertFlash ? "animate-pulse" : ""}`} />
                  </div>
                ) : (
                  <div className="rounded-full p-2 bg-warning/15">
                    <AlertTriangle size={24} className="text-warning" />
                  </div>
                )}
                <div>
                  <p className={`font-bold text-lg ${result === "scam" ? "text-danger" : "text-warning"}`}>
                    {result === "scam" ? "⚠ Scam Detected!" : "⚡ Suspicious Content"}
                  </p>
                  <p className="text-xs text-muted-foreground">ScamShield AI Alert</p>
                </div>
              </div>
              <button onClick={() => setShowAlert(false)} className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{riskConfig[result].desc}</p>
            <button onClick={() => setShowAlert(false)} className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
              result === "scam" ? "bg-danger text-danger-foreground" : "bg-warning text-warning-foreground"
            }`}>
              I Understand
            </button>
          </div>
        </div>
      )}

      <section className="section-padding !pt-8">
        <div className="container-width">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main scanner panel */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Detection Dashboard</h1>
              <p className="text-muted-foreground mb-8">Analyze links, text, or news content for potential threats.</p>

              {/* Tab bar */}
              <div className="flex gap-1 rounded-2xl border border-border/40 bg-card p-1.5 mb-8">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTab(t.id); setResult(null); setScanning(false); setShowAlert(false); }}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
                      tab === t.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <t.icon size={16} />
                    <span className="hidden sm:inline">{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Input area */}
              <div className="rounded-2xl border border-border/40 bg-card p-6 mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  {tab === "link" ? "Paste a URL, message, or text to analyze" : "Enter a headline or claim to verify"}
                </label>
                {tab === "link" ? (
                  <div className="flex gap-3">
                    <div className="flex-1 flex items-center gap-3 rounded-xl border border-border bg-background px-4">
                      <Link2 size={16} className="text-muted-foreground flex-shrink-0" />
                      <input
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setResult(null); }}
                        placeholder="https://example.com/suspicious-link"
                        className="w-full py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                        onKeyDown={(e) => e.key === "Enter" && handleScan()}
                      />
                    </div>
                    <button
                      onClick={handleScan}
                      disabled={scanning || !input.trim()}
                      className="rounded-xl hero-gradient px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                    >
                      <Search size={16} />
                      <span className="hidden sm:inline">{scanning ? "Scanning..." : "Scan"}</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={input}
                      onChange={(e) => { setInput(e.target.value); setResult(null); }}
                      placeholder="Paste a news headline, article excerpt, or claim here..."
                      rows={4}
                      className="w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none mb-4"
                    />
                    <button
                      onClick={handleScan}
                      disabled={scanning || !input.trim()}
                      className="rounded-xl hero-gradient px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {scanning ? "Verifying..." : "Verify Claim"}
                    </button>
                  </>
                )}
              </div>

              {/* Scanning state */}
              {scanning && (
                <div className="rounded-2xl border border-border/40 bg-card p-8 mb-6 text-center animate-fade-in-up">
                  <div className="relative mx-auto mb-4 h-40 w-full rounded-xl bg-accent overflow-hidden">
                    <div className="absolute inset-x-0 h-0.5 bg-primary/60 animate-scan-line" />
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground animate-pulse">Analyzing with AI models...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Result */}
              {result && !scanning && (
                <div className="space-y-4 animate-fade-in-up">
                  {(() => {
                    const c = riskConfig[result];
                    const Icon = c.icon;
                    return (
                      <>
                        <div className={`rounded-2xl border p-8 text-center ${c.bg} ${c.border} ${c.glow}`}>
                          <Icon size={48} className={`mx-auto mb-3 ${c.color}`} />
                          <p className={`text-2xl font-bold ${c.color}`}>{c.label}</p>
                          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{c.desc}</p>

                          {/* Risk meter */}
                          <div className="mt-6 mx-auto max-w-xs">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                              <span>Safe</span><span>Risk Level</span><span>Scam</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden flex">
                              <div className="h-full bg-success" style={{ width: "33%" }} />
                              <div className="h-full bg-warning" style={{ width: "33%" }} />
                              <div className="h-full bg-danger" style={{ width: "34%" }} />
                            </div>
                            <div className="relative h-4 mt-1">
                              <div
                                className={`absolute top-0 h-4 w-4 rounded-full border-2 border-card transition-all duration-700 ${
                                  result === "safe" ? "bg-success left-[16%]" : result === "suspicious" ? "bg-warning left-[50%]" : "bg-danger left-[83%]"
                                }`}
                                style={{ transform: "translateX(-50%)" }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Scam detail */}
                        {tab === "link" && result === "scam" && (
                          <div className="rounded-2xl border border-border/40 bg-card p-6">
                            <h3 className="text-sm font-semibold text-foreground mb-4">Content Analysis</h3>
                            <p className="text-sm leading-relaxed mb-4">
                              <span className="text-foreground/80">Congratulations! You've been selected for a </span>
                              <span className="rounded bg-danger/15 px-1 py-0.5 font-semibold text-danger">FREE $1000 gift card</span>
                              <span className="text-foreground/80">. Click here to </span>
                              <span className="rounded bg-danger/15 px-1 py-0.5 font-semibold text-danger">claim your prize NOW</span>
                              <span className="text-foreground/80"> before it </span>
                              <span className="rounded bg-danger/15 px-1 py-0.5 font-semibold text-danger">expires in 5 minutes</span>
                              <span className="text-foreground/80">!</span>
                            </p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {["Urgency tactics", "Too-good-to-be-true", "Suspicious redirects", "Missing HTTPS"].map((f) => (
                                <div key={f} className="flex items-center gap-2 rounded-lg bg-danger/5 px-3 py-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-danger" />
                                  <span className="text-sm text-foreground">{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {tab === "news" && (
                          <div className="rounded-2xl border border-border/40 bg-card p-6">
                            <h3 className="text-sm font-semibold text-foreground mb-4">Credibility Score</h3>
                            <div className="flex items-center gap-6">
                              <div className="relative h-24 w-24 flex-shrink-0">
                                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                                  <circle cx="50" cy="50" r="42" fill="none" stroke={`hsl(var(--${result === "safe" ? "success" : result === "suspicious" ? "warning" : "danger"}))`} strokeWidth="8" strokeDasharray={`${(result === "safe" ? 0.85 : result === "suspicious" ? 0.35 : 0.12) * 264} 264`} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className={`text-xl font-bold ${riskConfig[result].color}`}>
                                    {result === "safe" ? "85%" : result === "suspicious" ? "35%" : "12%"}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2 flex-1">
                                {[
                                  { label: "Verified sources", pass: result === "safe" },
                                  { label: "Fact-check databases", pass: result === "safe" },
                                  { label: "Social consensus", pass: result !== "scam" },
                                ].map((s) => (
                                  <div key={s.label} className="flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${s.pass ? "bg-success" : "bg-danger"}`} />
                                    <span className="text-sm text-foreground">{s.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <AiAssistant
                          message={c.desc}
                          status={result === "safe" ? "safe" : result === "suspicious" ? "warning" : "danger"}
                        />
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Quick stats when idle */}
              {!scanning && !result && (
                <div className="grid gap-4 sm:grid-cols-3 mt-4">
                  {[
                    { label: "Total Scans", value: String(history.length), trend: "+12%" },
                    { label: "Threats Found", value: String(history.filter((h) => h.result !== "safe").length), trend: "+3%" },
                    { label: "Protection Score", value: "98%", trend: "↑" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl border border-border/40 bg-card p-5 text-center">
                      <p className="text-2xl font-bold text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <span className="text-xs text-success font-medium">{s.trend}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scan History sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border/40 bg-card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Clock size={18} className="text-muted-foreground" />
                    Scan History
                  </h2>
                  <span className="text-xs text-muted-foreground">{history.length} scans</span>
                </div>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No scans yet. Try scanning a link or verifying news!</p>
                  ) : (
                    history.map((record) => {
                      const rc = riskConfig[record.result!];
                      const RIcon = rc.icon;
                      return (
                        <div key={record.id} className={`rounded-xl border p-4 transition-all hover:shadow-sm ${rc.bg} ${rc.border}`}>
                          <div className="flex items-start gap-3">
                            <RIcon size={18} className={`${rc.color} mt-0.5 flex-shrink-0`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-semibold ${rc.color}`}>{rc.label}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{formatTime(record.timestamp)}</span>
                              </div>
                              <p className="text-xs text-foreground/80 truncate">{record.input}</p>
                              <div className="flex items-center gap-1 mt-1.5">
                                {record.type === "link" ? <Link2 size={12} className="text-muted-foreground" /> : <Newspaper size={12} className="text-muted-foreground" />}
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{record.type === "link" ? "Link Scan" : "News Check"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
