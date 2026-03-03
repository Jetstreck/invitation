"use client";
import { useState, useCallback } from "react";
import LuxuryLoader from "@/components/LuxuryLoader";
import OpeningGate from "@/components/OpeningGate";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import EventDetail from "@/components/EventDetail";
import Gallery from "@/components/Gallery";
import LoveStoryTimeline from "@/components/LoveStoryTimeline";
import RSVP from "@/components/RSVP";
import ClosingBlessing from "@/components/ClosingBlessing";
import GiftSection from "@/components/GiftSection";
import MusicPlayer from "@/components/MusicPlayer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Stage = "loading" | "gate" | "content";

export default function Home() {
  const [stage, setStage] = useState<Stage>("loading");

  // Lock scroll until content is shown
  useEffect(() => {
    if (stage !== "content") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [stage]);

  const handleLoaderComplete = useCallback(() => {
    setStage("gate");
  }, []);

  const handleGateOpen = useCallback(() => {
    setStage("content");
  }, []);

  return (
    <div className="relative min-h-screen bg-ivory font-sans text-foreground">
      <MusicPlayer />

      {/* ── 1. LuxuryLoader ── */}
      <AnimatePresence>
        {stage === "loading" && (
          <LuxuryLoader key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* ── 2. Opening Gate ── */}
      <AnimatePresence>
        {stage === "gate" && (
          <motion.div
            key="gate-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <OpeningGate onOpen={handleGateOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. Main Content ── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={stage === "content" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={stage !== "content" ? "h-screen overflow-hidden pointer-events-none" : ""}
      >
        <HeroSection />
        <CoupleSection />
        <EventDetail />
        <Gallery />
        <LoveStoryTimeline />
        <GiftSection />
        <RSVP />
        <ClosingBlessing />
      </motion.main>
    </div>
  );
}
