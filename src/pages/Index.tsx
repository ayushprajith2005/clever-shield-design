import { Phone, Link2, Newspaper, Shield, TrendingUp, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AiAssistant from "@/components/AiAssistant";

const scanOptions = [
  {
    icon: Phone,
    label: "Scan Call",
    desc: "Detect scam calls in real-time",
    path: "/call-detection",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Link2,
    label: "Check Link",
    desc: "Analyze suspicious URLs & messages",
    path: "/link-scanner",
    gradient: "from-success/20 to-success/5",
    iconColor: "text-success",
  },
  {
    icon: Newspaper,
    label: "Verify News",
    desc: "Check credibility of news articles",
    path: "/fake-news",
    gradient: "from-warning/20 to-warning/5",
    iconColor: "text-warning",
  },
];

const recentAlerts = [
  { type: "safe" as const, label: "Bank notification", time: "2 min ago" },
  { type: "warning" as const, label: "Unknown caller", time: "1 hr ago" },
  { type: "danger" as const, label: "Phishing link blocked", time: "3 hr ago" },
];

const alertStyles = {
  safe: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  warning: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  danger: { bg: "bg-danger/10", text: "text-danger", dot: "bg-danger" },
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="mx-auto max-w-md px-5">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">ScamShield AI</h1>
            <p className="text-sm text-muted-foreground">Your AI protection companion</p>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-primary/10 p-3 glow-primary">
              <Shield size={28} className="text-primary" />
            </div>
            <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-success animate-pulse" />
          </div>
        </div>

        {/* AI Assistant */}
        <div className="mb-6">
          <AiAssistant
            message="All systems active. You're protected against scam calls, phishing links, and misinformation."
            status="safe"
          />
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { value: "147", label: "Threats Blocked", icon: Shield },
            { value: "99.2%", label: "Accuracy", icon: TrendingUp },
            { value: "3", label: "Alerts Today", icon: AlertTriangle },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-3 text-center">
              <stat.icon size={16} className="mx-auto mb-1.5 text-primary" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Scan */}
        <h2 className="mb-3 text-base font-semibold text-foreground">Quick Scan</h2>
        <div className="mb-6 space-y-3">
          {scanOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => navigate(opt.path)}
              className={`glass-card flex w-full items-center gap-4 bg-gradient-to-r p-4 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${opt.gradient}`}
            >
              <div className={`rounded-xl bg-card/80 p-3 ${opt.iconColor}`}>
                <opt.icon size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
              <div className="text-muted-foreground">›</div>
            </button>
          ))}
        </div>

        {/* Recent Alerts */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Recent Alerts</h2>
          <button onClick={() => navigate("/alerts")} className="text-xs text-primary">View all</button>
        </div>
        <div className="space-y-2">
          {recentAlerts.map((alert, i) => {
            const s = alertStyles[alert.type];
            return (
              <div key={i} className={`glass-card flex items-center gap-3 p-3 ${s.bg}`}>
                <div className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                <p className="flex-1 text-sm text-foreground">{alert.label}</p>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
