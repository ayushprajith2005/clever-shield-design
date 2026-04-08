import { Shield } from "lucide-react";

interface AiAssistantProps {
  message: string;
  status?: "safe" | "warning" | "danger" | "neutral";
}

const statusColors = {
  safe: "from-success/10 to-success/5 border-success/20",
  warning: "from-warning/10 to-warning/5 border-warning/20",
  danger: "from-danger/10 to-danger/5 border-danger/20",
  neutral: "from-primary/10 to-primary/5 border-primary/20",
};

const iconColors = {
  safe: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  neutral: "text-primary",
};

const AiAssistant = ({ message, status = "neutral" }: AiAssistantProps) => (
  <div className={`flex items-start gap-3 rounded-xl border bg-gradient-to-br p-4 ${statusColors[status]}`}>
    <div className={`animate-float rounded-lg bg-card p-2 shadow-sm ${iconColors[status]}`}>
      <Shield size={20} />
    </div>
    <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">{message}</p>
  </div>
);

export default AiAssistant;
