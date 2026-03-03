"use client";
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   STONE DUST PARTICLE
   Falls downward from the gate edges, simulating stone fragments and centuries
   of compressed dust being released when the heavy gate first moves.
───────────────────────────────────────────────────────────────────────────── */
interface DustParticle {
    id: number;
    x: number;   // horizontal spawn position (% from gate edge)
    side: 'left' | 'right';
    size: number;
    duration: number;
    delay: number;
    driftX: number;
}

function StoneDustParticles({ active }: { active: boolean }) {
    const particles: DustParticle[] = Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        side: i % 2 === 0 ? 'left' : 'right',
        size: Math.random() * 3 + 1,
        duration: 1.2 + Math.random() * 1.4,
        delay: Math.random() * 0.8,
        driftX: (Math.random() - 0.5) * 30,
    }));

    if (!active) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.side === 'left' ? `calc(50% - ${p.x}px)` : `calc(50% + ${p.x}px)`,
                        top: `${10 + Math.random() * 60}%`,
                        background: `radial-gradient(circle, rgba(212,175,55,${0.4 + Math.random() * 0.4}) 0%, rgba(247,231,206,0.2) 100%)`,
                    }}
                    initial={{ y: 0, opacity: 0.9, x: 0 }}
                    animate={{
                        y: 80 + Math.random() * 80,
                        opacity: 0,
                        x: p.driftX,
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        ease: [0.22, 0.6, 0.36, 1],
                    }}
                />
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EDGE GLOW — the inner vertical seam glows when fully open
───────────────────────────────────────────────────────────────────────────── */
function EdgeGlow({ side, visible }: { side: 'left' | 'right', visible: boolean }) {
    return (
        <motion.div
            className="absolute top-0 h-full w-8 pointer-events-none z-50"
            style={{
                [side === 'left' ? 'right' : 'left']: '-4px',
                background: side === 'left'
                    ? 'linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent)'
                    : 'linear-gradient(to left, transparent, rgba(212,175,55,0.6), transparent)',
                filter: 'blur(3px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: visible ? 1.8 : 0 }}
        />
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TEMPLE GATE — Main Component
───────────────────────────────────────────────────────────────────────────── */
export default function OpeningGate({ onOpen }: { onOpen: () => void }) {
    const [phase, setPhase] = useState<'idle' | 'anticipation' | 'opening' | 'done'>('idle');
    const [isExiting, setIsExiting] = useState(false);
    const hasTriggered = useRef(false);

    /* Heavy stone easing — very slow at start (inertia), then strong release */
    const STONE_EASE = [0.76, 0, 0.24, 1] as const;

    const handleOpen = useCallback(() => {
        if (hasTriggered.current) return;
        hasTriggered.current = true;

        /* Phase 1: Anticipation shiver — variant handles the micro-tremble */
        setPhase('anticipation');

        /* Phase 2: After shiver completes (0.55s), start hinge rotation */
        setTimeout(() => setPhase('opening'), 550);

        /* Phase 3: After doors fully open + settle (0.55 + 2.5s), fade out */
        setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setPhase('done');
                onOpen();
            }, 900);
        }, 3200);
    }, [onOpen]);

    if (phase === 'done') return null;

    /* ────────────────────────────────────────────────────────────────────────
       Framer Motion variants for each door
    ───────────────────────────────────────────────────────────────────────── */
    const leftDoorVariants = {
        closed: { rotateY: 0 },
        anticipation: {
            rotateY: [0, 2, -1, 1.5, 0],
            transition: { duration: 0.5, ease: "easeInOut" as const },
        },
        open: {
            rotateY: 82,
            transition: {
                delay: 0.5,          // start after anticipation
                duration: 1.8,
                ease: STONE_EASE,
            },
        },
    };

    const rightDoorVariants = {
        closed: { rotateY: 0 },
        anticipation: {
            rotateY: [0, -2, 1, -1.5, 0],
            transition: { duration: 0.5, ease: "easeInOut" as const },
        },
        open: {
            rotateY: -82,
            transition: {
                delay: 0.7,          // 0.2s stagger after left door
                duration: 1.8,
                ease: STONE_EASE,
            },
        },
    };

    const currentVariant = phase === 'idle' ? 'closed' : phase === 'anticipation' ? 'anticipation' : 'open';

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    key="gate-overlay"
                    className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden"
                    style={{ background: '#FFFFF0' }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    }}
                >
                    {/* ── Parchment ambient background ── */}
                    <div className="absolute inset-0 bg-sunlight-gradient opacity-80 pointer-events-none" />
                    <div className="absolute inset-0 bg-subtle-marble opacity-20 mix-blend-multiply pointer-events-none" />

                    {/* ── Ambient floating motes (idle state) ── */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: 2 + (i % 3),
                                    height: 2 + (i % 3),
                                    left: `${8 + i * 11}%`,
                                    bottom: '25%',
                                    background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)',
                                }}
                                animate={{ y: [0, -70], opacity: [0, 0.5, 0] }}
                                transition={{
                                    duration: 4 + i * 0.6,
                                    delay: i * 0.8,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* ────────────────────────────────────────────────────────────────
                        MAIN GATE — perspective container for 3D hinge effect
                        perspective: 1500px → realistic scale (not a fisheye distortion)
                        Camera push-in: scale 1 → 1.04 during opening
                    ─────────────────────────────────────────────────────────────── */}
                    <motion.div
                        className="relative w-full h-[85vh] md:h-[90vh] max-w-5xl mx-auto flex items-end justify-center cursor-pointer select-none"
                        style={{ perspective: '1500px' }}
                        onClick={handleOpen}
                        animate={
                            phase === 'opening'
                                ? { scale: 1.04 }
                                : { scale: 1 }
                        }
                        transition={{ duration: 2.5, ease: 'easeOut' }}
                    >

                        {/* ── Warm golden light — revealed as doors open ── */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                                width: '200px',
                                height: '500px',
                                background: 'radial-gradient(ellipse, rgba(255,243,200,1) 0%, rgba(247,220,120,0.5) 35%, rgba(212,175,55,0.15) 60%, transparent 80%)',
                                filter: 'blur(32px)',
                            }}
                            animate={{
                                scale: phase === 'opening' ? [0.9, 1.18] : [1, 1.04, 1],
                                opacity: phase === 'opening' ? [0.5, 1] : [0.45, 0.65, 0.45],
                            }}
                            transition={
                                phase === 'opening'
                                    ? { duration: 2.2, delay: 0.8, ease: 'easeOut' }
                                    : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                            }
                        />

                        {/* ── Volumetric light rays ── */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-full pointer-events-none overflow-hidden">
                            {[...Array(7)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-0 left-1/2 origin-top"
                                    style={{
                                        width: '2px',
                                        height: '68%',
                                        transformOrigin: 'top center',
                                        background: 'linear-gradient(to bottom, rgba(247,231,206,0.7), transparent)',
                                        rotate: `${(i - 3) * 11}deg`,
                                        filter: 'blur(5px)',
                                    }}
                                    animate={{ opacity: [0.08, 0.28, 0.08] }}
                                    transition={{
                                        duration: 3 + i * 0.4,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: i * 0.3,
                                    }}
                                />
                            ))}
                        </div>

                        {/* ── Stone dust particles (triggered on open) ── */}
                        <StoneDustParticles active={phase === 'anticipation' || phase === 'opening'} />

                        {/* ════════════════════════════════════════════════════════════
                            LEFT DOOR PANEL
                            Hinge: RIGHT edge of left door (outer-most edge of left panel
                            relative to the viewer = the FAR left edge when you look at
                            the physical gate face-on).
                            transformOrigin: "0% 50%" — hinge at the LEFT physical edge
                            rotateY: 0 → +82° (swings outward to the left in 3D)
                        ════════════════════════════════════════════════════════════ */}
                        <motion.div
                            className="absolute bottom-0 right-1/2 w-[45%] md:w-[300px] h-[70vh] md:h-[80vh] z-20"
                            style={{
                                transformOrigin: '0% 50%',        // hinge = left edge of this panel
                                transformStyle: 'preserve-3d',
                                /* stepped staircase silhouette clipping — Candi Bentar profile */
                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 85%, 15% 85%, 15% 70%, 30% 70%, 30% 55%, 45% 55%, 45% 40%, 60% 40%, 60% 25%, 75% 25%, 75% 10%, 90% 10%, 90% 0)',
                                background: 'linear-gradient(160deg, #F5F0E8 0%, #EDE5D0 35%, #E8D9BB 70%, #F0E4CA 100%)',
                                boxShadow: '6px 0 40px rgba(212,175,55,0.22), inset -3px 0 25px rgba(212,175,55,0.14), 2px 0 0 rgba(212,175,55,0.3)',
                            }}
                            variants={leftDoorVariants}
                            initial="closed"
                            animate={currentVariant}
                        >
                            {/* Marble surface texture */}
                            <div className="absolute inset-0 bg-subtle-marble opacity-30 mix-blend-multiply pointer-events-none" />

                            {/* Gold seam lines along inner edge */}
                            <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-goldGlow to-transparent opacity-70" />
                            <div className="absolute inset-y-0 right-4 w-[1px] bg-gradient-to-b from-transparent via-goldGlow/40 to-transparent" />

                            {/* Hanacaraka script — vertical */}
                            <div
                                className="absolute right-8 top-[28%] font-decorative text-3xl md:text-5xl text-shimmer"
                                style={{ writingMode: 'vertical-rl', transform: 'scale(-1, -1)' }}
                            >
                                ꦱꦸꦒꦼꦁ
                            </div>

                            {/* Inner face depth shadow — intensifies as door opens */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to right, rgba(74,56,38,0.75) 0%, rgba(74,56,38,0.2) 40%, transparent 100%)',
                                    zIndex: 10,
                                }}
                                animate={{ opacity: phase === 'opening' ? [0, 0.7] : 0 }}
                                transition={{ duration: 1.6, delay: 0.6, ease: 'easeIn' }}
                            />

                            {/* Subtle inner glow animation */}
                            <div className="absolute inset-0 inner-glow pointer-events-none" />

                            {/* Edge glow when fully open */}
                            <EdgeGlow side="left" visible={phase === 'opening'} />
                        </motion.div>

                        {/* ════════════════════════════════════════════════════════════
                            RIGHT DOOR PANEL
                            Hinge: LEFT edge of right door
                            transformOrigin: "100% 50%"
                            rotateY: 0 → -82°
                        ════════════════════════════════════════════════════════════ */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 w-[45%] md:w-[300px] h-[70vh] md:h-[80vh] z-20"
                            style={{
                                transformOrigin: '100% 50%',       // hinge = right edge of this panel
                                transformStyle: 'preserve-3d',
                                clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 85%, 85% 85%, 85% 70%, 70% 70%, 70% 55%, 55% 55%, 55% 40%, 40% 40%, 40% 25%, 25% 25%, 25% 10%, 10% 10%, 10% 0)',
                                background: 'linear-gradient(200deg, #F5F0E8 0%, #EDE5D0 35%, #E8D9BB 70%, #F0E4CA 100%)',
                                boxShadow: '-6px 0 40px rgba(212,175,55,0.22), inset 3px 0 25px rgba(212,175,55,0.14), -2px 0 0 rgba(212,175,55,0.3)',
                            }}
                            variants={rightDoorVariants}
                            initial="closed"
                            animate={currentVariant}
                        >
                            {/* Marble surface texture */}
                            <div className="absolute inset-0 bg-subtle-marble opacity-30 mix-blend-multiply pointer-events-none" />

                            {/* Gold seam lines along inner edge */}
                            <div className="absolute inset-y-0 left-0 w-[1.5px] bg-gradient-to-b from-transparent via-goldGlow to-transparent opacity-70" />
                            <div className="absolute inset-y-0 left-4 w-[1px] bg-gradient-to-b from-transparent via-goldGlow/40 to-transparent" />

                            {/* Hanacaraka script — vertical */}
                            <div
                                className="absolute left-8 top-[28%] font-decorative text-3xl md:text-5xl text-shimmer"
                                style={{ writingMode: 'vertical-rl' }}
                            >
                                ꦫꦮꦸꦃ
                            </div>

                            {/* Inner face depth shadow */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to left, rgba(74,56,38,0.75) 0%, rgba(74,56,38,0.2) 40%, transparent 100%)',
                                    zIndex: 10,
                                }}
                                animate={{ opacity: phase === 'opening' ? [0, 0.7] : 0 }}
                                transition={{ duration: 1.6, delay: 0.8, ease: 'easeIn' }}
                            />

                            <div className="absolute inset-0 inner-glow pointer-events-none" />

                            <EdgeGlow side="right" visible={phase === 'opening'} />
                        </motion.div>

                        {/* ── White-light bloom on full open (centre flash) ── */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none z-30"
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(255,255,240,0.95) 0%, transparent 65%)',
                            }}
                            animate={{ opacity: phase === 'opening' ? [0, 0, 0.6, 0] : 0 }}
                            transition={{ duration: 2.4, delay: 1.8, ease: 'easeOut', times: [0, 0.5, 0.8, 1] }}
                        />

                        {/* ── Tap‑to‑open prompt (hidden once opening starts) ── */}
                        <motion.div
                            className="absolute bottom-10 flex flex-col items-center gap-3 z-30"
                            animate={
                                phase !== 'idle'
                                    ? { opacity: 0, y: 20, pointerEvents: 'none' }
                                    : { opacity: 1, y: 0 }
                            }
                            transition={{ duration: 0.5 }}
                        >
                            <motion.p
                                className="font-sans text-xs md:text-sm tracking-[0.45em] uppercase text-foreground/70 font-light"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                Tap to Open
                            </motion.p>
                            <motion.div
                                className="w-[1px] h-12 bg-gradient-to-b from-transparent via-goldGlow to-transparent"
                                animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1.2, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </motion.div>

                        {/* ── Bottom ground fog ── */}
                        <div className="absolute bottom-0 w-full h-[22vh] bg-gradient-to-t from-ivory to-transparent z-40 pointer-events-none" />
                    </motion.div>

                    {/* ── Full-screen light veil — fades in at the very end ── */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-50"
                        style={{ background: 'rgba(255,255,240,1)', originX: '50%', originY: '50%' }}
                        animate={{ opacity: isExiting ? 1 : 0 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
