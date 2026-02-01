import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference > 0) {
            setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            });
        }
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex justify-center gap-6 md:gap-12 py-10 font-serif text-gray-800 border-b border-gray-200 w-full max-w-lg mx-auto mb-12">
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-light">{timeLeft.days}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">Days</div>
        </div>
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-light">{timeLeft.hours}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">Hours</div>
        </div>
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-light">{timeLeft.minutes}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">Mins</div>
        </div>
        </div>
    );
};

export default Countdown;