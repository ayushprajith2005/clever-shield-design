import { Shield, Bell, Phone, Globe, Lock, Info, ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Protection",
    items: [
      { icon: Phone, label: "Call Monitoring", desc: "Auto-detect scam calls", toggle: true, on: true },
      { icon: Globe, label: "Link Protection", desc: "Scan links in messages", toggle: true, on: true },
      { icon: Bell, label: "Notifications", desc: "Real-time threat alerts", toggle: true, on: true },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: Lock, label: "Privacy", desc: "Data & permissions" },
      { icon: Shield, label: "Subscription", desc: "ScamShield AI Pro" },
      { icon: Info, label: "About", desc: "Version 2.1.0" },
    ],
  },
];

const SettingsPage = () => (
  <div className="min-h-screen pb-24 pt-6">
    <div className="mx-auto max-w-md px-5">
      <h1 className="mb-1 text-2xl font-bold text-foreground">Settings</h1>
      <p className="mb-6 text-sm text-muted-foreground">Customize your protection</p>

      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</h2>
          <div className="glass-card divide-y divide-border/20">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                {item.toggle ? (
                  <div className={`h-6 w-11 rounded-full p-0.5 transition-colors ${item.on ? "bg-primary" : "bg-secondary"}`}>
                    <div className={`h-5 w-5 rounded-full bg-foreground transition-transform ${item.on ? "translate-x-5" : ""}`} />
                  </div>
                ) : (
                  <ChevronRight size={16} className="text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SettingsPage;
