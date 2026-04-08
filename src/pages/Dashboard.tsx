import { useState } from "react";
import { Phone, Link2, Newspaper, Search, ShieldCheck, AlertTriangle, ShieldAlert, Mic, Volume2 } from "lucide-react";
import AiAssistant from "@/components/AiAssistant";

type Tab = "link" | "call" | "news";
type RiskLevel = "safe" | "suspicious" | "scam" | null;

const Dashboard = () => {
  const [tab, setTab] = useState<Tab>("link");
  const [input, setInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<RiskLevel>(null);
  const [callActive, setCallActive] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(24).fill(10));

  const handleScan = () => {
    if (!input.trim() && tab !== "call") return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult(tab === "link" ? "scam" : tab === "news" ? "suspicious" : "safe");
    }, 2000);
  };

  const toggleCall = () => {
    setCallActive(!callActive);
    setResult(null);
    if (!callActive) {
      const interval = setInterval(() => setBars(Array(24).fill(0).map(() => Math.random() * 100)), 150);
      setTimeout(() => {
        clearInterval(interval);
        setResult("scam");
        setBars(Array(24).fill(10));
      }, 4000);
    }
  };

  const riskConfig = {
    safe: { icon: ShieldCheck, label: "Safe", color: "text-success", bg: "bg-success/10", border: "border-success/20", glow: "glow-success", desc: "No threats detected. This content appears legitimate." },
    suspicious: { icon: AlertTriangle, label: "Suspicious", color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", glow: "glow-warning", desc: "Some red flags found. Proceed with caution and verify from trusted sources." },
    scam: { icon: ShieldAlert, label: "Scam Detected", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", glow: "glow-danger", desc: "High-risk content identified. Do not engage or share personal information." },
  };

  const tabs = [
    { id: "link" as Tab, icon: Link2, label: "Link Scanner" },
    { id: "call" as Tab, icon: Phone, label: "Call Detection" },
    { id: "news" as Tab, icon: Newspaper, label: "News Verify" },
  ];

  return (
    <div className="min-h-screen pt-24">
      <section className="section-padding !pt-8">
        <div className="container-width">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Detection Dashboard</h1>
            <p className="text-muted-foreground mb-8">Analyze links, calls, or news for potential threats.</p>

            {/* Tab bar */}
            <div className="flex gap-1 rounded-2xl border border-border/40 bg-card p-1.5 mb-8">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setResult(null); setScanning(false); setCallActive(false); }}
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
            {tab !== "call" ? (
              <div className="rounded-2xl border border-border/40 bg-card p-6 mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  {tab === "link" ? "Paste a URL or message to analyze" : "Enter a headline or claim to verify"}
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
                      />
                    </div>
                    <button
                      onClick={handleScan}
                      disabled={scanning}
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
                      disabled={scanning}
                      className="rounded-xl hero-gradient px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {scanning ? "Verifying..." : "Verify Claim"}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-border/40 bg-card p-8 mb-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className={`rounded-full p-6 transition-colors ${callActive ? "bg-danger/15" : "bg-primary/15"}`}>
                      <Phone size={36} className={callActive ? "text-danger" : "text-primary"} />
                    </div>
                    {callActive && (
                      <>
                        <div className="absolute inset-0 rounded-full border-2 border-danger/30 animate-pulse-ring" />
                        <div className="absolute -inset-4 rounded-full border border-danger/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
                      </>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{callActive ? "+1 (555) 012-3456" : "No active call"}</p>
                  <p className="text-xs text-muted-foreground mb-6">{callActive ? "Analyzing voice patterns..." : "Start monitoring to detect scam calls"}</p>

                  {/* Waveform */}
                  <div className="flex h-16 w-full max-w-sm items-center justify-center gap-[3px] mb-6">
                    {bars.map((h, i) => (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-150 ${callActive ? "bg-danger" : "bg-muted"}`}
                        style={{ height: callActive ? `${Math.max(h, 8)}%` : "12%" }}
                      />
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="rounded-xl border border-border bg-card p-3 text-muted-foreground hover:text-foreground transition-colors">
                      <Mic size={18} />
                    </button>
                    <button
                      onClick={toggleCall}
                      className={`rounded-xl px-8 py-3 font-semibold text-sm transition-all ${
                        callActive ? "bg-danger text-danger-foreground glow-danger" : "hero-gradient text-primary-foreground glow-primary"
                      }`}
                    >
                      {callActive ? "Stop Monitoring" : "Start Monitoring"}
                    </button>
                    <button className="rounded-xl border border-border bg-card p-3 text-muted-foreground hover:text-foreground transition-colors">
                      <Volume2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Scanning state */}
            {scanning && (
              <div className="rounded-2xl border border-border/40 bg-card p-8 mb-6 text-center">
                <div className="relative mx-auto mb-4 h-40 w-full max-w-md rounded-xl bg-accent overflow-hidden">
                  <div className="absolute inset-x-0 h-0.5 bg-primary/60 animate-scan-line" />
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground animate-pulse">Analyzing with AI models...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
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
                              className={`absolute top-0 h-4 w-4 rounded-full border-2 border-card ${
                                result === "safe" ? "bg-success left-[16%]" : result === "suspicious" ? "bg-warning left-[50%]" : "bg-danger left-[83%]"
                              }`}
                              style={{ transform: "translateX(-50%)" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Details */}
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
                                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--warning))" strokeWidth="8" strokeDasharray={`${0.35 * 264} 264`} strokeLinecap="round" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-warning">35%</span>
                              </div>
                            </div>
                            <div className="space-y-2 flex-1">
                              {[
                                { label: "Verified sources", pass: false },
                                { label: "Fact-check databases", pass: false },
                                { label: "Social consensus", pass: true },
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

            {/* Quick stats */}
            {!scanning && !result && (
              <div className="grid gap-4 sm:grid-cols-3 mt-8">
                {[
                  { label: "Total Scans", value: "5,138", trend: "+12%" },
                  { label: "Threats Blocked", value: "147", trend: "+3%" },
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
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
