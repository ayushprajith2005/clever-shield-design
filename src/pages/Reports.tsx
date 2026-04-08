import { ShieldCheck, AlertTriangle, ShieldAlert, TrendingUp } from "lucide-react";

const Reports = () => (
  <div className="min-h-screen pb-24 pt-6">
    <div className="mx-auto max-w-md px-5">
      <h1 className="mb-1 text-2xl font-bold text-foreground">Reports</h1>
      <p className="mb-6 text-sm text-muted-foreground">Your protection summary</p>

      {/* Weekly summary */}
      <div className="glass-card mb-4 p-5 glow-primary">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">This Week</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 23, label: "Scans", color: "text-primary" },
            { value: 5, label: "Threats", color: "text-danger" },
            { value: "100%", label: "Blocked", color: "text-success" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Threat breakdown */}
      <div className="glass-card mb-4 p-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Threat Breakdown</h3>
        {[
          { icon: ShieldAlert, label: "Scam Calls", count: 3, color: "text-danger", bar: "bg-danger", pct: 60 },
          { icon: AlertTriangle, label: "Phishing Links", count: 4, color: "text-warning", bar: "bg-warning", pct: 80 },
          { icon: ShieldCheck, label: "Fake News", count: 1, color: "text-primary", bar: "bg-primary", pct: 20 },
        ].map((t) => (
          <div key={t.label} className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <t.icon size={14} className={t.color} />
                <span className="text-sm text-foreground">{t.label}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{t.count}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${t.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Protection score */}
      <div className="glass-card p-5 text-center glow-success">
        <ShieldCheck size={36} className="mx-auto mb-2 text-success" />
        <p className="text-3xl font-bold text-success">98%</p>
        <p className="text-sm text-muted-foreground">Protection Score</p>
        <p className="mt-2 text-xs text-muted-foreground">You're well-protected. Keep ScamShield AI active for continuous monitoring.</p>
      </div>
    </div>
  </div>
);

export default Reports;
