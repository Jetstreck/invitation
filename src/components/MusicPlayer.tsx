"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MUSIC_SRC = "/music/Billie Eilish - hotline (edit).mp3";
const VOLUME = 0.18; // volume halus — bisa dinaikkan sampai 0.5

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const audio = new Audio(MUSIC_SRC);
        audio.loop = true;
        audio.volume = 0;
        audio.preload = "auto";
        audioRef.current = audio;

        // Fade-in helper
        const fadeIn = (target: number) => {
            let vol = 0;
            const step = setInterval(() => {
                vol = Math.min(vol + 0.01, target);
                audio.volume = vol;
                if (vol >= target) clearInterval(step);
            }, 80);
        };

        const fadeOut = () => {
            const step = setInterval(() => {
                audio.volume = Math.max(audio.volume - 0.015, 0);
                if (audio.volume <= 0) {
                    audio.pause();
                    clearInterval(step);
                }
            }, 80);
        };

        // ── Auto-play strategy ──
        // Browser requires a user gesture before audio can play.
        // We listen for the FIRST interaction on the page (the gate click),
        // then watch the hero section and start music when it enters view.
        let heroObserver: IntersectionObserver | null = null;
        let userInteracted = false;
        let heroVisible = false;

        const tryPlay = () => {
            if (userInteracted && heroVisible && audio.paused) {
                audio.play()
                    .then(() => {
                        fadeIn(VOLUME);
                        setIsPlaying(true);
                    })
                    .catch(() => { /* blocked */ });
            }
        };

        const onInteract = () => {
            userInteracted = true;
            tryPlay();
            // Remove listener after first interaction
            document.removeEventListener("click", onInteract);
            document.removeEventListener("touchstart", onInteract);
        };

        document.addEventListener("click", onInteract, { once: true });
        document.addEventListener("touchstart", onInteract, { once: true });

        // Observe #hero section
        const observeHero = () => {
            const heroEl = document.getElementById("hero");
            if (!heroEl) {
                // Retry until hero is mounted
                setTimeout(observeHero, 200);
                return;
            }
            heroObserver = new IntersectionObserver(
                ([entry]) => {
                    heroVisible = entry.isIntersecting;
                    if (heroVisible) {
                        tryPlay();
                    } else {
                        // Optional: fade out when leaving hero
                        // fadeOut();
                    }
                },
                { threshold: 0.3 }
            );
            heroObserver.observe(heroEl);
        };
        observeHero();

        // Store fadeOut ref for toggle button
        (audio as HTMLAudioElement & { _fadeOut?: () => void })._fadeOut = fadeOut;
        (audio as HTMLAudioElement & { _fadeIn?: (t: number) => void })._fadeIn = fadeIn;

        return () => {
            audio.pause();
            audio.src = "";
            heroObserver?.disconnect();
            document.removeEventListener("click", onInteract);
            document.removeEventListener("touchstart", onInteract);
        };
    }, []);

    const toggle = () => {
        const audio = audioRef.current as (HTMLAudioElement & { _fadeOut?: () => void; _fadeIn?: (t: number) => void }) | null;
        if (!audio) return;
        if (isPlaying) {
            audio._fadeOut?.();
            setIsPlaying(false);
        } else {
            audio.play()
                .then(() => {
                    audio._fadeIn?.(VOLUME);
                    setIsPlaying(true);
                })
                .catch(() => { });
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                        className="font-sans text-[10px] uppercase tracking-[0.3em] px-3 py-2 pointer-events-none"
                        style={{
                            background: "rgba(251,251,249,0.85)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(212,175,55,0.2)",
                            color: "rgba(74,64,54,0.7)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {isPlaying ? "Jeda Musik" : "Putar Musik"}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main button */}
            <motion.button
                onClick={toggle}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="relative w-12 h-12 flex items-center justify-center overflow-hidden"
                style={{
                    background: "rgba(251,251,249,0.75)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(212,175,55,0.35)",
                    boxShadow: "0 4px 24px rgba(212,175,55,0.12)",
                }}
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {/* Pulsing ring when playing */}
                {isPlaying && (
                    <>
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{ border: "1px solid rgba(212,175,55,0.5)" }}
                            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{ border: "1px solid rgba(212,175,55,0.3)" }}
                            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                    </>
                )}

                {isPlaying ? (
                    /* Equalizer bars */
                    <div className="flex items-end gap-[3px] h-5">
                        {[0.6, 1, 0.75, 0.9, 0.5].map((h, i) => (
                            <motion.div
                                key={i}
                                className="w-[3px] rounded-sm"
                                style={{ background: "#D4AF37" }}
                                animate={{ scaleY: [h, 1, 0.4, 0.8, h] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                                initial={{ scaleY: h, originY: 1 }}
                            />
                        ))}
                    </div>
                ) : (
                    /* Music note */
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18V5l12-2v13" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="6" cy="18" r="3" stroke="#D4AF37" strokeWidth="1.5" />
                        <circle cx="18" cy="16" r="3" stroke="#D4AF37" strokeWidth="1.5" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
}
