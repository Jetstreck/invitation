"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function AnimatedNumber({ value }: { value: number }) {
    const [displayed, setDisplayed] = useState(value);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        if (value !== displayed) {
            setAnimKey(k => k + 1);
            setDisplayed(value);
        }
    }, [value]);

    return (
        <div className="relative overflow-hidden h-[1.2em]">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={animKey}
                    className="font-serif text-3xl md:text-5xl text-foreground font-light block"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    {displayed.toString().padStart(2, '0')}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date("2026-10-24T09:00:00").getTime();
        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = targetDate - now;
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            }
        };
        updateTimer();
        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, []);

    const blocks = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-3 md:gap-6 justify-center items-center mt-12 w-full">
            {blocks.map((block, i) => (
                <motion.div
                    key={block.label}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center p-4 md:p-7 min-w-[72px] md:min-w-[110px] relative"
                    style={{
                        background: "rgba(251,251,249,0.6)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(212,175,55,0.2)",
                        boxShadow: "0 4px 20px rgba(212,175,55,0.08), inset 0 0 20px rgba(212,175,55,0.05)",
                    }}
                >
                    <AnimatedNumber value={block.value} />
                    <div className="w-8 h-[1px] my-2" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
                    <span className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-foreground/50">
                        {block.label}
                    </span>

                    {/* Corner ornaments */}
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-goldGlow/40" />
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-goldGlow/40" />
                    <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-goldGlow/40" />
                    <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-goldGlow/40" />
                </motion.div>
            ))}
        </div>
    );
}
