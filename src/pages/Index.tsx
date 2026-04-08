import { Shield, ArrowRight, Link2, Newspaper, ShieldCheck, Zap, Users, BarChart3, CheckCircle2, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "2M+", label: "Threats Blocked" },
  { value: "99.7%", label: "Detection Accuracy" },
  { value: "150K+", label: "Active Users" },
  { value: "<0.5s", label: "Avg Response Time" },
];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative overflow-hidden section-padding !pt-32 !pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-width relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary animate-fade-in-up">
            <Zap size={14} />
            <span>AI-Powered Protection — Always On</span>
          </div>

          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight animate-fade-in-up animation-delay-100">
            Detect Scams Before <br />
            <span className="text-gradient">They Reach You</span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            ScamShield AI uses advanced machine learning to identify phishing links and fake news in real-time — keeping you safe with zero effort.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl hero-gradient px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:shadow-xl glow-primary"
            >
              Scan Now <ArrowRight size={16} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mt-16 mx-auto max-w-2xl animate-fade-in-up animation-delay-400">
          <div className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-danger/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
              <span className="ml-2 text-xs text-muted-foreground">ScamShield AI — Live Monitor</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Links Checked", value: "3,891", status: "safe", icon: ShieldCheck },
                { label: "News Verified", value: "1,204", status: "safe", icon: CheckCircle2 },
                { label: "Threats Blocked", value: "42", status: "danger", icon: Shield },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl p-4 ${item.status === "danger" ? "bg-danger/5 border border-danger/20" : "bg-success/5 border border-success/20"}`}>
                  <item.icon size={18} className={item.status === "danger" ? "text-danger mb-2" : "text-success mb-2"} />
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="border-y border-border/40 bg-card/30">
      <div className="container-width px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-gradient">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features — Phishing Detection & Fake News */}
    <section className="section-padding">
      <div className="container-width">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Core Protection Modules</h2>
          <p className="text-muted-foreground">Two powerful AI engines working together to keep you safe from modern digital threats.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            {
              icon: Link2,
              title: "Phishing Detection",
              desc: "Instantly analyze URLs, emails, and messages for phishing attempts, malicious redirects, and suspicious content with highlighted results.",
              color: "text-primary",
              bg: "bg-primary/10",
              details: ["URL redirect chain analysis", "Suspicious keyword highlighting", "SSL certificate verification"],
            },
            {
              icon: Newspaper,
              title: "Fake News Verification",
              desc: "Cross-reference any headline, article, or claim against verified sources and fact-check databases for credibility scoring.",
              color: "text-warning",
              bg: "bg-warning/10",
              details: ["Multi-source cross-referencing", "Credibility score (0-100%)", "Source quality assessment"],
            },
          ].map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border/40 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
              <div className={`mb-5 inline-flex rounded-xl ${f.bg} p-3`}>
                <f.icon size={24} className={f.color} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
              <div className="space-y-2">
                {f.details.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className={f.color} />
                    <span className="text-sm text-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Alert system preview */}
    <section className="section-padding bg-card/30 border-y border-border/40">
      <div className="container-width">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex rounded-xl bg-danger/10 p-3 mb-4">
              <Bell size={24} className="text-danger" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Interactive Alert System</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              When a scam is detected, ScamShield AI triggers visual alerts with popups, flashing warning icons, and smooth animations so you never miss a threat.
            </p>
            <div className="space-y-4">
              {[
                "Real-time popup alerts with risk details",
                "Flashing warning icons for high-risk threats",
                "Smooth transition animations",
                "Color-coded risk levels (green, yellow, red)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Safe", color: "text-success", bg: "bg-success/10", border: "border-success/20", glow: "glow-success", icon: ShieldCheck, desc: "Content verified and trustworthy" },
              { label: "Suspicious", color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", glow: "glow-warning", icon: Bell, desc: "Red flags detected — proceed with caution" },
              { label: "Scam Detected", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", glow: "glow-danger", icon: Shield, desc: "High-risk content — do not engage" },
            ].map((r) => (
              <div key={r.label} className={`rounded-2xl border p-5 flex items-center gap-4 transition-all hover:shadow-lg ${r.bg} ${r.border} ${r.glow}`}>
                <r.icon size={28} className={r.color} />
                <div>
                  <p className={`font-bold ${r.color}`}>{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Trust section */}
    <section className="section-padding">
      <div className="container-width">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Trusted by Security Experts</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Built on state-of-the-art NLP models and continuously trained on millions of real-world scam samples. ScamShield AI evolves faster than scammers.
            </p>
            <div className="space-y-4">
              {[
                "Real-time threat intelligence updates",
                "Enterprise-grade encryption & privacy",
                "Works across texts, links, and web",
                "Zero personal data collection",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, label: "Military-Grade\nEncryption", color: "text-primary" },
              { icon: Zap, label: "Real-Time\nDetection", color: "text-warning" },
              { icon: Users, label: "150K+ Users\nProtected", color: "text-success" },
              { icon: BarChart3, label: "99.7% Detection\nAccuracy", color: "text-primary" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border/40 bg-card p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <item.icon size={28} className={`mx-auto mb-3 ${item.color}`} />
                <p className="text-sm font-medium text-foreground whitespace-pre-line">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container-width">
        <div className="rounded-3xl hero-gradient p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">Start Protecting Yourself Today</h2>
            <p className="mb-8 text-primary-foreground/80 max-w-xl mx-auto">Free to use. No sign-up required. Just paste a link or verify any news claim.</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-card px-8 py-3.5 text-sm font-semibold text-foreground shadow-lg transition-all hover:shadow-xl"
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
