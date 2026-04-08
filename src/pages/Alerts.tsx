import { ArrowLeft, ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type RiskLevel = "safe" | "suspicious" | "scam";

interface Alert {
  id: number;
  title: string;
  desc: string;
  risk: RiskLevel;
  time: string;
}

const alerts: Alert[] = [
  { id: 1, title: "Bank of America Notification", desc: "Verified sender — legitimate transaction alert", risk: "safe", time: "2 min ago" },
  { id: 2, title: "Unknown Caller +1 (555) 012-3456", desc: "Caller used urgency tactics and requested personal info", risk: "scam", time: "1 hr ago" },
  { id: 3, title: "Link: bit.ly/win-prize-now", desc: "Redirect chain detected — possible phishing attempt", risk: "scam", time: "3 hr ago" },
  { id: 4, title: "News: 'Free government grants available'", desc: "Low credibility score — unverified sources", risk: "suspicious", time: "5 hr ago" },
  { id: 5, title: "Amazon Order Confirmation", desc: "Verified — matches your recent order activity", risk: "safe", time: "1 day ago" },
];

const riskConfig = {
  safe: {
    icon: ShieldCheck,
    label: "Safe",
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/30",
    glow: "glow-success",
    badge: "bg-success/20 text-success",
  },
  suspicious: {
    icon: AlertTriangle,
    label: "Suspicious",
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/30",
    glow: "glow-warning",
    badge: "bg-warning/20 text-warning",
  },
  scam: {
    icon: ShieldAlert,
    label: "Scam",
    bg: "bg-danger/10",
    text: "text-danger",
    border: "border-danger/30",
    glow: "glow-danger",
    badge: "bg-danger/20 text-danger",
  },
};

const Alerts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<RiskLevel | "all">("all");

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.risk === filter);

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="mx-auto max-w-md px-5">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="mb-1 text-2xl font-bold text-foreground">Real-Time Alerts</h1>
        <p className="mb-5 text-sm text-muted-foreground">AI-powered threat detection results</p>

        {/* Filter pills */}
        <div className="mb-5 flex gap-2">
          {(["all", "safe", "suspicious", "scam"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Alert list */}
        <div className="space-y-3">
          {filtered.map((alert) => {
            const c = riskConfig[alert.risk];
            const Icon = c.icon;
            return (
              <div key={alert.id} className={`glass-card border p-4 ${c.bg} ${c.border} ${c.glow}`}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={20} className={c.text} />
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${c.badge}`}>
                      {c.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                </div>
                <p className="mb-1 text-sm font-semibold text-foreground">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
