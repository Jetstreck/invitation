"use client";
import { motion } from 'framer-motion';
import { staggerContainer, blurReveal, cardHover } from '@/lib/animations';
import Countdown from './Countdown';

const events = [
    {
        title: "Akad Nikah",
        dayName: "Saturday",
        date: "24",
        month: "October 2026",
        time: "09.00 – 11.00 WIB",
        venue: "Keraton Grand Mosque",
        address: "Jln. Kebesaran No. 1, Surabaya",
    },
    {
        title: "Resepsi",
        dayName: "Saturday",
        date: "24",
        month: "October 2026",
        time: "18.30 – 22.00 WIB",
        venue: "Keraton Grand Ballroom",
        address: "Jln. Kebesaran No. 1, Surabaya",
    },
];

export default function EventDetail() {
    return (
        <section className="relative py-32 px-6 min-h-screen flex items-center justify-center bg-ivory overflow-hidden">
            {/* Subtle marble underlay */}
            <div className="absolute inset-0 bg-subtle-marble opacity-[0.12] mix-blend-multiply pointer-events-none" />

            {/* Ambient warm glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(247,231,206,0.3) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            <motion.div
                variants={staggerContainer(0.22, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full"
            >
                {/* Section header */}
                <motion.div variants={blurReveal} className="text-center mb-16">
                    <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-4">The Wedding Event</p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light text-balance"
                        style={{ letterSpacing: "0.02em" }}>
                        Save The Date
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

                {/* Event cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full px-2 md:px-8">
                    {events.map((ev, i) => (
                        <motion.div
                            key={i}
                            variants={blurReveal}
                            {...cardHover}
                            className="glass-luxury border-gold-gradient rounded-sm p-10 flex flex-col items-center text-center relative overflow-hidden group cursor-default"
                        >
                            {/* Corner brackets */}
                            {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r",
                                "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((cls, j) => (
                                    <div key={j} className={`absolute ${cls} w-5 h-5 border-goldGlow/50`} />
                                ))}

                            {/* Light sweep on hover */}
                            <div
                                className="absolute -left-[80%] top-0 w-[50%] h-full group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out pointer-events-none z-10"
                                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.10), transparent)" }}
                            />

                            <h3
                                className="font-serif text-3xl text-foreground mb-4"
                                style={{ letterSpacing: "0.04em" }}
                            >
                                {ev.title}
                            </h3>
                            <div className="w-12 h-[1px] mb-6" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

                            <p className="font-sans font-medium text-foreground/50 tracking-[0.3em] mb-2 uppercase text-xs">
                                {ev.dayName}
                            </p>
                            <p className="font-serif text-5xl text-goldGlow mb-2 text-shimmer" style={{ lineHeight: 1 }}>
                                {ev.date}
                            </p>
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/50 mb-7">
                                {ev.month}
                            </p>

                            <p className="font-sans text-sm text-foreground/60 tracking-wider mb-2">{ev.time}</p>
                            <p className="font-sans text-sm text-foreground/70 tracking-wider font-light">{ev.venue}</p>
                            <p className="font-sans text-xs text-foreground/40 mt-1">{ev.address}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Countdown */}
                <motion.div variants={blurReveal} className="mt-24 w-full flex flex-col items-center">
                    <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-foreground/35 mb-8">Time Remaining</p>
                    <Countdown />
                </motion.div>
            </motion.div>
        </section>
    );
}
