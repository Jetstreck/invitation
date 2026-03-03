"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blurReveal, staggerContainer, fadeUp } from '@/lib/animations';
import SectionBackground from './SectionBackground';

const accounts = [
    {
        name: "Rizaldi Ian Indiarto",
        role: "Mempelai Pria",
        bank: "BCA",
        accountNumber: "1234567890",
        accountName: "Rizaldi Ian Indiarto",
    },
    {
        name: "Farah Karenina Roosyidah",
        role: "Mempelai Wanita",
        bank: "Mandiri",
        accountNumber: "0987654321",
        accountName: "Farah Karenina Roosyidah",
    },
];

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="relative overflow-hidden group mt-4 px-6 py-2 font-sans text-[10px] uppercase tracking-[0.35em] transition-all duration-300"
            style={{
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.35)",
                background: "rgba(212,175,55,0.06)",
            }}
        >
            <span className="relative z-10">
                {copied ? "✓ Tersalin" : "Salin Nomor"}
            </span>
            <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                style={{ background: "rgba(212,175,55,0.12)" }}
            />
        </button>
    );
}

export default function GiftSection() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="relative py-32 px-6 bg-pearl flex flex-col items-center overflow-hidden">
            <SectionBackground variant="gallery" />

            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(247,231,206,0.25) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            <motion.div
                variants={staggerContainer(0.2, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="relative z-10 max-w-2xl w-full mx-auto flex flex-col items-center"
            >
                {/* Section header */}
                <motion.div variants={blurReveal} className="text-center mb-12">
                    {/* Icon */}
                    <motion.div
                        className="mb-6 flex justify-center"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <rect x="5" y="16" width="30" height="20" rx="1" stroke="#D4AF37" strokeWidth="1" />
                            <path d="M5 22 H35" stroke="#D4AF37" strokeWidth="0.8" />
                            <path d="M20 16 V36" stroke="#D4AF37" strokeWidth="0.8" />
                            {/* Bow */}
                            <path d="M20 16 C20 16 14 8 10 10 C6 12 12 16 20 16" stroke="#D4AF37" strokeWidth="0.9" fill="none" />
                            <path d="M20 16 C20 16 26 8 30 10 C34 12 28 16 20 16" stroke="#D4AF37" strokeWidth="0.9" fill="none" />
                            <circle cx="20" cy="16" r="2" stroke="#D4AF37" strokeWidth="0.8" />
                        </svg>
                    </motion.div>

                    <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-4">Hadiah Pernikahan</p>
                    <h2
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light"
                        style={{ letterSpacing: "0.02em" }}
                    >
                        Beri Hadiah
                    </h2>
                    <motion.div
                        className="h-[1px] mx-auto mt-6"
                        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                    />
                    <motion.p
                        variants={fadeUp}
                        className="font-sans text-sm text-foreground/55 font-light mt-6 leading-relaxed"
                    >
                        Doa dan kehadiran Anda adalah hadiah terbaik bagi kami.<br className="hidden md:block" />
                        Namun jika berkenan memberikan tanda kasih, berikut informasinya.
                    </motion.p>
                </motion.div>

                {/* Toggle button */}
                <motion.div variants={blurReveal}>
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative overflow-hidden group font-sans text-[11px] uppercase tracking-[0.4em] px-10 py-4 transition-all duration-300 flex items-center gap-3"
                        style={{
                            color: "#D4AF37",
                            border: "1px solid rgba(212,175,55,0.4)",
                            background: "rgba(212,175,55,0.06)",
                        }}
                    >
                        <span className="relative z-10">{isOpen ? "Tutup" : "Kirim Tanda Kasih"}</span>
                        <motion.span
                            className="relative z-10 text-base"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            ↓
                        </motion.span>
                        {/* Gold fill slides up on hover */}
                        <div
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                            style={{ background: "rgba(212,175,55,0.12)" }}
                        />
                    </motion.button>
                </motion.div>

                {/* Accounts reveal */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="accounts"
                            initial={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                            exit={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full mt-10 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {accounts.map((acc, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex flex-col items-center text-center p-8 relative group"
                                        style={{
                                            background: "rgba(251,251,249,0.6)",
                                            backdropFilter: "blur(20px)",
                                            WebkitBackdropFilter: "blur(20px)",
                                            border: "1px solid rgba(212,175,55,0.2)",
                                            boxShadow: "0 4px 24px rgba(212,175,55,0.08)",
                                        }}
                                    >
                                        {/* Corner ornaments */}
                                        {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r",
                                            "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, j) => (
                                                <div key={j} className={`absolute ${cls} w-4 h-4`}
                                                    style={{ borderColor: "rgba(212,175,55,0.4)" }} />
                                            ))}

                                        {/* Light sweep hover */}
                                        <div className="absolute -left-[100%] top-0 w-[60%] h-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-in-out pointer-events-none"
                                            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)" }}
                                        />

                                        <span className="font-sans text-[9px] uppercase tracking-[0.5em] text-goldGlow mb-3">{acc.role}</span>
                                        <p className="font-serif text-lg text-foreground font-light mb-1" style={{ letterSpacing: "0.04em" }}>
                                            {acc.name}
                                        </p>
                                        <div className="w-10 h-[1px] my-3" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

                                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/50 mb-2">{acc.bank}</p>
                                        <p
                                            className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-widest"
                                            style={{ letterSpacing: "0.1em" }}
                                        >
                                            {acc.accountNumber}
                                        </p>
                                        <p className="font-sans text-[11px] text-foreground/45 mt-1 tracking-wider">{acc.accountName}</p>

                                        <CopyButton text={acc.accountNumber} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
