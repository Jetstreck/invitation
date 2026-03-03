"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */
export type SectionVariant = 'couple' | 'event' | 'timeline' | 'gallery' | 'closing';

/* ─────────────────────────────────────────────────────────────────────────────
   SVG MOTIFS — all inline, zero external assets
   Opacities: 3–5% max. Large repeat cells (200–400px).
   "Batik as atmosphere, not wallpaper."
───────────────────────────────────────────────────────────────────────────── */

/**
 * Kawung — overlapping circles forming a four-petal lotus grid.
 * Oldest Javanese batik motif; symbolises purity and life's source.
 * Used: hero and timeline sections.
 */
function KawungSvg({ size = 200 }: { size?: number }) {
    const r = size / 4;
    const cx = size / 2;
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* four overlapping quarter-circles forming the kawung petal */}
            <circle cx={cx} cy={r} r={r} stroke="#D4AF37" strokeWidth="0.6" fill="none" />
            <circle cx={cx} cy={size - r} r={r} stroke="#D4AF37" strokeWidth="0.6" fill="none" />
            <circle cx={r} cy={cx} r={r} stroke="#D4AF37" strokeWidth="0.6" fill="none" />
            <circle cx={size - r} cy={cx} r={r} stroke="#D4AF37" strokeWidth="0.6" fill="none" />
            {/* Centre diamond */}
            <polygon
                points={`${cx},${cx - r * 0.4} ${cx + r * 0.4},${cx} ${cx},${cx + r * 0.4} ${cx - r * 0.4},${cx}`}
                stroke="#D4AF37" strokeWidth="0.5" fill="none"
            />
        </svg>
    );
}

/**
 * Mega Mendung — concentric cloud arcs inspired by Cirebon cloud batik.
 * Symbolises fertility and the sky; often used in royal contexts.
 * Used: couple section (top-right placement).
 */
function MegaMendungSvg() {
    return (
        <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cloud arc stack — concentric arcs, 7 layers */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <path
                    key={i}
                    d={`M ${10 + i * 18},${180 - i * 10}
                        Q ${80 + i * 12},${60 - i * 8} 160,${80 - i * 6}
                        Q ${240 - i * 12},${60 - i * 8} ${310 - i * 18},${180 - i * 10}`}
                    stroke="#D4AF37"
                    strokeWidth={0.7 - i * 0.06}
                    fill="none"
                    opacity={1 - i * 0.08}
                />
            ))}
            {/* Second cloud cluster, offset */}
            {[0, 1, 2, 3].map((i) => (
                <path
                    key={`b${i}`}
                    d={`M ${60 + i * 14},${200}
                        Q ${130 + i * 10},${120 - i * 10} ${200},${140 - i * 8}
                        Q ${260 - i * 10},${120 - i * 10} ${300 - i * 14},${200}`}
                    stroke="#D4AF37"
                    strokeWidth={0.5}
                    fill="none"
                    opacity={0.5 - i * 0.1}
                />
            ))}
        </svg>
    );
}

/**
 * Parang — diagonal parallel interlocking S-curves.
 * Symbolises unbroken waves; reserved for royalty.
 * Used: event detail section.
 */
function ParangSvg() {
    return (
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 6 diagonal parang S-curves */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i} transform={`translate(${i * 46}, 0)`}>
                    <path
                        d={`M 0,280 C 10,240 30,200 20,160 C 10,120 -10,80 0,40 C 10,0 30,-20 20,-40`}
                        stroke="#D4AF37"
                        strokeWidth="0.7"
                        fill="none"
                    />
                    <path
                        d={`M 22,280 C 32,240 52,200 42,160 C 32,120 12,80 22,40 C 32,0 52,-20 42,-40`}
                        stroke="#B8962A"
                        strokeWidth="0.4"
                        fill="none"
                        opacity="0.6"
                    />
                </g>
            ))}
        </svg>
    );
}

/**
 * Truntum — small 8-pointed star/flower grid.
 * Symbolises guiding love; traditionally used in wedding ceremonies.
 * Used: closing section (tiled full coverage).
 */
