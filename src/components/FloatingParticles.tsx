"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
    id: number;
    size: number;
    x: number;
    duration: number;
    delay: number;
    driftX: number;
    opacity: number;
}

/**
 * FloatingParticles — ambient light particle system.
 * Very subtle, performance-optimized, purely decorative.
 * Place as absolute-positioned child inside a relative container.
 */
export default function FloatingParticles({ count = 14 }: { count?: number }) {
    const particles: Particle[] = useMemo(() =>
        Array.from({ length: count }, (_, i) => ({
            id: i,
            size: Math.random() * 4 + 2,           // 2–6px
            x: Math.random() * 100,                 // % of container width
            duration: Math.random() * 4 + 5,        // 5–9s
            delay: Math.random() * 6,               // staggered start
            driftX: (Math.random() - 0.5) * 30,    // -15px to +15px
            opacity: Math.random() * 0.4 + 0.2,    // 0.2–0.6
        })), [count]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        bottom: "10%",
                        background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}) 0%, rgba(212,175,55,0) 70%)`,
                    }}
                    animate={{
                        y: [0, -140],
                        x: [0, p.driftX],
                        opacity: [0, p.opacity * 1.2, p.opacity * 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}
