import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  lang: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ lang }) => {
  const audioSrc = lang === "fr" ? "/audio/upsell-fr.mp3" : "/audio/upsell-en.mp3";
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(193); // fallback duration (3:13)
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Re-create or update source when audioSrc changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [audioSrc]);

  // Sync isPlaying with audio element
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sync playbackRate (speed)
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
  }, [speed]);

  // Sync muted state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 193);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.5, 2];
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  return (
    <div className="w-full bg-[#121225] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-inner select-none">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />
      
      {/* Play/Pause Action Button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-[#7c5cff] flex items-center justify-center text-white hover:bg-violet-400 active:scale-95 transition cursor-pointer flex-shrink-0"
      >
        {isPlaying ? (
          <Pause className="size-4 fill-white text-white" />
        ) : (
          <Play className="size-4 fill-white text-white ml-0.5" />
        )}
      </button>

      {/* Progress Timeline Slider */}
      <div className="flex-1 flex flex-col gap-1">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={handleSliderChange}
          className="audio-slider accent-[#7c5cff]"
        />
        <div className="flex justify-between text-[9px] text-muted font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback speed toggle */}
      <button
        onClick={cycleSpeed}
        className="text-[10px] font-bold px-2 py-1 rounded bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] text-violet-200/90 font-mono cursor-pointer"
      >
        {speed}x
      </button>

      {/* Mute toggle button */}
      <button
        onClick={() => setIsMuted((prev) => !prev)}
        className="text-muted hover:text-text-primary transition cursor-pointer flex-shrink-0"
      >
        {isMuted ? <VolumeX className="size-4 text-[#7c5cff]" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
};
