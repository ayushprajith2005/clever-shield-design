import { Shield } from "lucide-react";

interface AiAssistantProps {
  message: string;
  status?: "safe" | "warning" | "danger" | "neutral";
}

const AiAssistant = ({ message, status = "neutral" }: AiAssistantProps) => {
  const statusColors = {
    safe: "from-success/20 to-success/5 border-success/30",
    warning: "from-warning/20 to-warning/5 border-warning/30",
    danger: "from-danger/20 to-danger/5 border-danger/30",
    neutral: "from-primary/20 to-primary/5 border-primary/30",
  };

  const iconColors = {
    safe: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    neutral: "text-primary",
  };

  return (
    <div className={`flex items-start gap-3 rounded-2xl border bg-gradient-to-br p-4 ${statusColors[status]}`}>
      <div className={`animate-float rounded-xl bg-card/80 p-2 ${iconColors[status]}`}>
        <Shield size={24} />
      </div>
      <p className="pt-1 text-sm leading-relaxed text-foreground/80">{message}</p>
    </div>
  );
};

export default AiAssistant;
