import { Phone, Link2, Newspaper, ShieldCheck, AlertTriangle, ShieldAlert, Mic, Volume2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Phone,
    title: "Call Scam Detection",
    desc: "Our AI listens in real-time to phone calls and identifies scam patterns, pressure tactics, and social engineering attempts. Get instant alerts before sharing any personal info.",
    details: ["Live voice pattern analysis", "Urgency tactic detection", "Caller ID verification", "Automatic call recording flag"],
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Link2,
    title: "Phishing Link Scanner",
    desc: "Paste any URL or message and our AI will analyze it for phishing attempts, malicious redirects, and suspicious content. Highlighted results show exactly what's suspicious.",
    details: ["URL redirect chain analysis", "SSL certificate verification", "Content pattern matching", "Suspicious keyword highlighting"],
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  {
    icon: Newspaper,
    title: "Fake News Verification",
    desc: "Cross-reference any headline, article, or claim against verified sources. Get a credibility score backed by fact-check databases and trusted news outlets.",
    details: ["Multi-source cross-referencing", "Credibility scoring (0-100%)", "Source quality assessment", "Social media consensus check"],
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
  },
];

const riskLevels = [
  { icon: ShieldCheck, label: "Safe", desc: "Content is verified and trustworthy", color: "text-success", bg: "bg-success/10", border: "border-success/20", glow: "glow-success" },
  { icon: AlertTriangle, label: "Suspicious", desc: "Some red flags detected — proceed with caution", color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", glow: "glow-warning" },
  { icon: ShieldAlert, label: "Scam", desc: "High-risk content — do not engage", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", glow: "glow-danger" },
];

const Features = () => (
  <div className="min-h-screen pt-24">
    <section className="section-padding !pt-8">
      <div className="container-width">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Powerful Features for <span className="text-gradient">Complete Protection</span></h1>
          <p className="text-muted-foreground text-lg">Three AI modules working together to shield you from every type of digital threat.</p>
        </div>

        {/* Feature details */}
        <div className="space-y-12 mb-20">
          {features.map((f, i) => (
            <div key={f.title} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className={`inline-flex rounded-xl ${f.bg} p-3 mb-4`}>
                  <f.icon size={24} className={f.color} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{f.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{f.desc}</p>
                <div className="space-y-3">
                  {f.details.map((d) => (
                    <div key={d} className="flex items-center gap-3">
                      <div className={`h-1.5 w-1.5 rounded-full ${f.bg.replace('/10', '')} ${f.color.replace('text-', 'bg-')}`} />
                      <span className="text-sm text-foreground">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`rounded-2xl border ${f.border} ${f.bg} p-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="rounded-xl bg-card border border-border/40 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-danger/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                  </div>
                  {i === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-4 py-4">
                        <Mic size={20} className="text-muted-foreground" />
                        <div className="flex h-10 items-center gap-[2px]">
                          {Array(16).fill(0).map((_, j) => (
                            <div key={j} className="w-1 rounded-full bg-primary" style={{ height: `${20 + Math.sin(j * 0.8) * 60}%` }} />
                          ))}
                        </div>
                        <Volume2 size={20} className="text-muted-foreground" />
                      </div>
                      <div className="rounded-lg bg-warning/10 border border-warning/20 p-3 text-center">
                        <p className="text-xs font-semibold text-warning">⚠ Urgency language detected</p>
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="space-y-3">
                      <div className="rounded-lg bg-accent p-3 text-xs font-mono text-muted-foreground break-all">
                        https://bit.ly/<span className="text-danger font-semibold">fr33-pr1ze-n0w</span>
                      </div>
                      <div className="rounded-lg bg-danger/10 border border-danger/20 p-3">
                        <p className="text-xs text-danger font-semibold">🚫 Phishing detected — 3 redirect chains</p>
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="space-y-3">
                      <div className="rounded-lg bg-accent p-3 text-xs text-muted-foreground italic">
                        "Government giving free $10,000 grants to all citizens..."
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-danger/10 border border-danger/20 p-3">
                        <span className="text-xs font-semibold text-danger">Credibility</span>
                        <span className="text-lg font-bold text-danger">12%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk levels */}
        <div className="mb-16">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Clear Risk Indicators</h2>
            <p className="text-muted-foreground">Instantly understand threat levels with our color-coded risk system.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {riskLevels.map((r) => (
              <div key={r.label} className={`rounded-2xl border p-6 text-center transition-all hover:shadow-lg ${r.bg} ${r.border} ${r.glow}`}>
                <r.icon size={32} className={`mx-auto mb-3 ${r.color}`} />
                <p className={`text-lg font-bold ${r.color}`}>{r.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl hero-gradient px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-90 glow-primary"
          >
            Try It Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Features;
