"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FloatingParticles from './FloatingParticles';
import { staggerContainer, blurReveal, fadeUp } from '@/lib/animations';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // 2.5D parallax layers
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const midY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
    const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

    const nameWords = ["Rizaldi", "&", "Farah"];

    return (
        <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">

            {/* ── BG Layer (slowest parallax) ── */}
            <motion.div className="absolute inset-0" style={{ y: bgY }}>
                <div className="absolute inset-0 bg-ivory" />
                {/* Animated marble texture — ultra subtle */}
                <div
                    className="absolute inset-0 bg-subtle-marble opacity-[0.06] mix-blend-multiply"
                    style={{ backgroundSize: "600px 600px" }}
                />
            </motion.div>

            {/* ── Ambient orb (mid layer, 2.5D push-in) ── */}
            <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ y: midY, scale: orbScale }}
            >
                <motion.div
                    className="w-[65vw] h-[65vw] max-w-[640px] max-h-[640px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(247,231,206,0.55) 0%, rgba(247,231,206,0.2) 40%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* ── Floating ambient particles ── */}
            <FloatingParticles count={12} />

            {/* ── Decorative frame ── */}
            <div className="absolute inset-6 md:inset-10 pointer-events-none" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>
                {/* Animated corner brackets */}
                {[
                    "top-[-1px] left-[-1px] border-t border-l",
                    "top-[-1px] right-[-1px] border-t border-r",
                    "bottom-[-1px] left-[-1px] border-b border-l",
                    "bottom-[-1px] right-[-1px] border-b border-r",
                ].map((cls, i) => (
                    <motion.div
                        key={i}
                        className={`absolute ${cls} w-8 md:w-14 h-8 md:h-14 border-goldGlow/60`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                ))}
            </div>

            {/* ── Main Content (foreground — slowest Y) ── */}
            <motion.div
                style={{ y: textY }}
                className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
            >
                {/* Overline */}
                <motion.p
                    variants={blurReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="font-sans text-xs md:text-sm tracking-[0.5em] uppercase text-goldGlow/80 mb-8"
                >
                    Undangan Pernikahan
                </motion.p>

                {/* Hero name — per-word stagger */}
                <motion.div
                    className="mb-8 relative"
                    variants={staggerContainer(0.15, 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <h1 className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 md:gap-y-0 font-serif font-light leading-tight">
                        {nameWords.map((word, i) => (
                            <motion.span
                                key={i}
                                variants={blurReveal}
                                className={`
                                    ${word === "&"
                                        ? "text-shimmer text-5xl md:text-6xl lg:text-7xl italic"
                                        : "text-5xl md:text-7xl lg:text-9xl text-foreground"
                                    }
                                `}
                                style={{
                                    letterSpacing: word !== "&" ? "0.02em" : undefined,
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Gold glow line beneath names */}
                    <motion.div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-[1px]"
                        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "80%", opacity: 0.5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                </motion.div>

                {/* Animated vertical divider */}
                <motion.div
                    className="w-[1px] my-10 bg-gradient-to-b from-transparent via-goldGlow/50 to-transparent"
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 80, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Date & venue */}
                <motion.div
                    variants={staggerContainer(0.2, 0.8)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="flex flex-col items-center gap-3"
                >
                    <motion.p
                        variants={fadeUp}
                        className="font-sans text-sm md:text-base tracking-[0.35em] text-foreground/60 uppercase"
                    >
                        Sabtu, 24 Oktober 2027
                    </motion.p>
                    <motion.p
                        variants={fadeUp}
                        className="font-sans text-sm md:text-base text-foreground/40 tracking-wider font-light"
                    >
                        Tuban & Kota Malang · Jawa Timur
                    </motion.p>
                </motion.div>

                {/* Hanacaraka subtitle — subtle batik */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 1.2 }}
                    className="mt-6 font-decorative text-2xl md:text-3xl text-goldGlow/25 select-none"
                >
                    ꦩꦠꦸꦂ
                </motion.p>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mt-16 flex flex-col items-center gap-2"
                >
                    <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-light text-foreground/30">
                        Gulir
                    </span>
                    <div className="w-[1px] h-10 bg-foreground/10 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 w-full h-1/2 bg-goldGlow/60"
                            animate={{ y: [0, 40] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
