"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blurReveal } from '@/lib/animations';

export default function RSVP() {
    const [formState, setFormState] = useState({ name: '', isAttending: 'yes', guests: '1' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section className="relative py-32 px-6 min-h-screen bg-ivory flex items-center justify-center overflow-hidden">
            {/* Marble texture */}
            <div className="absolute inset-0 bg-subtle-marble opacity-[0.10] mix-blend-multiply pointer-events-none" />

            {/* Center warm orb */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(247,231,206,0.3) 0%, transparent 60%)",
                }}
            />

            <motion.div
                variants={blurReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="relative z-10 w-full max-w-xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-4">Konfirmasi Kehadiran</p>
                    <h2
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light mb-6"
                        style={{ letterSpacing: "0.02em" }}
                    >
                        RSVP
                    </h2>
                    <div className="h-[1px] w-16 mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
                    <p className="font-sans text-sm md:text-base text-foreground/60 tracking-wide font-light">
                        Mohon konfirmasi kehadiran sebelum 1 Oktober 2027.
                    </p>
                </div>

                {/* Glass form card */}
                <div
                    className="relative p-8 md:p-12 border-gold-gradient"
                    style={{
                        background: "rgba(251,251,249,0.7)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(212,175,55,0.22)",
                        boxShadow: "0 8px 30px rgba(212,175,55,0.06), 0 2px 4px rgba(74,64,54,0.02)",
                    }}
                >
                    {/* Inner frame line */}
                    <div
                        className="absolute top-4 left-4 right-4 bottom-4 pointer-events-none"
                        style={{ border: "1px solid rgba(212,175,55,0.10)" }}
                    />

                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center py-12 flex flex-col items-center gap-4"
                            >
                                <motion.span
                                    className="font-decorative text-6xl text-shimmer mb-4 block"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    ꦩ
                                </motion.span>
                                <h3 className="font-serif text-3xl text-foreground" style={{ letterSpacing: "0.04em" }}>Terima Kasih</h3>
                                <div className="h-[1px] w-12" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
                                <p className="font-sans text-sm text-foreground/55 font-light">Kehadiran dan doa restu Anda sangat berarti bagi kami.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-7 relative z-10"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, filter: "blur(8px)" }}
                            >
                                {/* Name field */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/60">Nama Lengkap</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Masukkan nama lengkap Anda"
                                            className="w-full bg-transparent border-b px-0 py-3 text-foreground font-sans focus:outline-none placeholder:text-foreground/25 transition-all duration-500"
                                            style={{
                                                borderColor: focusedField === 'name' ? 'rgba(212,175,55,0.8)' : 'rgba(212,175,55,0.25)',
                                                boxShadow: focusedField === 'name' ? '0 1px 0 rgba(212,175,55,0.4)' : 'none',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Attendance */}
                                <div className="flex flex-col gap-4 mt-2">
                                    <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/60">Apakah Anda akan hadir?</label>
                                    <div className="flex gap-8">
                                        {[
                                            { value: 'yes', label: 'Dengan Senang Hadir' },
                                            { value: 'no', label: 'Mohon Maaf Berhalangan' },
                                        ].map((opt) => (
                                            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center justify-center flex-shrink-0">
                                                    <input
                                                        type="radio"
                                                        name="attendance"
                                                        value={opt.value}
                                                        checked={formState.isAttending === opt.value}
                                                        onChange={(e) => setFormState({ ...formState, isAttending: e.target.value })}
                                                        className="peer opacity-0 absolute inset-0 cursor-pointer"
                                                    />
                                                    <div
                                                        className="w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300"
                                                        style={{
                                                            border: `1px solid ${formState.isAttending === opt.value ? '#D4AF37' : 'rgba(212,175,55,0.4)'}`,
                                                            boxShadow: formState.isAttending === opt.value ? '0 0 10px rgba(212,175,55,0.3)' : 'none',
                                                        }}
                                                    >
                                                        <div className={`w-2 h-2 rounded-full bg-goldGlow transition-transform duration-300 ${formState.isAttending === opt.value ? 'scale-100' : 'scale-0'}`} />
                                                    </div>
                                                </div>
                                                <span className="font-sans text-sm text-foreground/70 group-hover:text-goldGlow transition-colors duration-300">
                                                    {opt.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Guest count */}
                                <AnimatePresence>
                                    {formState.isAttending === 'yes' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex flex-col gap-2"
                                        >
                                            <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/60">Jumlah Tamu</label>
                                            <select
                                                value={formState.guests}
                                                onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                                                className="w-full bg-transparent border-b border-goldGlow/30 px-0 py-3 text-foreground font-sans focus:outline-none focus:border-goldGlow/80 transition-colors appearance-none cursor-pointer"
                                                style={{ borderColor: 'rgba(212,175,55,0.3)' }}
                                            >
                                                <option value="1">1 Orang</option>
                                                <option value="2">2 Orang</option>
                                            </select>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                                    className="mt-6 w-full relative overflow-hidden group font-sans text-[10px] uppercase tracking-[0.4em] py-5 transition-all duration-300"
                                    style={{
                                        color: "#D4AF37",
                                        border: "1px solid rgba(212,175,55,0.35)",
                                        background: "rgba(212,175,55,0.06)",
                                    }}
                                >
                                    <span className="relative z-10">Kirim Konfirmasi</span>
                                    {/* Gold fill slides up on hover */}
                                    <div
                                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                                        style={{ background: "rgba(212,175,55,0.12)" }}
                                    />
                                    {/* Shimmer sweep */}
                                    <div
                                        className="absolute inset-0 -left-full group-hover:left-full transition-all duration-1000 ease-in-out w-[50%]"
                                        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)" }}
                                    />
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
}
