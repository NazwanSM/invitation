import { useState, useEffect } from 'react';
// Import komponen yang sudah dipisah
import MusicPlayer from './components/MusicPlayer';
import Countdown from './components/Countdown';

// --- KOMPONEN ITEM RUNDOWN (Tetap di sini karena kecil/spesifik) ---
const TimelineItem = ({ id, time, activity, location, note, mapsLink, isChecked, onToggle }) => (
  <div className={`relative pl-6 sm:pl-8 pb-10 sm:pb-12 border-l border-gray-300 last:border-0 last:pb-0 transition-all duration-300 ${isChecked ? 'opacity-60' : ''}`}>
    <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-[#FAFAF9] transition-colors ${isChecked ? 'bg-[#8E7F7F]' : 'bg-gray-800'}`}></div>
    
    {/* Checkbox - hidden on very small screens, shown inline instead */}
    <div className="hidden sm:block absolute -left-10 top-1">
      <label className="cursor-pointer">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={() => onToggle(id)}
          className="sr-only peer"
        />
        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all
          ${isChecked 
            ? 'bg-gray-800 border-gray-800' 
            : 'border-gray-300 hover:border-gray-500'
          }`}
        >
          {isChecked && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </label>
    </div>

    <div className="flex flex-col gap-1 mb-1">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile checkbox */}
        <label className="cursor-pointer sm:hidden">
          <input 
            type="checkbox" 
            checked={isChecked} 
            onChange={() => onToggle(id)}
            className="sr-only peer"
          />
          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all flex-shrink-0
            ${isChecked 
              ? 'bg-gray-800 border-gray-800' 
              : 'border-gray-300'
            }`}
          >
            {isChecked && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </label>
        <span className={`text-xs sm:text-sm font-bold text-gray-400 font-sans ${isChecked ? 'line-through' : ''}`}>{time}</span>
        {isChecked && <span className="text-[#8E7F7F] text-xs italic">✓</span>}
      </div>
      <h3 className={`text-lg sm:text-xl font-serif text-gray-800 transition-all ${isChecked ? 'line-through text-gray-400' : ''}`}>{activity}</h3>
    </div>
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <p className={`text-sm sm:text-base text-gray-600 italic ${isChecked ? 'line-through text-gray-400' : ''}`}>{location}</p>
      {mapsLink && (
        <a 
          href={mapsLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors flex-shrink-0"
          title="Buka di Google Maps"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="underline">Maps</span>
        </a>
      )}
    </div>
    {note && <p className={`text-xs sm:text-sm text-gray-500 font-light bg-gray-100 p-2 sm:p-3 rounded-md inline-block ${isChecked ? 'line-through' : ''}`}>{note}</p>}
  </div>
);

// --- DATA ITINERARY ---
const itineraryData = [
  { id: 'sarapan', time: '08:00 AM', activity: 'Sarapan Bareng', location: 'Bubur DPR', note: 'Mulai hari dengan bubur viral.', mapsLink: 'https://maps.app.goo.gl/X4fRZaaEqKthZ8n69' },
  { id: 'main', time: '09:00 AM', activity: 'Maen maen di ijo ijo', location: 'Dago Dream Park / Noah\'s Park / Rumpun Chanaya', note: 'Sumpah ini bingung antara tiga ini yang mana yang worth it', mapsLink: 'https://maps.app.goo.gl/rCSeigjSxjWrv8F1A' },
  { id: 'perwalian', time: '01:00 PM', activity: 'Perwalian', location: 'Institut Teknologi Bandung', note: 'Aku perwalian dlu yah bocil hehe', mapsLink: 'https://maps.app.goo.gl/RrcL8fLvVHafKhaF6' },
  { id: 'ngafe', time: '03:00 PM', activity: 'Ngafe dan foto foto cantik', location: 'Lalita Delicates', note: 'Semoga kamuu suka tempatnya, kalau gasuka aku ada opsi lain hehe.', mapsLink: 'https://maps.app.goo.gl/ZzthrNyF6RotLNa38' },
  { id: 'dinner', time: '06:30 PM', activity: 'Mam malem', location: 'Hakata Ikkousha', note: 'Memenuhi BM Bocil.', mapsLink: 'https://maps.app.goo.gl/2rZRhxh2uDAwTDWK6' },
];

// --- KOMPONEN RUNDOWN SECTION ---
const RundownSection = () => {
  const [checkedItems, setCheckedItems] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('itinerary-checked');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever checkedItems changes
  useEffect(() => {
    localStorage.setItem('itinerary-checked', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleToggle = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = itineraryData.length;

  return (
    <section className="pt-8 sm:pt-12">
      <h3 className="text-xl sm:text-2xl font-serif text-gray-800 text-center mb-4">The Plan</h3>
      
      {/* Progress Bar */}
      <div className="max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-2">
          <span className="italic">Progress</span>
          <span>{completedCount}/{totalCount} selesai</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gray-800 transition-all duration-500 ease-out"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        {completedCount === totalCount && (
          <p className="text-center text-[#8E7F7F] mt-3 font-serif italic animate-pulse text-sm">
             Semua aktivitas selesai! Semoga kamu happy ya bocil!
          </p>
        )}
      </div>

      <div className="max-w-xl mx-auto pl-4 sm:pl-6">
        {itineraryData.map(item => (
          <TimelineItem 
            key={item.id}
            {...item}
            isChecked={!!checkedItems[item.id]}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

// --- KOMPONEN RSVP ---
const RSVPSection = () => {
  const [response, setResponse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAccept = () => {
    setResponse('accepted');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleDecline = () => {
    setResponse('declined');
  };

  // Confetti pieces
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: ['#E5D3B3', '#8E7F7F', '#D4A574', '#C9B896', '#A89080'][Math.floor(Math.random() * 5)],
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );

  if (response === 'accepted') {
    return (
      <>
        {showConfetti && <Confetti />}
        <style>{`
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .animate-confetti {
            animation: confetti linear forwards;
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .animate-heartbeat {
            animation: heartbeat 1s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
        
        <section className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 sm:p-10 md:p-16 text-center space-y-6 sm:space-y-8 rounded-lg shadow-2xl">
          <div className="animate-float">
            <span className="text-5xl sm:text-6xl">🎉</span>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white">Yeay! Sampai Jumpa Besok!</h3>
            <p className="text-gray-300 font-light text-base sm:text-lg">Can't wait to spend the day with you ✨</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 space-y-2 sm:space-y-3">
            <p className="text-white font-medium text-sm sm:text-base">📍 Reminder</p>
            <p className="text-gray-300 text-xs sm:text-sm">Jangan tidur malem malem yahh</p>
            <p className="text-gray-300 text-xs sm:text-sm">Aku jemput kamu dari pagi 🙏 (semoga)</p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>⭐</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.1s' }}>🌙</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
          </div>
        </section>
      </>
    );
  }

  if (response === 'declined') {
    return (
      <section className="bg-red-50 p-6 sm:p-10 md:p-16 text-center space-y-4 sm:space-y-6 rounded-lg border-2 border-red-200">
        <span className="text-4xl sm:text-5xl">😤</span>
        <h3 className="text-xl sm:text-2xl font-serif text-gray-800">Harus bisa ah gamau tau!</h3>
        <p className="text-sm sm:text-base text-gray-600 font-light">Pokoknya kamu harus acc, titik. 🙅‍♂️</p>
        <button 
          onClick={() => setResponse(null)}
          className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white text-xs sm:text-sm tracking-widest uppercase hover:bg-gray-700 transition-all duration-300 rounded-lg"
        >
          Oke oke, aku ACC deh 😅
        </button>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100 text-center space-y-6 sm:space-y-8 rounded-lg">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-serif text-gray-800">So, What Do You Say?</h3>
        <p className="text-sm sm:text-base text-gray-600 font-light">Gimana? ACC ga nih?</p>
      </div>
      
      <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
        <button 
          onClick={handleAccept}
          className="group px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white text-xs sm:text-sm tracking-widest uppercase hover:bg-gray-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
        >
          <span className="text-lg sm:text-xl group-hover:animate-bounce">🥳</span>
          <span>Yes, I'm In!</span>
        </button>
        
        <button 
          onClick={handleDecline}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-gray-500 text-xs sm:text-sm tracking-widest uppercase hover:text-gray-700 hover:bg-gray-100 transition-all duration-300 rounded-lg border border-gray-200"
        >
          <span>Hmm, Belum...</span>
        </button>
      </div>
    </section>
  );
};

// --- KOMPONEN COVER ---
const InvitationCover = ({ onOpen }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-[#FAFAF9]">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 fade-in">
        <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-500">A Special Invitation</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-800 italic">Are you free?</h1>
        <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed px-2 sm:px-4">
          I've planned something special for us. A day to relax, explore, and enjoy our day.
        </p>
        <div className="pt-6 sm:pt-8">
          <button 
            onClick={onOpen}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-800 text-white text-xs sm:text-sm tracking-widest uppercase hover:bg-gray-700 transition-all duration-300 rounded-sm"
          >
            Yes, Show Me The Plan
          </button>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
const MainContent = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF9] py-10 sm:py-16 px-4 sm:px-6 md:px-20 fade-in">
      <div className="max-w-3xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Header */}
        <header className="text-center space-y-3 sm:space-y-4">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gray-400">The Itinerary</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800">Quality Time.</h2>
          <p className="text-gray-500 italic">Senin, 02 Februari 2026</p>
        </header>

        {/* Panggil Component Countdown dari file terpisah */}
        <Countdown targetDate="2026-02-02T08:00:00" />
        {/* Gallery Section */}
        <section className="py-4 sm:py-8">
            <p className="text-center text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gray-400 mb-6 sm:mb-8">Sneak Peek</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
                <div className="bg-white p-2 sm:p-3 shadow-lg -rotate-3 hover:rotate-0 transition-transform duration-500 w-36 sm:w-48 md:w-56 cursor-pointer">
                    <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-2 sm:mb-3">
                         <img src="/DPR.png" alt="Destination 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                    </div>
                    <p className="text-center font-serif text-xs sm:text-sm italic text-gray-600">Sarapan di tempat viral</p>
                </div>

                <div className="bg-white p-2 sm:p-3 shadow-lg rotate-2 hover:rotate-0 transition-transform duration-500 w-36 sm:w-48 md:w-56 cursor-pointer mt-4 sm:mt-8 md:mt-0">
                    <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-2 sm:mb-3">
                        <img src="/spot2.jpeg" alt="Destination 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                    </div>
                    <p className="text-center font-serif text-xs sm:text-sm italic text-gray-600">Bermain</p>
                </div>
                
                 <div className="bg-white p-2 sm:p-3 shadow-lg -rotate-1 hover:rotate-0 transition-transform duration-500 w-36 sm:w-48 md:w-56 cursor-pointer">
                    <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-2 sm:mb-3">
                        <img src="/itb.jpeg" alt="Destination 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                    </div>
                    <p className="text-center font-serif text-xs sm:text-sm italic text-gray-600">Perwalian</p>
                </div>

                <div className="bg-white p-2 sm:p-3 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500 w-36 sm:w-48 md:w-56 cursor-pointer mt-4 sm:mt-8 md:mt-0">
                    <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-2 sm:mb-3">
                        <img src="/spot4.jpg" alt="Destination 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                    </div>
                    <p className="text-center font-serif text-xs sm:text-sm italic text-gray-600">Foto fotow</p>
                </div>

                <div className="bg-white p-2 sm:p-3 shadow-lg -rotate-2 hover:rotate-0 transition-transform duration-500 w-36 sm:w-48 md:w-56 cursor-pointer">
                    <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-2 sm:mb-3">
                        <img src="/spot5.JPG" alt="Destination 5" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                    </div>
                    <p className="text-center font-serif text-xs sm:text-sm italic text-gray-600">Mam</p>
                </div>
            </div>
        </section>

        {/* Rundown Section */}
        <RundownSection />

        {/* Dresscode Section */}
        <section className="bg-white p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100 text-center space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-serif text-gray-800">Dresscode</h3>
          <p className="text-sm sm:text-base text-gray-600 font-light">Casual Chic. Pake baju yang nyaman dipake ngapain aja dan bagus buat foto.</p>
          <div className="flex justify-center gap-3 sm:gap-4 pt-2">
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E5D3B3] shadow-inner"></div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400">Beige</span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFFFFF] border border-gray-200 shadow-inner"></div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400">White</span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#8E7F7F] shadow-inner"></div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400">Earth</span>
            </div>
          </div>
        </section>

                {/* RSVP Section */}
        <RSVPSection />

        <footer className="text-center pt-8 sm:pt-12 border-t border-gray-200 space-y-6 sm:space-y-8">
          <p className="text-sm sm:text-lg text-gray-600 font-serif italic">"See you there."</p>
        </footer>
      </div>
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Panggil Component MusicPlayer dari file terpisah */}
      <MusicPlayer />
      
      {!isOpen ? (
        <InvitationCover onOpen={() => setIsOpen(true)} />
      ) : (
        <MainContent />
      )}
    </>
  );
}

export default App;