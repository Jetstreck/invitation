"use client";
import { motion } from 'framer-motion';
import { staggerContainer, blurReveal } from '@/lib/animations';

const images = [
    { id: 1, aspect: 'aspect-[3/4]' },
    { id: 2, aspect: 'aspect-[4/5]' },
    { id: 3, aspect: 'aspect-square' },
    { id: 4, aspect: 'aspect-[4/5]' },
    { id: 5, aspect: 'aspect-[3/4]' },
];

export default function Gallery() {
    return (
        <section className="relative py-32 px-6 min-h-screen bg-pearl flex flex-col items-center overflow-hidden">
            {/* Ambient glow top */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(247,231,206,0.25) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center mb-16"
            >
                <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-4">Our Moments</p>
                <h2
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light text-balance"
                    style={{ letterSpacing: "0.02em" }}
                >
                    The Gallery
                </h2>
                <motion.div
                    className="h-[1px] mx-auto mt-8"
                    style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                />
            </motion.div>

            {/* Masonry grid */}
            <motion.div
                variants={staggerContainer(0.18, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="relative z-10 max-w-6xl w-full columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
            >
                {images.map((img) => (
                    <motion.div
                        key={img.id}
                        variants={blurReveal}
                        className={`relative break-inside-avoid w-full ${img.aspect} group cursor-pointer`}
                    >
                        {/* Outer frame with gold gradient border */}
                        <div
                            className="w-full h-full border-gold-gradient rounded-sm overflow-hidden relative"
                            style={{
                                background: "rgba(251,251,249,0.8)",
                                boxShadow: "0 4px 24px rgba(212,175,55,0.08)",
                            }}
                        >
                            {/* Inner padding frame */}
                            <div className="absolute inset-3 overflow-hidden">
                                {/* Corner ornaments */}
                                {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
                                    "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, j) => (
                                        <div key={j} className={`absolute ${cls} w-4 h-4`}
                                            style={{ borderColor: "rgba(212,175,55,0.45)" }} />
                                    ))}

                                {/* Placeholder content — gradient that simulates a photo */}
                                <motion.div
                                    className="w-full h-full"
                                    style={{
                                        background: `linear-gradient(${135 + img.id * 20}deg, rgba(247,231,206,0.6) 0%, rgba(251,251,249,0.9) 50%, rgba(255,255,240,0.7) 100%)`,
                                        transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {/* Center monogram */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span
                                            className="font-decorative text-3xl text-shimmer opacity-40"
                                        >
                                            R&S
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Hover light sweep */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                                    }}
                                />
                            </div>

                            {/* Card hover glow */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    boxShadow: "0 0 30px rgba(212,175,55,0.12), inset 0 0 20px rgba(212,175,55,0.06)",
                                }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
