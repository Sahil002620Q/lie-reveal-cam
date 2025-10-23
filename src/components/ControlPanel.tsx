import { Button } from '@/components/ui/button';
import { Play, Square, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  isAnalyzing: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const ControlPanel = ({ isAnalyzing, onStart, onStop, onReset }: ControlPanelProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {!isAnalyzing ? (
        <Button
          onClick={onStart}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 shadow-glow-primary px-8 py-6 text-lg font-semibold"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Analysis
        </Button>
      ) : (
        <Button
          onClick={onStop}
          size="lg"
          variant="destructive"
          className="bg-gradient-danger hover:opacity-90 shadow-glow-danger px-8 py-6 text-lg font-semibold"
        >
          <Square className="w-5 h-5 mr-2" />
          Stop Analysis
        </Button>
      )}
      
      <Button
        onClick={onReset}
        size="lg"
        variant="secondary"
        className="px-6 py-6"
        disabled={isAnalyzing}
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ControlPanel;
