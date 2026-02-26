"use client";
import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useAnimate, stagger } from 'framer-motion';

interface DustParticle {
    id: number;
    x: number;
    y: number;
    angle: number;
    distance: number;
    size: number;
}

export default function OpeningGate({ onOpen }: { onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [dustParticles, setDustParticles] = useState<DustParticle[]>([]);
    const [scope, animate] = useAnimate();

    const spawnDust = useCallback(() => {
        const newParticles: DustParticle[] = Array.from({ length: 14 }, (_, i) => ({
            id: Date.now() + i,
            x: 50,
            y: 60,
            angle: (i / 14) * 360,
            distance: Math.random() * 120 + 60,
            size: Math.random() * 5 + 2,
        }));
        setDustParticles(newParticles);
        setTimeout(() => setDustParticles([]), 2000);
    }, []);

    const handleOpen = useCallback(() => {
        if (isOpen) return;
        spawnDust();
        setIsOpen(true);
        setTimeout(() => onOpen(), 2200);
    }, [isOpen, spawnDust, onOpen]);

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-ivory"
                    exit={{
                        opacity: 0,
                        filter: "blur(8px)",
                        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
                    }}
                >
                    {/* Parchment background gradient */}
                    <div className="absolute inset-0 bg-sunlight-gradient opacity-80 pointer-events-none" />

                    {/* Subtle radiating marble texture */}
                    <div className="absolute inset-0 bg-subtle-marble opacity-20 mix-blend-multiply pointer-events-none" />

                    {/* Ambient floating particles in bg */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: Math.random() * 3 + 2,
                                    height: Math.random() * 3 + 2,
                                    left: `${10 + i * 12}%`,
                                    bottom: "30%",
                                    background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)",
                                }}
                                animate={{ y: [0, -80], opacity: [0, 0.6, 0] }}
                                transition={{ duration: 4 + i * 0.5, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
                            />
                        ))}
                    </div>

                    <div
                        ref={scope}
                        className="relative w-full h-[85vh] md:h-[90vh] max-w-5xl mx-auto flex items-end justify-center cursor-pointer"
                        onClick={handleOpen}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* ── Light behind gate ── */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[480px] rounded-full pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse, rgba(247,231,206,0.95) 0%, rgba(212,175,55,0.3) 40%, transparent 70%)",
                                filter: "blur(40px)",
                            }}
                            animate={{
                                scale: isHovered ? 1.25 : 1,
                                opacity: isHovered ? 1 : 0.6,
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />

                        {/* ── Volumetric light rays (SVG) ── */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-full pointer-events-none overflow-hidden">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-0 left-1/2 origin-top"
                                    style={{
                                        width: "2px",
                                        height: "65%",
                                        transformOrigin: "top center",
                                        background: "linear-gradient(to bottom, rgba(247,231,206,0.6), transparent)",
                                        rotate: `${(i - 2.5) * 12}deg`,
                                        filter: "blur(4px)",
                                    }}
                                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                                    transition={{
                                        duration: 3 + i * 0.4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.3,
                                    }}
                                />
                            ))}
                        </div>

                        {/* ── Dust particles burst ── */}
                        {dustParticles.map((p) => {
                            const radians = (p.angle * Math.PI) / 180;
                            const tx = Math.cos(radians) * p.distance;
                            const ty = Math.sin(radians) * p.distance;
                            return (
                                <motion.div
                                    key={p.id}
                                    className="absolute rounded-full pointer-events-none z-30"
                                    style={{
                                        width: p.size,
                                        height: p.size,
                                        left: "50%",
                                        top: "50%",
                                        background: "radial-gradient(circle, rgba(212,175,55,0.9), rgba(247,231,206,0.4))",
                                    }}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    animate={{ x: tx, y: ty, opacity: 0, scale: 0.2 }}
                                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                />
                            );
                        })}

                        {/* ── Left Gate Panel ── */}
                        <motion.div
                            className="absolute bottom-0 right-1/2 w-[45%] md:w-[300px] h-[70vh] md:h-[80vh] z-20"
                            style={{
                                clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 85%, 15% 85%, 15% 70%, 30% 70%, 30% 55%, 45% 55%, 45% 40%, 60% 40%, 60% 25%, 75% 25%, 75% 10%, 90% 10%, 90% 0)",
                                background: "linear-gradient(135deg, #FBFBF9 0%, #FFFFF0 40%, #F7E7CE 100%)",
                                boxShadow: "4px 0 30px rgba(212,175,55,0.15), inset -2px 0 20px rgba(212,175,55,0.08)",
                                transformOrigin: "bottom right",
                            }}
                            initial={{ x: "-2px" }}
                            animate={isOpen ? { x: "-52vw", rotateY: 20, opacity: 0 } : { x: "-2px", rotateY: 0, opacity: 1 }}
                            transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Inner marble texture */}
                            <div className="w-full h-full bg-subtle-marble opacity-30 mix-blend-multiply" />

                            {/* Gold decorative border line */}
                            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-goldGlow to-transparent opacity-60" />
                            <div className="absolute inset-y-0 right-3 w-[1px] bg-gradient-to-b from-transparent via-goldGlow/30 to-transparent" />

                            {/* Hanacaraka with shimmer */}
                            <div
                                className="absolute right-8 top-[28%] font-decorative text-3xl md:text-5xl text-shimmer"
                                style={{ writingMode: 'vertical-rl', transform: 'scale(-1, -1)' }}
                            >
                                ꦱꦸꦒꦼꦁ
                            </div>

                            {/* Inner glow overlay */}
                            <div className="absolute inset-0 inner-glow pointer-events-none" />
                        </motion.div>

                        {/* ── Right Gate Panel ── */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 w-[45%] md:w-[300px] h-[70vh] md:h-[80vh] z-20"
                            style={{
                                clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 85%, 85% 85%, 85% 70%, 70% 70%, 70% 55%, 55% 55%, 55% 40%, 40% 40%, 40% 25%, 25% 25%, 25% 10%, 10% 10%, 10% 0)",
                                background: "linear-gradient(225deg, #FBFBF9 0%, #FFFFF0 40%, #F7E7CE 100%)",
                                boxShadow: "-4px 0 30px rgba(212,175,55,0.15), inset 2px 0 20px rgba(212,175,55,0.08)",
                                transformOrigin: "bottom left",
                            }}
                            initial={{ x: "2px" }}
                            animate={isOpen ? { x: "52vw", rotateY: -20, opacity: 0 } : { x: "2px", rotateY: 0, opacity: 1 }}
                            transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="w-full h-full bg-subtle-marble opacity-30 mix-blend-multiply" />
                            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-goldGlow to-transparent opacity-60" />
                            <div className="absolute inset-y-0 left-3 w-[1px] bg-gradient-to-b from-transparent via-goldGlow/30 to-transparent" />
                            <div
                                className="absolute left-8 top-[28%] font-decorative text-3xl md:text-5xl text-shimmer"
                                style={{ writingMode: 'vertical-rl' }}
                            >
                                ꦫꦮꦸꦃ
                            </div>
                            <div className="absolute inset-0 inner-glow pointer-events-none" />
                        </motion.div>

                        {/* ── Tap to Open Prompt ── */}
                        <motion.div
                            className="absolute bottom-10 flex flex-col items-center gap-3 z-30"
                            animate={isOpen ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.p
                                className="font-sans text-xs md:text-sm tracking-[0.45em] uppercase text-foreground/70 font-light"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Tap to Open
                            </motion.p>
                            <motion.div
                                className="w-[1px] h-12 bg-gradient-to-b from-transparent via-goldGlow to-transparent"
                                animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1.2, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* ── Bottom fog ── */}
                        <div className="absolute bottom-0 w-full h-[22vh] bg-gradient-to-t from-ivory to-transparent z-40 pointer-events-none" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
