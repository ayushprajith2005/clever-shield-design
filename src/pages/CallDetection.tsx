import { ArrowLeft, Phone, Mic, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AiAssistant from "@/components/AiAssistant";

const CallDetection = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(20).fill(10));

  useEffect(() => {
    if (!analyzing) return;
    const interval = setInterval(() => {
      setBars(Array(20).fill(0).map(() => Math.random() * 100));
      setProgress((p) => Math.min(p + 2, 100));
    }, 150);
    return () => clearInterval(interval);
  }, [analyzing]);

  const riskLevel = progress < 40 ? "neutral" : progress < 70 ? "warning" : "danger";
  const riskLabel = progress < 40 ? "Analyzing..." : progress < 70 ? "Suspicious patterns detected" : "Scam indicators found";

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="mx-auto max-w-md px-5">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="mb-1 text-2xl font-bold text-foreground">Call Detection</h1>
        <p className="mb-6 text-sm text-muted-foreground">Live voice analysis powered by AI</p>

        {/* Call visualization */}
        <div className="glass-card mb-6 flex flex-col items-center p-8">
          <div className="relative mb-6">
            <div className={`rounded-full p-6 ${analyzing ? "bg-danger/20 glow-danger" : "bg-primary/20 glow-primary"}`}>
              <Phone size={40} className={analyzing ? "text-danger" : "text-primary"} />
            </div>
            {analyzing && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-danger/30 animate-pulse-ring" />
                <div className="absolute -inset-3 rounded-full border border-danger/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
              </>
            )}
          </div>

          {analyzing ? (
            <p className="mb-1 text-sm font-medium text-foreground">+1 (555) 012-3456</p>
          ) : (
            <p className="mb-1 text-sm text-muted-foreground">Tap to start monitoring</p>
          )}
          <p className="mb-6 text-xs text-muted-foreground">{analyzing ? "Call in progress — analyzing..." : "No active call"}</p>

          {/* Waveform */}
          <div className="mb-4 flex h-16 w-full items-center justify-center gap-[3px]">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  analyzing
                    ? riskLevel === "danger" ? "bg-danger" : riskLevel === "warning" ? "bg-warning" : "bg-primary"
                    : "bg-muted"
                }`}
                style={{ height: analyzing ? `${Math.max(h, 8)}%` : "12%" }}
              />
            ))}
          </div>

          {/* Progress */}
          {analyzing && (
            <div className="w-full">
              <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                <span>Analysis progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    riskLevel === "danger" ? "bg-danger" : riskLevel === "warning" ? "bg-warning" : "bg-primary"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mb-6 flex justify-center gap-4">
          <button className="glass-card rounded-2xl p-4 text-muted-foreground hover:text-foreground transition-colors">
            <Mic size={22} />
          </button>
          <button
            onClick={() => { setAnalyzing(!analyzing); setProgress(0); }}
            className={`rounded-2xl px-8 py-4 font-semibold transition-all ${
              analyzing
                ? "bg-danger text-danger-foreground glow-danger"
                : "bg-primary text-primary-foreground glow-primary"
            }`}
          >
            {analyzing ? "Stop Analysis" : "Start Monitoring"}
          </button>
          <button className="glass-card rounded-2xl p-4 text-muted-foreground hover:text-foreground transition-colors">
            <Volume2 size={22} />
          </button>
        </div>

        {analyzing && (
          <AiAssistant
            message={riskLabel}
            status={riskLevel === "danger" ? "danger" : riskLevel === "warning" ? "warning" : "neutral"}
          />
        )}

        {/* Detection indicators */}
        {analyzing && progress > 30 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Indicators</h3>
            {[
              { label: "Urgency language", detected: progress > 40, severity: "warning" },
              { label: "Request for personal data", detected: progress > 55, severity: "danger" },
              { label: "Caller ID spoofing", detected: progress > 65, severity: "danger" },
            ].map((ind) => (
              <div key={ind.label} className={`glass-card flex items-center gap-3 p-3 ${ind.detected ? (ind.severity === "danger" ? "bg-danger/10" : "bg-warning/10") : ""}`}>
                <div className={`h-2 w-2 rounded-full ${ind.detected ? (ind.severity === "danger" ? "bg-danger" : "bg-warning") : "bg-muted"}`} />
                <span className="flex-1 text-sm text-foreground">{ind.label}</span>
                <span className={`text-[10px] font-bold uppercase ${ind.detected ? (ind.severity === "danger" ? "text-danger" : "text-warning") : "text-muted-foreground"}`}>
                  {ind.detected ? "Detected" : "Clear"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallDetection;
