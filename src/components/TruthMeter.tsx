import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TruthMeterProps {
  percentage: number;
  isActive: boolean;
}

const TruthMeter = ({ percentage, isActive }: TruthMeterProps) => {
  const [displayPercentage, setDisplayPercentage] = useState(50);

  useEffect(() => {
    if (isActive) {
      setDisplayPercentage(percentage);
    } else {
      setDisplayPercentage(50);
    }
  }, [percentage, isActive]);

  const getStatus = () => {
    if (displayPercentage >= 70) return 'truth';
    if (displayPercentage <= 30) return 'lie';
    return 'neutral';
  };

  const status = getStatus();

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-center gap-4">
        <div className="text-center">
          <div className={cn(
            "text-6xl font-bold transition-all duration-500",
            status === 'truth' && "text-success",
            status === 'lie' && "text-destructive",
            status === 'neutral' && "text-muted-foreground"
          )}>
            {Math.round(displayPercentage)}%
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Truth Confidence
          </div>
        </div>
      </div>

      <div className="relative h-8 bg-secondary rounded-full overflow-hidden border border-border">
        <div
          className={cn(
            "absolute inset-y-0 left-0 transition-all duration-500 rounded-full",
            status === 'truth' && "bg-gradient-success shadow-glow-success",
            status === 'lie' && "bg-gradient-danger shadow-glow-danger",
            status === 'neutral' && "bg-muted"
          )}
          style={{ width: `${displayPercentage}%` }}
        />
        
        <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-medium">
          <span className={cn(
            "transition-colors",
            displayPercentage < 20 ? "text-foreground" : "text-foreground/50"
          )}>
            LIE
          </span>
          <span className={cn(
            "transition-colors",
            displayPercentage > 80 ? "text-foreground" : "text-foreground/50"
          )}>
            TRUTH
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-bold text-destructive">{Math.round(100 - displayPercentage)}%</div>
          <div className="text-xs text-muted-foreground">Deception</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-muted-foreground">{Math.abs(Math.round(displayPercentage - 50))}%</div>
          <div className="text-xs text-muted-foreground">Deviation</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-success">{Math.round(displayPercentage)}%</div>
          <div className="text-xs text-muted-foreground">Honesty</div>
        </div>
      </div>
    </div>
  );
};

export default TruthMeter;
