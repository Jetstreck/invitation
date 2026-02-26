/**
 * Centralized Framer Motion animation variants
 * Used across all components for consistent luxury feel.
 */

import { Variants } from "framer-motion";

// ─── Entrance Variants ──────────────────────────────────────────────────────

/** Cinematic blur-to-sharp focus pull reveal */
export const blurReveal: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 20,
    },
    show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

/** Simple elegant fade up */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Scale in from slightly smaller */
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Stagger container — wraps children with stagger timing */
export const staggerContainer = (
    staggerChildren = 0.18,
    delayChildren = 0.1
): Variants => ({
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren, delayChildren },
    },
});

/** Per-word character reveal for headline text */
export const wordReveal: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
};

// ─── Infinite / Ambient Variants ────────────────────────────────────────────

/** Slow floating movement for ornaments & particles */
export const floatVariant = (yRange = 10, duration = 6): object => ({
    animate: {
        y: [0, -yRange, 0],
        transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
});

/** Gold shimmer pulse for glowing elements */
export const goldPulse: object = {
    animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.08, 1],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

/** Breathing ambient orb */
export const ambientOrb: object = {
    animate: {
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.55, 0.3],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

// ─── Micro-interaction Variants ─────────────────────────────────────────────

/** Button press feel */
export const buttonPress = {
    whileHover: { scale: 1.01, transition: { duration: 0.2 } },
    whileTap: { scale: 0.97, transition: { duration: 0.1, ease: "easeOut" as const } },
};

/** Card hover — slight lift + glow */
export const cardHover = {
    whileHover: {
        y: -4,
        boxShadow: "0 16px 40px rgba(212, 175, 55, 0.15)",
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};
