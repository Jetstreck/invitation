"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * LuxuryLoader — cinematic intro screen.
 * Displays a Hanacaraka character reveal with warm light sweep,
 * then fades to ivory. Calls onComplete when done (~2.8s).
 */
export default function LuxuryLoader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"entering" | "holding" | "exiting">("entering");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("holding"), 1200);
        const t2 = setTimeout(() => setPhase("exiting"), 2200);
        const t3 = setTimeout(() => onComplete(), 3200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    const chars = ["ꦫ", "ꦩ", "ꦲ", "ꦤ", "ꦥ"];

    return (
        <AnimatePresence>
            {phase !== "exiting" ? (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "#FFFFF0" }}
                    exit={{
                        opacity: 0,
                        filter: "blur(12px)",
                        transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
                    }}
                >
                    {/* Warm ambient orb */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(247,231,206,0.6) 0%, rgba(255,255,240,0) 70%)" }}
                        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Gold shimmer sweep line */}
                    <motion.div
                        className="absolute top-0 left-0 h-full w-[2px] opacity-0"
                        style={{ background: "linear-gradient(to bottom, transparent, #D4AF37, transparent)" }}
                        animate={{
                            left: ["0%", "100%"],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                    />

                    {/* Hanacaraka characters stagger */}
                    <div className="relative z-10 flex gap-4 md:gap-8 mb-10">
                        {chars.map((char, i) => (
                            <motion.span
                                key={i}
                                className="font-decorative text-5xl md:text-7xl"
                                style={{ color: "#D4AF37" }}
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 0.85, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    {/* Thin divider line */}
                    <motion.div
                        className="relative z-10 h-[1px] bg-gradient-to-r from-transparent via-goldGlow to-transparent"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 160, opacity: 0.5 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Subtitle */}
                    <motion.p
                        className="relative z-10 mt-6 font-sans text-[10px] uppercase tracking-[0.5em] text-foreground/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        Sebuah Perayaan Suci
                    </motion.p>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
