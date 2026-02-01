import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference > 0) {
            setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            });
        }
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-10 py-6 sm:py-10 font-serif text-gray-800 border-b border-gray-200 w-full max-w-xl mx-auto mb-8 sm:mb-12 px-2">
        <div className="text-center min-w-[50px] sm:min-w-[60px]">
            <div className="text-2xl sm:text-3xl md:text-4xl font-light">{timeLeft.days}</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 mt-1 sm:mt-2">Days</div>
        </div>
        <div className="text-center min-w-[50px] sm:min-w-[60px]">
            <div className="text-2xl sm:text-3xl md:text-4xl font-light">{timeLeft.hours}</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 mt-1 sm:mt-2">Hours</div>
        </div>
        <div className="text-center min-w-[50px] sm:min-w-[60px]">
            <div className="text-2xl sm:text-3xl md:text-4xl font-light">{timeLeft.minutes}</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 mt-1 sm:mt-2">Mins</div>
        </div>
        <div className="text-center min-w-[50px] sm:min-w-[60px]">
            <div className="text-2xl sm:text-3xl md:text-4xl font-light">{timeLeft.seconds}</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-400 mt-1 sm:mt-2">Secs</div>
        </div>
        </div>
    );
};

export default Countdown;