function TruntumSvg({ size = 60 }: { size?: number }) {
    const c = size / 2;
    const pts: string[] = [];
    for (let i = 0; i < 8; i++) {
        const outer = (i * Math.PI * 2) / 8;
        const inner = outer + Math.PI / 8;
        const ro = c * 0.45;
        const ri = c * 0.18;
        pts.push(`${c + Math.cos(outer) * ro},${c + Math.sin(outer) * ro}`);
        pts.push(`${c + Math.cos(inner) * ri},${c + Math.sin(inner) * ri}`);
    }
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points={pts.join(' ')} stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle cx={c} cy={c} r={c * 0.12} stroke="#D4AF37" strokeWidth="0.4" fill="none" />
        </svg>
    );
}

/**
 * Kasatrian border — thin concentric diamond ornamental frame fragment.
 * Placed in corners for a royal Keraton aesthetic.
 */
function CornerFiligree({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
    const transforms: Record<string, string> = {
        tl: '',
        tr: 'scale(-1,1) translate(-80,0)',
        bl: 'scale(1,-1) translate(0,-80)',
        br: 'scale(-1,-1) translate(-80,-80)',
    };
    return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform={transforms[corner]}>
                {/* L-shaped bracket lines */}
                <line x1="0" y1="0" x2="60" y2="0" stroke="#D4AF37" strokeWidth="0.6" opacity="0.5" />
                <line x1="0" y1="0" x2="0" y2="60" stroke="#D4AF37" strokeWidth="0.6" opacity="0.5" />
                {/* Inner offset L */}
                <line x1="8" y1="8" x2="45" y2="8" stroke="#D4AF37" strokeWidth="0.4" opacity="0.3" />
                <line x1="8" y1="8" x2="8" y2="45" stroke="#D4AF37" strokeWidth="0.4" opacity="0.3" />
                {/* Diamond tip ornament */}
                <polygon
                    points="0,0 5,-3 10,0 5,3"
                    fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"
                    transform="translate(55, -1.5)"
                />
                <polygon
                    points="0,0 -3,5 0,10 3,5"
                    fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"
                    transform="translate(-1.5, 54)"
                />
                {/* Small end-caps */}
                <circle cx="60" cy="0" r="1.5" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4" />
                <circle cx="0" cy="60" r="1.5" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4" />
            </g>
        </svg>
    );
}


/**
 * Gunungan (Wayang) — The tree of life / cosmic mountain.
 * Drawn as an authentic wayang gunungan silhouette:
 *  – Pointed meru/flame spire at the top
 *  – Rounded mountain aura layers
 *  – Central trunk with branching foliage
 *  – Decorative scrolling roots at the base
 * Symbolises the cosmos and is used to open/close wayang performances.
 * Extremely exclusive Keraton aesthetic.
 */
