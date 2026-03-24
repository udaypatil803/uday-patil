import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: '0x01',
    title: 'MEM_LEAK.WAV',
    artist: 'UNKNOWN_ENTITY',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '0x02',
    title: 'BUFFER_OVERRUN.MP3',
    artist: 'SYS_ADMIN',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '0x03',
    title: 'NULL_POINTER.FLAC',
    artist: 'DAEMON_PROCESS',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="glitch-border-magenta bg-black p-6 w-full max-w-md mx-auto font-terminal">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <div className="mb-6 border-b-2 border-[#ff00ff] pb-4">
        <h2 className="text-[#ff00ff] font-pixel text-xs mb-4 uppercase tracking-widest">
          &gt; AUDIO.MODULE_ONLINE
        </h2>
        <div className="flex flex-col gap-1">
          <p className="text-[#00ffff] text-xl">FILE: {currentTrack.title}</p>
          <p className="text-[#ff00ff] text-lg">SRC: {currentTrack.artist}</p>
          <p className="text-[#00ffff] text-lg">ID: {currentTrack.id}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-4 bg-black border-2 border-[#00ffff] mb-6 relative overflow-hidden">
        <div 
          className="h-full bg-[#ff00ff] transition-none"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-pixel text-white mix-blend-difference pointer-events-none">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={prevTrack}
            className="glitch-btn px-4 py-2 flex-1 text-xs"
          >
            [ &lt;&lt; ]
          </button>
          
          <button 
            onClick={togglePlay}
            className="glitch-btn px-4 py-2 flex-[2] text-xs"
            style={{ borderColor: '#ff00ff', color: '#ff00ff' }}
          >
            {isPlaying ? '[ HALT ]' : '[ EXECUTE ]'}
          </button>
          
          <button 
            onClick={nextTrack}
            className="glitch-btn px-4 py-2 flex-1 text-xs"
          >
            [ &gt;&gt; ]
          </button>
        </div>

        <button 
          onClick={toggleMute}
          className="glitch-btn px-4 py-2 w-full text-xs"
        >
          {isMuted ? 'AUDIO: MUTED' : 'AUDIO: ACTIVE'}
        </button>
      </div>
    </div>
  );
}
