import { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio('/song.mp3')); 

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
            audioRef.current.loop = true;
        }
        setIsPlaying(!isPlaying);
    };

    // Sound wave bars animation
    const SoundWave = () => (
        <div className="flex items-center justify-center gap-[3px] h-5">
            {[1, 2, 3, 4].map((bar) => (
                <div
                    key={bar}
                    className="w-[3px] bg-white rounded-full animate-soundwave"
                    style={{
                        animationDelay: `${bar * 0.1}s`,
                        height: '100%',
                    }}
                />
            ))}
        </div>
    );

    // Play icon
    const PlayIcon = () => (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 ml-0.5"
        >
            <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
    );

    return (
        <>
            {/* Inject CSS animation */}
            <style>{`
                @keyframes soundwave {
                    0%, 100% { transform: scaleY(0.3); }
                    50% { transform: scaleY(1); }
                }
                .animate-soundwave {
                    animation: soundwave 0.8s ease-in-out infinite;
                }
            `}</style>

            <button 
                onClick={togglePlay}
                className={`
                    fixed bottom-6 right-6 z-50 
                    w-14 h-14 
                    rounded-full 
                    flex items-center justify-center 
                    shadow-xl 
                    transition-all duration-300 ease-out
                    backdrop-blur-sm
                    ${isPlaying 
                        ? 'bg-gray-800/90 ring-4 ring-gray-400/30 scale-110' 
                        : 'bg-gray-800/80 hover:bg-gray-700 hover:scale-105'
                    }
                    text-white
                    hover:shadow-2xl
                    active:scale-95
                `}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
                aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                {isPlaying ? <SoundWave /> : <PlayIcon />}
                
                {/* Pulse ring animation when playing */}
                {isPlaying && (
                    <span className="absolute inset-0 rounded-full bg-gray-600/40 animate-ping" />
                )}
            </button>
        </>
    );
};

export default MusicPlayer;