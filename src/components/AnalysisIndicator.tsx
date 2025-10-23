import { cn } from '@/lib/utils';

interface AnalysisIndicatorProps {
  label: string;
  value: string;
  status: 'truth' | 'lie' | 'neutral';
  icon?: React.ReactNode;
}

const AnalysisIndicator = ({ label, value, status, icon }: AnalysisIndicatorProps) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
      status === 'truth' && "bg-success/10 border-success/30",
      status === 'lie' && "bg-destructive/10 border-destructive/30",
      status === 'neutral' && "bg-secondary border-border"
    )}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cn(
            "p-2 rounded-full",
            status === 'truth' && "bg-success/20 text-success",
            status === 'lie' && "bg-destructive/20 text-destructive",
            status === 'neutral' && "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <span className={cn(
        "text-sm font-semibold",
        status === 'truth' && "text-success",
        status === 'lie' && "text-destructive",
        status === 'neutral' && "text-muted-foreground"
      )}>
        {value}
      </span>
    </div>
  );
};

export default AnalysisIndicator;
