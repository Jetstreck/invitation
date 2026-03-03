"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { staggerContainer, blurReveal } from '@/lib/animations';
import SectionBackground from './SectionBackground';

const images = [
    { id: 1, src: '/prewedding/1.png', aspect: 'aspect-[3/4]' },
    { id: 2, src: '/prewedding/2.png', aspect: 'aspect-[4/5]' },
    { id: 3, src: '/prewedding/3.png', aspect: 'aspect-square' },
    { id: 4, src: '/prewedding/4.png', aspect: 'aspect-[4/5]' },
    { id: 5, src: '/prewedding/5.png', aspect: 'aspect-[3/4]' },
];

export default function Gallery() {
    const [lightbox, setLightbox] = useState<string | null>(null);

    return (
        <section className="relative py-32 px-6 min-h-screen bg-pearl flex flex-col items-center overflow-hidden">
            <SectionBackground variant="gallery" />
            {/* Ambient glow top */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(247,231,206,0.15) 0%, transparent 70%)",
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
                <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-4">Momen Kami</p>
                <h2
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light text-balance"
                    style={{ letterSpacing: "0.02em" }}
                >
                    Galeri Foto
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
                        onClick={() => setLightbox(img.src)}
                    >
                        {/* Outer frame with gold gradient border */}
                        <div
                            className="w-full h-full border-gold-gradient rounded-sm overflow-hidden relative"
                            style={{
                                boxShadow: "0 4px 24px rgba(212,175,55,0.08)",
                            }}
                        >
                            {/* Actual photo */}
                            <Image
                                src={img.src}
                                alt={`Foto prewedding ${img.id}`}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Corner ornaments */}
                            {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r",
                                "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, j) => (
                                    <div key={j} className={`absolute ${cls} w-5 h-5 z-10`}
                                        style={{ borderColor: "rgba(212,175,55,0.7)" }} />
                                ))}

                            {/* Hover light sweep */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                                style={{
                                    background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                                }}
                            />

                            {/* Hover overlay with zoom icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{
                                        background: "rgba(251,251,249,0.75)",
                                        backdropFilter: "blur(8px)",
                                        border: "1px solid rgba(212,175,55,0.4)",
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        key="lightbox"
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 cursor-pointer"
                        style={{ background: "rgba(248,247,242,0.96)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center"
                            initial={{ scale: 0.92, filter: "blur(8px)" }}
                            animate={{ scale: 1, filter: "blur(0px)" }}
                            exit={{ scale: 0.92, filter: "blur(8px)" }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Gold frame */}
                            <div
                                className="relative w-full h-full overflow-hidden"
                                style={{
                                    border: "1px solid rgba(212,175,55,0.3)",
                                    boxShadow: "0 20px 80px rgba(212,175,55,0.12), 0 4px 24px rgba(0,0,0,0.08)",
                                }}
                            >
                                <Image
                                    src={lightbox}
                                    alt="Foto prewedding"
                                    width={1200}
                                    height={900}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                    style={{ display: "block" }}
                                />
                                {/* Corner ornaments */}
                                {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r",
                                    "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((cls, j) => (
                                        <div key={j} className={`absolute ${cls} w-6 h-6`}
                                            style={{ borderColor: "rgba(212,175,55,0.6)" }} />
                                    ))}
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute -top-4 -right-4 w-9 h-9 flex items-center justify-center font-sans text-xs"
                                style={{
                                    background: "rgba(251,251,249,0.98)",
                                    border: "1px solid rgba(212,175,55,0.35)",
                                    color: "#D4AF37",
                                }}
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
