import { useEffect, useRef } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface VideoFeedProps {
  isActive: boolean;
  onStreamReady?: (stream: MediaStream) => void;
}

const VideoFeed = ({ isActive, onStreamReady }: VideoFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: true,
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      onStreamReady?.(stream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-secondary border border-border">
      {isActive ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-success/30">
            <Camera className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success">RECORDING</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <CameraOff className="w-16 h-16" />
          <p className="text-sm">Camera Inactive</p>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
