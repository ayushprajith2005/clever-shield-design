import { ShieldCheck, AlertTriangle, ShieldAlert, Link2, Newspaper, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const mockHistory = [
  { id: 1, type: "link", input: "https://bit.ly/fr33-pr1ze", result: "scam" as const, timestamp: new Date(Date.now() - 1800000) },
  { id: 2, type: "news", input: "Government giving free $10,000 grants to all citizens starting tomorrow", result: "suspicious" as const, timestamp: new Date(Date.now() - 3600000) },
  { id: 3, type: "link", input: "https://google.com", result: "safe" as const, timestamp: new Date(Date.now() - 7200000) },
  { id: 4, type: "link", input: "https://amaz0n-deals.tk/free-iphone", result: "scam" as const, timestamp: new Date(Date.now() - 14400000) },
  { id: 5, type: "news", input: "New study confirms coffee is good for health", result: "safe" as const, timestamp: new Date(Date.now() - 28800000) },
  { id: 6, type: "link", input: "https://paypa1-secure.com/verify", result: "scam" as const, timestamp: new Date(Date.now() - 86400000) },
  { id: 7, type: "news", input: "Scientists discover cure for all diseases overnight", result: "suspicious" as const, timestamp: new Date(Date.now() - 172800000) },
];

const riskConfig = {
  safe: { icon: ShieldCheck, label: "Safe", color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  suspicious: { icon: AlertTriangle, label: "Suspicious", color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  scam: { icon: ShieldAlert, label: "Scam", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
};

const formatTime = (d: Date) => {
  const diff = Date.now() - d.getTime();
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
};

const History = () => {
  const scamCount = mockHistory.filter((h) => h.result === "scam").length;
  const suspCount = mockHistory.filter((h) => h.result === "suspicious").length;
  const safeCount = mockHistory.filter((h) => h.result === "safe").length;

  return (
    <div className="min-h-screen pt-24">
      <section className="section-padding !pt-8">
        <div className="container-width">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Scan History</h1>
            <p className="text-muted-foreground mb-8">Review your previous scans with timestamps and risk levels.</p>

            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Scams Found", value: scamCount, color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
                { label: "Suspicious", value: suspCount, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
                { label: "Safe", value: safeCount, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
              ].map((s) => (
                <div key={s.label} className={`rounded-2xl border p-5 text-center ${s.bg} ${s.border}`}>
                  <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* History list */}
            <div className="space-y-3">
              {mockHistory.map((record) => {
                const rc = riskConfig[record.result];
                const RIcon = rc.icon;
                return (
                  <div key={record.id} className={`rounded-2xl border p-5 transition-all hover:shadow-md ${rc.bg} ${rc.border}`}>
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl p-2.5 ${rc.bg}`}>
                        <RIcon size={22} className={rc.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-semibold ${rc.color}`}>{rc.label}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} />
                            {formatTime(record.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/80 truncate">{record.input}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {record.type === "link" ? <Link2 size={14} className="text-muted-foreground" /> : <Newspaper size={14} className="text-muted-foreground" />}
                        <span className="text-xs text-muted-foreground">{record.type === "link" ? "Link" : "News"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl hero-gradient px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-90 glow-primary"
              >
                New Scan <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
