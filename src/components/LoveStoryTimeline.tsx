"use client";
import { motion } from 'framer-motion';
import { blurReveal } from '@/lib/animations';
import SectionBackground from './SectionBackground';

const stories = [
    {
        year: "2021",
        title: "Pertemuan Pertama",
        description: "Kami bertemu di sebuah acara amal budaya. Obrolan sederhana tentang seni tradisional memicu koneksi yang akan bertahan seumur hidup.",
    },
    {
        year: "2022",
        title: "Memulai Hubungan",
        description: "Bertahun-tahun berbagi tawa, saling mendukung mimpi satu sama lain, dan menyadari bahwa kami memandang dunia melalui lensa yang sama.",
    },
    {
        year: "2027",
        title: "Lamaran",
        description: "Di bawah langit senja yang keemasan, dengan restu kedua keluarga, sebuah janji diucapkan untuk membangun masa depan bersama.",
    },
];

export default function LoveStoryTimeline() {
    return (
        <section className="relative py-32 px-6 min-h-screen bg-ivory flex flex-col items-center overflow-hidden">
            <SectionBackground variant="timeline" />
            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(247,231,206,0.2) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Section header */}
            <motion.div
                variants={blurReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="text-center mb-24 relative z-10"
            >
                <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-goldGlow mb-4">Perjalanan Kami</p>
                <h2
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light text-balance"
                    style={{ letterSpacing: "0.02em" }}
                >
                    Kisah Cinta
                </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-3xl w-full mx-auto z-10">
                {/* Animated gradient timeline line */}
                <motion.div
                    className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
                    style={{
                        background: "linear-gradient(to bottom, rgba(212,175,55,0.05), rgba(212,175,55,0.5) 20%, rgba(212,175,55,0.5) 80%, rgba(212,175,55,0.05))",
                        transformOrigin: "top",
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="flex flex-col gap-24">
                    {stories.map((story, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Glowing timeline node */}
                            <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-20">
                                <motion.div
                                    className="w-5 h-5 rounded-full flex items-center justify-center"
                                    style={{
                                        background: "linear-gradient(135deg, #F7E7CE, #FBFBF9)",
                                        border: "1px solid rgba(212,175,55,0.8)",
                                        boxShadow: "0 0 20px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.2)",
                                    }}
                                    animate={{
                                        boxShadow: [
                                            "0 0 10px rgba(212,175,55,0.3)",
                                            "0 0 25px rgba(212,175,55,0.6)",
                                            "0 0 10px rgba(212,175,55,0.3)",
                                        ],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-goldGlow" />
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'}`}>
                                <motion.span
                                    className="font-serif text-4xl md:text-5xl text-shimmer block mb-2"
                                    style={{ letterSpacing: "0.02em" }}
                                >
                                    {story.year}
                                </motion.span>
                                <h3 className="font-sans text-base md:text-lg uppercase tracking-[0.25em] text-foreground/70 font-light mb-4">
                                    {story.title}
                                </h3>
                                <p className="font-sans text-sm md:text-base text-foreground/50 leading-relaxed font-light">
                                    {story.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