function GununganSvg({ size = 300 }: { size?: number }) {
    const w = 200;
    const h = 320;
    return (
        <svg
            width={size}
            height={size * (h / w)}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* ── Outer aura / halo silhouette ── */}
            <path
                d="M100 8 C100 8 145 50 160 110 C175 170 165 230 145 260 L100 280 L55 260 C35 230 25 170 40 110 C55 50 100 8 100 8 Z"
                stroke="#D4AF37" strokeWidth="1.2" fill="none" opacity="0.5"
            />
            {/* Inner body */}
            <path
                d="M100 22 C100 22 138 60 152 115 C166 170 156 222 138 250 L100 268 L62 250 C44 222 34 170 48 115 C62 60 100 22 100 22 Z"
                stroke="#D4AF37" strokeWidth="1.5" fill="none"
            />

            {/* ── Spire / meru tip at top ── */}
            <path d="M100 8 L100 0" stroke="#D4AF37" strokeWidth="1" />
            <path d="M100 0 L94 12 L100 9 L106 12 Z" stroke="#D4AF37" strokeWidth="1" fill="none" />
            {/* Stepped meru rings */}
            <ellipse cx="100" cy="22" rx="10" ry="4" stroke="#D4AF37" strokeWidth="0.8" />
            <ellipse cx="100" cy="32" rx="16" ry="5" stroke="#D4AF37" strokeWidth="0.7" />
            <ellipse cx="100" cy="44" rx="22" ry="6" stroke="#D4AF37" strokeWidth="0.6" />

            {/* ── Central trunk ── */}
            <path d="M100 50 L100 248" stroke="#D4AF37" strokeWidth="1.4" />

            {/* ── Symmetrical foliage / lotus branches ── */}
            {/* Level 1 (high) */}
            <path d="M100 78 Q125 62 138 72 Q128 84 100 78 Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            <path d="M100 78 Q75 62 62 72 Q72 84 100 78 Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            {/* Level 2 */}
            <path d="M100 108 Q132 88 148 100 Q136 116 100 108 Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            <path d="M100 108 Q68 88 52 100 Q64 116 100 108 Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            {/* Level 3 */}
            <path d="M100 140 Q138 118 155 132 Q142 150 100 140 Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            <path d="M100 140 Q62 118 45 132 Q58 150 100 140 Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            {/* Level 4 (low) */}
            <path d="M100 172 Q140 148 158 165 Q144 182 100 172 Z" stroke="#D4AF37" strokeWidth="0.7" fill="none" />
            <path d="M100 172 Q60 148 42 165 Q56 182 100 172 Z" stroke="#D4AF37" strokeWidth="0.7" fill="none" />

            {/* ── Central flower / lotus at midpoint ── */}
            <circle cx="100" cy="160" r="6" stroke="#D4AF37" strokeWidth="0.8" />
            <circle cx="100" cy="160" r="3" stroke="#D4AF37" strokeWidth="0.6" />

            {/* ── Decorative oval ornament house at lower section ── */}
            <path d="M80 200 Q100 192 120 200 L124 228 Q100 238 76 228 Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />

            {/* ── Base platform (padmasana) ── */}
            <path d="M55 262 L145 262" stroke="#D4AF37" strokeWidth="1.2" />
            <path d="M50 268 L150 268" stroke="#D4AF37" strokeWidth="1" />
            <path d="M44 274 L156 274" stroke="#D4AF37" strokeWidth="0.8" />

            {/* ── Scrolling roots — left ── */}
            <path d="M55 262 C30 250 10 268 20 280 C30 292 50 280 45 270" stroke="#D4AF37" strokeWidth="0.9" fill="none" />
            <path d="M60 265 C42 258 28 270 36 278" stroke="#D4AF37" strokeWidth="0.6" fill="none" />
            {/* ── Scrolling roots — right ── */}
            <path d="M145 262 C170 250 190 268 180 280 C170 292 150 280 155 270" stroke="#D4AF37" strokeWidth="0.9" fill="none" />
            <path d="M140 265 C158 258 172 270 164 278" stroke="#D4AF37" strokeWidth="0.6" fill="none" />

            {/* ── Ground baseline flare ── */}
            <path d="M30 280 Q100 290 170 280" stroke="#D4AF37" strokeWidth="0.7" fill="none" />
        </svg>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KAWUNG TILED PATTERN (for timeline section left edge)
───────────────────────────────────────────────────────────────────────────── */
function KawungTilePattern() {
    const cellSize = 120;
    const rows = 5;
    const cols = 2;
    return (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)` }}
            >
                {Array.from({ length: rows * cols }).map((_, i) => (
                    <div key={i} style={{ width: cellSize, height: cellSize, opacity: 0.5 - Math.abs(i % rows - rows / 2) * 0.12 }}>
                        <KawungSvg size={cellSize} />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TRUNTUM TILE GRID (for closing section)
───────────────────────────────────────────────────────────────────────────── */
function TruntumGrid() {
    const size = 64;
    const cols = 12;
    const rows = 8;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, ${size}px)`,
                    gap: '0px',
                    opacity: 1,
                }}
            >
                {Array.from({ length: rows * cols }).map((_, i) => (
                    <div key={i} style={{ width: size, height: size }}>
                        <TruntumSvg size={size} />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT — SectionBackground
───────────────────────────────────────────────────────────────────────────── */
export default function SectionBackground({ variant }: { variant: SectionVariant }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const floatY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

    /* Slow ambient float — nearly imperceptible (12–18s period) */
    const floatAnim = {
        animate: { y: [0, -10, 0] },
        transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' as const },
    };
    const slowFloat = {
        animate: { y: [0, -6, 0] },
        transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' as const },
    };

    /* ── COUPLE ─────────────────────────────────────────────────────────── */
    if (variant === 'couple') {
        return (
            <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

                {/* Mega Mendung arcs — top right, asymmetric */}
                <motion.div
                    className="absolute -top-8 -right-12 opacity-[0.09]"
                    style={{ y: floatY }}
                    {...floatAnim}
                >
                    <MegaMendungSvg />
                </motion.div>

                {/* Secondary cloud echo — bottom left, flipped */}
                <motion.div
                    className="absolute -bottom-6 -left-10 opacity-[0.07]"
                    style={{ rotate: 180, y: floatY }}
                    {...slowFloat}
                >
                    <MegaMendungSvg />
                </motion.div>

                {/* Hanacaraka watermark — top left corner */}
                <motion.div
                    className="absolute top-12 left-6"
                    {...slowFloat}
                >
                    <span
                        className="font-decorative select-none"
                        style={{
                            fontSize: '9rem',
                            lineHeight: 1,
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.08))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        ꦲꦤ꧀ꦝꦫꦤ꧀
                    </span>
                </motion.div>

                {/* Kawung solo accent — centre left */}
                <motion.div
                    className="absolute left-8 top-1/2 -translate-y-1/2 opacity-[0.08]"
                    {...floatAnim}
                >
                    <KawungSvg size={180} />
                </motion.div>

                {/* Corner filigrees */}
                <div className="absolute top-6 left-6 opacity-80"><CornerFiligree corner="tl" /></div>
                <div className="absolute top-6 right-6 opacity-80"><CornerFiligree corner="tr" /></div>
                <div className="absolute bottom-6 left-6 opacity-80"><CornerFiligree corner="bl" /></div>
                <div className="absolute bottom-6 right-6 opacity-80"><CornerFiligree corner="br" /></div>

                {/* Ambient radial glow — top right */}
                <div
                    className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
            </div>
        );
    }

    /* ── EVENT DETAIL ─────────────────────────────────────────────────────── */
    if (variant === 'event') {
        return (
            <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

                {/* Gunungan motif — centre background */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12] md:opacity-[0.18]"
                    {...slowFloat}
                >
                    <GununganSvg size={480} />
                </motion.div>

                {/* Parang diagonal — bottom left */}
                <motion.div
                    className="absolute -bottom-8 -left-8 opacity-[0.09]"
                    style={{ rotate: -15, y: floatY }}
                    {...floatAnim}
                >
                    <ParangSvg />
                </motion.div>

                {/* Parang echo — top right, mirrored */}
                <motion.div
                    className="absolute -top-8 -right-8 opacity-[0.06]"
                    style={{ rotate: 165, y: floatY }}
                    {...slowFloat}
                >
                    <ParangSvg />
                </motion.div>

                {/* Hanacaraka watermark — bottom right */}
                <motion.div
                    className="absolute bottom-16 right-8"
                    {...slowFloat}
                >
                    <span
                        className="font-decorative select-none"
                        style={{
                            fontSize: '8rem',
                            lineHeight: 1,
                            writingMode: 'vertical-rl',
                            background: 'linear-gradient(180deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        ꦱꦸꦒꦼꦁ
                    </span>
                </motion.div>

                {/* Corner filigrees */}
                <div className="absolute top-6 left-6 opacity-70"><CornerFiligree corner="tl" /></div>
                <div className="absolute top-6 right-6 opacity-70"><CornerFiligree corner="tr" /></div>
                <div className="absolute bottom-6 left-6 opacity-70"><CornerFiligree corner="bl" /></div>
                <div className="absolute bottom-6 right-6 opacity-70"><CornerFiligree corner="br" /></div>

                {/* Radial glow — centre top */}
                <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(247,231,206,0.12) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                />

                {/* Kawung accent — centre right */}
                <motion.div
                    className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.08]"
                    {...floatAnim}
                >
                    <KawungSvg size={160} />
                </motion.div>
            </div>
        );
    }

    /* ── LOVE STORY TIMELINE ─────────────────────────────────────────────── */
    if (variant === 'timeline') {
        return (
            <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

                {/* Kawung tile column — far left edge */}
                <motion.div
                    className="opacity-[0.09]"
                    style={{ y: floatY }}
                >
                    <KawungTilePattern />
                </motion.div>

                {/* Kawung solo accent — far right */}
                <motion.div
                    className="absolute right-6 top-1/3 opacity-[0.09]"
                    {...floatAnim}
                >
                    <KawungSvg size={200} />
                </motion.div>
                <motion.div
                    className="absolute right-20 bottom-1/4 opacity-[0.06]"
                    {...slowFloat}
                >
                    <KawungSvg size={120} />
                </motion.div>

                {/* Hanacaraka watermark — top right */}
                <motion.div
                    className="absolute top-16 right-8"
                    {...slowFloat}
                >
                    <span
                        className="font-decorative select-none"
                        style={{
                            fontSize: '7rem',
                            lineHeight: 1,
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        ꦫꦱ
                    </span>
                </motion.div>

                {/* Subtle mega mendung arc — header area */}
                <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-[0.07]"
                    {...floatAnim}
                    style={{ y: floatY }}
                >
                    <MegaMendungSvg />
                </motion.div>

                {/* Radial glow — left side warm accent */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[350px] h-[600px]"
                    style={{
                        background: 'radial-gradient(ellipse at left, rgba(212,175,55,0.05) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />

                {/* Minimal corner marks */}
                <div className="absolute top-8 right-8 opacity-55"><CornerFiligree corner="tr" /></div>
                <div className="absolute bottom-8 left-8 opacity-55"><CornerFiligree corner="bl" /></div>
            </div>
        );
    }

    /* ── GALLERY ─────────────────────────────────────────────────────────── */
    if (variant === 'gallery') {
        return (
            <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

                {/* Very faint Mega Mendung — top right background */}
                <motion.div
                    className="absolute -top-10 -right-16 opacity-[0.07]"
                    style={{ y: floatY }}
                    {...slowFloat}
                >
                    <MegaMendungSvg />
                </motion.div>

                {/* Hanacaraka watermark — right edge, vertical */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 right-4"
                    {...floatAnim}
                >
                    <span
                        className="font-decorative select-none"
                        style={{
                            fontSize: '6rem',
                            lineHeight: 1,
                            writingMode: 'vertical-rl',
                            background: 'linear-gradient(180deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        ꦧꦸꦏꦸ
                    </span>
                </motion.div>

                {/* Kawung accent — bottom left */}
                <motion.div
                    className="absolute bottom-12 left-6 opacity-[0.07]"
                    {...slowFloat}
                >
                    <KawungSvg size={150} />
                </motion.div>

                {/* Radial glow bottom */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px]"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(247,231,206,0.1) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                />
            </div>
        );
    }

    /* ── CLOSING BLESSING ───────────────────────────────────────────────── */
    if (variant === 'closing') {
        return (
            <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

                {/* Gunungan motif — centre background */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.14] md:opacity-[0.22]"
                    {...floatAnim}
                >
                    <GununganSvg size={560} />
                </motion.div>

                {/* Truntum star grid — full coverage, ultra subtle */}
                <motion.div
                    className="absolute inset-0 opacity-[0.06]"
                    {...slowFloat}
                >
                    <TruntumGrid />
                </motion.div>

                {/* Corner filigrees — all four corners */}
                <div className="absolute top-8 left-8 opacity-70"><CornerFiligree corner="tl" /></div>
                <div className="absolute top-8 right-8 opacity-70"><CornerFiligree corner="tr" /></div>
                <div className="absolute bottom-8 left-8 opacity-70"><CornerFiligree corner="bl" /></div>
                <div className="absolute bottom-8 right-8 opacity-70"><CornerFiligree corner="br" /></div>

                {/* Mega Mendung — top, very faint */}
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-[0.09]"
                    style={{ y: floatY }}
                    {...floatAnim}
                >
                    <MegaMendungSvg />
                </motion.div>

                {/* Warm golden radial — centre glow enhancement */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(247,231,206,0.04) 40%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />

                {/* Parang accent — bottom-left corner */}
                <motion.div
                    className="absolute -bottom-6 -left-6 opacity-[0.07]"
                    style={{ rotate: -10 }}
                    {...slowFloat}
                >
                    <ParangSvg />
                </motion.div>
            </div>
        );
    }

    return null;
}
