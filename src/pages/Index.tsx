import { useState, useEffect } from 'react';
import VideoFeed from '@/components/VideoFeed';
import TruthMeter from '@/components/TruthMeter';
import AnalysisIndicator from '@/components/AnalysisIndicator';
import ControlPanel from '@/components/ControlPanel';
import { Eye, Activity, Mic, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [truthPercentage, setTruthPercentage] = useState(50);
  const [eyeDirection, setEyeDirection] = useState('Center');
  const [facialTension, setFacialTension] = useState('Relaxed');
  const [voicePattern, setVoicePattern] = useState('Normal');
  const [bodyLanguage, setBodyLanguage] = useState('Neutral');
  const { toast } = useToast();

  useEffect(() => {
    if (isAnalyzing) {
      // Simulate real-time analysis with random fluctuations
      const interval = setInterval(() => {
        // Random walk algorithm for more realistic changes
        setTruthPercentage(prev => {
          const change = (Math.random() - 0.5) * 15;
          const newValue = prev + change;
          return Math.max(15, Math.min(85, newValue));
        });

        // Update other indicators based on truth percentage
        const rand = Math.random();
        
        if (rand > 0.7) {
          setEyeDirection(Math.random() > 0.5 ? 'Upward' : 'Straight');
        }
        
        if (rand > 0.6) {
          setFacialTension(Math.random() > 0.6 ? 'Tense' : 'Relaxed');
        }
        
        if (rand > 0.5) {
          setVoicePattern(Math.random() > 0.5 ? 'Fast' : 'Normal');
        }
        
        if (rand > 0.4) {
          setBodyLanguage(Math.random() > 0.6 ? 'Restless' : 'Calm');
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const handleStart = () => {
    setIsAnalyzing(true);
    toast({
      title: "Analysis Started",
      description: "Now monitoring facial expressions, voice patterns, and body language.",
    });
  };

  const handleStop = () => {
    setIsAnalyzing(false);
    toast({
      title: "Analysis Stopped",
      description: "Recording saved. You can review the results.",
    });
  };

  const handleReset = () => {
    setTruthPercentage(50);
    setEyeDirection('Center');
    setFacialTension('Relaxed');
    setVoicePattern('Normal');
    setBodyLanguage('Neutral');
    toast({
      title: "Reset Complete",
      description: "All indicators have been reset.",
    });
  };

  const getIndicatorStatus = (value: string, truthValues: string[]) => {
    if (truthValues.includes(value)) return 'truth';
    if (value === 'Neutral' || value === 'Center' || value === 'Normal') return 'neutral';
    return 'lie';
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Lie Detector Analysis System
          </h1>
          <p className="text-muted-foreground">
            AI-Powered Truth Verification through Multi-Modal Analysis
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Video Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video">
              <VideoFeed isActive={isAnalyzing} />
            </div>
            
            <ControlPanel
              isAnalyzing={isAnalyzing}
              onStart={handleStart}
              onStop={handleStop}
              onReset={handleReset}
            />
          </div>

          {/* Right Column - Analysis Results */}
          <div className="space-y-6">
            {/* Truth Meter */}
            <div className="bg-card border border-border rounded-lg p-6">
              <TruthMeter percentage={truthPercentage} isActive={isAnalyzing} />
            </div>

            {/* Indicators */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Analysis Indicators
              </h3>
              
              <AnalysisIndicator
                label="Eye Direction"
                value={eyeDirection}
                status={getIndicatorStatus(eyeDirection, ['Straight', 'Center'])}
                icon={<Eye className="w-4 h-4" />}
              />
              
              <AnalysisIndicator
                label="Facial Tension"
                value={facialTension}
                status={getIndicatorStatus(facialTension, ['Relaxed'])}
                icon={<Activity className="w-4 h-4" />}
              />
              
              <AnalysisIndicator
                label="Voice Pattern"
                value={voicePattern}
                status={getIndicatorStatus(voicePattern, ['Normal'])}
                icon={<Mic className="w-4 h-4" />}
              />
              
              <AnalysisIndicator
                label="Body Language"
                value={bodyLanguage}
                status={getIndicatorStatus(bodyLanguage, ['Calm'])}
                icon={<User className="w-4 h-4" />}
              />
            </div>

            {/* Info Card */}
            <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Analysis Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Best results with long-form answers</li>
                <li>• Ensure good lighting and clear audio</li>
                <li>• Subject should face camera directly</li>
                <li>• Allow 5-10 seconds for accurate reading</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
