import { Shield, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/40 bg-card/50">
    <div className="container-width section-padding !py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-lg hero-gradient p-1.5">
              <Shield size={16} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ScamShield AI</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-powered scam detection protecting millions from fraud, phishing, and misinformation.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Product</h4>
          <div className="space-y-2">
            {["Features", "Dashboard", "Pricing", "API"].map((l) => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
          <div className="space-y-2">
            {["About", "Blog", "Careers", "Contact"].map((l) => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Connect</h4>
          <div className="flex gap-3">
            {[Github, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="rounded-lg bg-accent p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 ScamShield AI. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
