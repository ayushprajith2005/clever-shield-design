import { ShieldCheck, AlertTriangle, ShieldAlert, Phone, Link2, Newspaper } from "lucide-react";

const history = [
  { type: "call", risk: "safe", title: "Bank verification call", time: "Today, 2:30 PM" },
  { type: "link", risk: "scam", title: "bit.ly/free-prize", time: "Today, 11:15 AM" },
  { type: "news", risk: "suspicious", title: "'Government grants available'", time: "Yesterday" },
  { type: "call", risk: "scam", title: "+1 (555) 012-3456", time: "Yesterday" },
  { type: "link", risk: "safe", title: "amazon.com/orders", time: "2 days ago" },
];

const icons = { call: Phone, link: Link2, news: Newspaper };
const riskStyle = {
  safe: { icon: ShieldCheck, color: "text-success", bg: "bg-success/10", label: "Safe" },
  suspicious: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", label: "Suspicious" },
  scam: { icon: ShieldAlert, color: "text-danger", bg: "bg-danger/10", label: "Scam" },
};

const History = () => (
  <div className="min-h-screen pb-24 pt-6">
    <div className="mx-auto max-w-md px-5">
      <h1 className="mb-1 text-2xl font-bold text-foreground">History</h1>
      <p className="mb-6 text-sm text-muted-foreground">Your recent scans and detections</p>
      <div className="space-y-3">
        {history.map((item, i) => {
          const TypeIcon = icons[item.type as keyof typeof icons];
          const r = riskStyle[item.risk as keyof typeof riskStyle];
          return (
            <div key={i} className={`glass-card flex items-center gap-4 p-4 ${r.bg}`}>
              <div className="rounded-xl bg-card/80 p-2.5">
                <TypeIcon size={20} className={r.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${r.color} ${r.bg}`}>
                {r.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default History;
