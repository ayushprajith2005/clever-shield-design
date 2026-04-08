import { Shield, Users, Zap, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  { name: "Dr. Sarah Chen", role: "AI Research Lead", desc: "Former Google DeepMind researcher specializing in NLP and fraud detection." },
  { name: "Marcus Rivera", role: "Head of Security", desc: "15+ years in cybersecurity. Previously led threat intelligence at CrowdStrike." },
  { name: "Aisha Patel", role: "Product Director", desc: "Building user-first security tools. Former VP Product at a leading fintech." },
];

const About = () => (
  <div className="min-h-screen pt-24">
    <section className="section-padding !pt-8">
      <div className="container-width">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">About <span className="text-gradient">ScamShield AI</span></h1>
          <p className="text-lg text-muted-foreground">We're building the world's most accessible AI-powered protection against digital threats.</p>
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every day, millions of people fall victim to scams, phishing attacks, and misinformation. We believe everyone deserves AI-powered protection — regardless of their technical expertise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ScamShield AI makes cutting-edge threat detection accessible to everyone. No complex setup, no technical jargon — just instant, intelligent protection.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, value: "2M+", label: "Threats blocked", color: "text-primary" },
              { icon: Users, value: "150K+", label: "Users protected", color: "text-success" },
              { icon: Zap, value: "<0.5s", label: "Response time", color: "text-warning" },
              { icon: Globe, value: "40+", label: "Countries", color: "text-primary" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border/40 bg-card p-6 text-center shadow-sm">
                <s.icon size={24} className={`mx-auto mb-2 ${s.color}`} />
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: "Privacy First", desc: "Zero personal data collection. All analysis happens in real-time with no storage." },
              { title: "Accessibility", desc: "Designed for everyone — from tech-savvy users to those just getting online." },
              { title: "Transparency", desc: "Open about our methods, accuracy rates, and limitations. No black boxes." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border/40 bg-card p-8 shadow-sm">
                <CheckCircle2 size={20} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Leadership Team</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border/40 bg-card p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full hero-gradient flex items-center justify-center text-xl font-bold text-primary-foreground">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-foreground">{m.name}</h3>
                <p className="text-xs text-primary mb-2">{m.role}</p>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
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
            Start Scanning <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
