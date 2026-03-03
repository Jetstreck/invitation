const fs = require('fs');
const file = 'src/components/SectionBackground.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Gunungan Svg
const gununganSvgCode = `
/**
 * Gunungan (Wayang) — The tree of life, representing the universe.
 * Extremely exclusive Keraton aesthetic.
 */
function GununganSvg({ size = 300 }: { size?: number }) {
    return (
        <svg width={size} height={size * 1.5} viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 10 L190 290 L10 290 Z" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
            <path d="M100 20 L180 280 L20 280 Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <path d="M100 280 L100 120" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
            <path d="M100 240 Q130 200 160 230" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M100 240 Q70 200 40 230" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M100 190 Q140 150 150 170" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M100 190 Q60 150 50 170" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M100 140 Q120 110 130 130" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M100 140 Q80 110 70 130" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="15" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M100 85 L100 50" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M85 100 L60 100" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <path d="M115 100 L140 100" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <circle cx="100" cy="25" r="5" stroke="#D4AF37" strokeWidth="1" fill="none" />
        </svg>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────`;

// Ensure we replace correctly regardless of line endings
content = content.replace(/\/\* ─────────────────────────────────────────────────────────────────────────────\r?\n   KAWUNG TILED PATTERN/, gununganSvgCode + '\n   KAWUNG TILED PATTERN');

// 2. Adjust Opacities
content = content.replace(/opacity-\[0\.035\]/g, 'opacity-[0.08]');
content = content.replace(/opacity-\[0\.04\]/g, 'opacity-[0.09]');
content = content.replace(/opacity-\[0\.025\]/g, 'opacity-[0.06]');
content = content.replace(/opacity-\[0\.045\]/g, 'opacity-[0.09]');
content = content.replace(/opacity-\[0\.03\]/g, 'opacity-[0.07]');

content = content.replace(/opacity-60/g, 'opacity-80');
content = content.replace(/opacity-50/g, 'opacity-70');
content = content.replace(/opacity-40/g, 'opacity-55');

content = content.replace(/rgba\(212,175,55,0\.06\)/g, 'rgba(212,175,55,0.12)');
content = content.replace(/rgba\(212,175,55,0\.03\)/g, 'rgba(212,175,55,0.08)');
content = content.replace(/rgba\(212,175,55,0\.055\)/g, 'rgba(212,175,55,0.12)');
content = content.replace(/rgba\(212,175,55,0\.02\)/g, 'rgba(212,175,55,0.06)');
content = content.replace(/rgba\(212,175,55,0\.04\)/g, 'rgba(212,175,55,0.1)');
content = content.replace(/rgba\(212,175,55,0\.015\)/g, 'rgba(212,175,55,0.05)');

// 3. Add Gunungan to 'event' section
const eventHeader = `    /* ── EVENT DETAIL ─────────────────────────────────────────────────────── */
    if (variant === 'event') {
        return (
            <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

                {/* Gunungan motif — centre background */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] md:opacity-[0.08]"
                    {...slowFloat}
                >
                    <GununganSvg size={500} />
                </motion.div>`;

content = content.replace(/\/\* ── EVENT DETAIL ─────────────────────────────────────────────────────── \*\/\r?\n    if \(variant === 'event'\) \{\r?\n        return \(\r?\n            <div ref=\{ref\} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>/, eventHeader);

// Add Gunungan to 'closing' section
const closingHeader = `    /* ── CLOSING BLESSING ───────────────────────────────────────────────── */
    if (variant === 'closing') {
        return (
            <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

                {/* Gunungan motif — centre background */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] md:opacity-[0.1]"
                    {...floatAnim}
                >
                    <GununganSvg size={600} />
                </motion.div>`;

content = content.replace(/\/\* ── CLOSING BLESSING ───────────────────────────────────────────────── \*\/\r?\n    if \(variant === 'closing'\) \{\r?\n        return \(\r?\n            <div ref=\{ref\} className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>/, closingHeader);

// 4. Remove hidden classes so patterns show up on mobile
content = content.replace(/ hidden md:block/g, '');
content = content.replace(/ hidden lg:block/g, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully patched SectionBackground.tsx');
