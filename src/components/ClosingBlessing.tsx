"use client";
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import { blurReveal, staggerContainer, fadeUp } from '@/lib/animations';
import SectionBackground from './SectionBackground';

export default function ClosingBlessing() {
    return (
        <section className="relative py-40 px-6 min-h-[90vh] bg-ivory flex flex-col items-center justify-center text-center overflow-hidden">
            <SectionBackground variant="closing" />

            {/* Soft ivory-to-champagne gradient fill */}
            <div className="absolute inset-0 bg-gradient-to-b from-ivory via-champagne/10 to-ivory pointer-events-none" />

            {/* Warm ambient orb */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    width: 600,
                    height: 600,
                    background: "radial-gradient(circle, rgba(247,231,206,0.2) 0%, transparent 60%)",
                }}
            />

            {/* Rising ambient particles */}
            <FloatingParticles count={16} />

            <motion.div
                variants={staggerContainer(0.2, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
            >
                {/* Javanese floral ornament */}
                <motion.div variants={blurReveal} className="mb-10">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="10" stroke="rgba(212,175,55,0.35)" strokeWidth="0.8" />
                        <circle cx="24" cy="24" r="20" stroke="rgba(212,175,55,0.18)" strokeWidth="0.7" />
                        <line x1="24" y1="4" x2="24" y2="44" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                        <line x1="4" y1="24" x2="44" y2="24" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                        <line x1="10" y1="10" x2="38" y2="38" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
                        <line x1="38" y1="10" x2="10" y2="38" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
                    </svg>
                </motion.div>

                {/* Hanacaraka — shimmer */}
                <motion.h2
                    variants={blurReveal}
                    className="font-decorative text-4xl md:text-6xl text-shimmer mb-8 opacity-90"
                    style={{ letterSpacing: "0.05em" }}
                >
                    ꦩꦠꦸꦂꦤꦸꦮꦸꦤ꧀
                </motion.h2>

                {/* Body text */}
                <motion.p
                    variants={fadeUp}
                    className="font-sans text-sm md:text-base text-foreground/60 leading-loose font-light mb-12 max-w-md"
                >
                    Merupakan kehormatan dan kebahagiaan bagi kami<br className="hidden md:block" />
                    apabila Bapak/Ibu/Saudara/i berkenan hadir<br className="hidden md:block" />
                    dan memberikan doa restu kepada kami.
                </motion.p>

                {/* Animated vertical divider */}
                <motion.div
                    className="w-[1px] mb-12"
                    style={{ background: "linear-gradient(to bottom, transparent, #D4AF37, transparent)" }}
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 64, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Couple name */}
                <motion.h3
                    variants={blurReveal}
                    className="font-serif text-3xl md:text-5xl text-foreground font-light mb-4 text-balance"
                    style={{ letterSpacing: "0.04em" }}
                >
                    Rizaldi & Farah
                </motion.h3>

                {/* Hashtag */}
                <motion.p
                    variants={fadeUp}
                    className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow/50 mt-8"
                >
                    #RizaldiFarah2027
                </motion.p>

                {/* Bottom Hanacaraka watermark */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 1 }}
                    className="font-decorative text-7xl md:text-8xl text-goldGlow/[0.05] mt-12 select-none pointer-events-none"
                >
                    ꦩꦠꦸꦂ
                </motion.p>
            </motion.div>
        </section>
    );
}
