"use client";
import { motion } from 'framer-motion';
import { staggerContainer, blurReveal, fadeUp } from '@/lib/animations';
import SectionBackground from './SectionBackground';

export default function CoupleSection() {


    return (
        <section className="relative py-32 px-6 min-h-screen flex items-center justify-center bg-pearl overflow-hidden">
            <SectionBackground variant="couple" />

            {/* Slow-spinning batik ring — ultra subtle */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                    className="w-[700px] h-[700px] rounded-full border border-dashed opacity-[0.04]"
                    style={{ borderColor: "#D4AF37" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full border border-dashed opacity-[0.03]"
                    style={{ borderColor: "#D4AF37" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Ambient warm center glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(247,231,206,0.35) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            <motion.div
                variants={staggerContainer(0.25, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full"
            >
                {/* Bismillah header */}
                <motion.div variants={blurReveal} className="mb-14">
                    <p className="font-decorative text-goldGlow/35 text-5xl mb-4 text-shimmer">ꦧꦱꦤ꧀ꦠ</p>
                    <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-foreground/40">Maha Suci Allah</p>
                    <p className="font-sans text-sm mt-5 max-w-md mx-auto text-foreground/60 leading-relaxed font-light">
                        Yang telah menciptakan makhluk berpasang-pasangan. Ya Allah, pertemukanlah kami<br className="hidden md:block" /> dalam cinta dan ridho-Mu.
                    </p>
                </motion.div>

                {/* Names layout */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-16 md:gap-6 lg:gap-20 mt-6">

                    {/* Groom */}
                    <motion.div
                        variants={blurReveal}
                        className="flex-1 flex flex-col items-center group"
                    >
                        <div className="w-full max-w-sm glass-luxury rounded-sm p-10 flex flex-col items-center border-gold-gradient relative overflow-hidden">
                            {/* Light sweep on hover */}
                            <div className="absolute -left-[100%] top-0 w-[60%] h-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out pointer-events-none"
                                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)" }}
                            />

                            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-6 block">Mempelai Pria</span>
                            <h2
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light text-balance mb-4"
                                style={{ letterSpacing: "0.04em" }}
                            >
                                Raden Rama Surya
                            </h2>
                            <div className="w-16 h-[1px] mb-5" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
                            <p className="font-sans text-xs text-foreground/50 tracking-wider leading-relaxed font-light text-center">
                                Putra dari Bapak Suryadiningrat<br />& Ibu Ayu Kusuma
                            </p>
                        </div>
                    </motion.div>

                    {/* Center divider */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col items-center justify-center gap-5 flex-shrink-0"
                    >
                        <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-goldGlow/40 to-transparent" />
                        <motion.span
                            className="font-serif italic text-4xl text-shimmer"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            &amp;
                        </motion.span>
                        <div className="w-[1px] h-14 bg-gradient-to-t from-transparent via-goldGlow/40 to-transparent" />
                    </motion.div>

                    {/* Bride */}
                    <motion.div
                        variants={blurReveal}
                        className="flex-1 flex flex-col items-center group"
                    >
                        <div className="w-full max-w-sm glass-luxury rounded-sm p-10 flex flex-col items-center border-gold-gradient relative overflow-hidden">
                            <div className="absolute -left-[100%] top-0 w-[60%] h-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out pointer-events-none"
                                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)" }}
                            />

                            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-6 block">Mempelai Wanita</span>
                            <h2
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light text-balance mb-4"
                                style={{ letterSpacing: "0.04em" }}
                            >
                                Dewi Shinta Kirana
                            </h2>
                            <div className="w-16 h-[1px] mb-5" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
                            <p className="font-sans text-xs text-foreground/50 tracking-wider leading-relaxed font-light text-center">
                                Putri dari Bapak Dananjaya<br />& Ibu Ratih Permatasari
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
