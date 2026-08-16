import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Dna, Sparkles, Activity, ShieldCheck, Database, FlaskConical, ChevronDown, Binary, Atom } from 'lucide-react';
import { BioCanvas } from './BioCanvas';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';

interface HeroProps {
  onOpenPartner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPartner }) => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax multi-plane offsets
  const textParallaxX1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const textParallaxX2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const leftColY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rightColY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgGlowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[96vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-center transition-colors duration-500"
    >
      {/* Background Kinetic Typographic Parallax Watermarks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.035] dark:opacity-[0.05] flex flex-col justify-around">
        <motion.div
          style={{ x: textParallaxX1 }}
          className="whitespace-nowrap text-[12vw] font-display font-black tracking-tighter will-change-transform"
        >
          QUANTUM DE NOVO PROTEIN DIFFUSION • SUB-ANGSTROM BINDING
        </motion.div>
        <motion.div
          style={{ x: textParallaxX2 }}
          className="whitespace-nowrap text-[12vw] font-display font-black tracking-tighter will-change-transform"
        >
          ZERO-BREAK EPIGENOME ENGINEERING • MULTI-OMIC CELL CARTOGRAPHY
        </motion.div>
      </div>

      {/* Dynamic Ambient Lighting & Glows */}
      <motion.div
        style={{ scale: bgGlowScale }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none opacity-25 will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: currentTemplate.palette.primary }}
        />
      </motion.div>
      <div
        className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{ backgroundColor: currentTemplate.palette.accent }}
      />

      {/* Optical Structural Grid Overlay */}
      <div className="absolute inset-0 bio-grid-bg opacity-30 pointer-events-none" />

      {/* Top Crosshair Corner Accents */}
      <div className="absolute top-24 left-6 hidden lg:flex items-center gap-1 font-mono text-[10px] opacity-40">
        <span>[SYS.LOC // 42.3601° N, 71.0942° W]</span>
      </div>
      <div className="absolute top-24 right-6 hidden lg:flex items-center gap-1 font-mono text-[10px] opacity-40">
        <span>[CRYSTAL_EM_RES // 0.74 Å]</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Architectural Column: Slides in from LEFT */}
          <motion.div
            style={{ y: leftColY }}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Top Eyebrow Tag: Slides down from TOP */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider shadow-sm transition-colors"
              style={{
                backgroundColor: `${currentTemplate.palette.primary}12`,
                borderColor: `${currentTemplate.palette.primary}30`,
                color: currentTemplate.palette.primary,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: currentTemplate.palette.primary }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: currentTemplate.palette.primary }}
                />
              </span>
              <span>ATOMIC-SCALE GENERATIVE BIOLOGY</span>
            </motion.div>

            {/* Main Headline with Editorial Accent */}
            <h1
              className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight leading-[1.1]"
              style={{ color: currentTemplate.palette.textColor }}
            >
              Engineering the{' '}
              <span
                className="font-serif-italic font-normal tracking-normal text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${currentTemplate.palette.primary}, ${currentTemplate.palette.accent})`,
                }}
              >
                molecular code
              </span>{' '}
              of programmable medicine.
            </h1>

            {/* Narrative Subtext */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl font-sans"
              style={{ color: currentTemplate.palette.mutedText }}
            >
              Synthetix Bio unifies quantum generative physics and zero-break epigenetic engineering to transform unpredictable biological discovery into deterministic computation.
            </p>

            {/* Action Buttons: Slide in from BOTTOM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href="#pipeline"
                onClick={() => bioSound.playClick(650)}
                className="px-6 py-3.5 rounded-full font-mono font-bold text-xs tracking-wider flex items-center gap-2.5 shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all"
                style={{
                  backgroundColor: currentTemplate.palette.primary,
                  color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF',
                }}
              >
                <span>EXPLORE CLINICAL PIPELINE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#journey"
                onClick={() => bioSound.playClick(550)}
                className="px-6 py-3.5 rounded-full font-mono font-semibold text-xs tracking-wider flex items-center gap-2 border shadow-sm active:scale-[0.98] transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: isDark ? 'rgba(13, 20, 36, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                  color: currentTemplate.palette.textColor,
                }}
              >
                <FlaskConical className="w-4 h-4" style={{ color: currentTemplate.palette.accent }} />
                <span>TRANSLATIONAL TIMELINE</span>
              </a>
            </motion.div>

            {/* Scientific Credentials Strip: No boxed cards, clean continuous baseline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.75 }}
              className="pt-6 border-t grid grid-cols-3 gap-6"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}
            >
              <div>
                <div
                  className="text-2xl sm:text-3xl font-mono font-bold flex items-center gap-1"
                  style={{ color: currentTemplate.palette.textColor }}
                >
                  <span style={{ color: currentTemplate.palette.primary }}>0.74</span>
                  <span className="text-xs opacity-50 font-sans">Å</span>
                </div>
                <div className="text-xs opacity-70 leading-tight mt-1">Cryo-EM Resolution</div>
              </div>

              <div>
                <div
                  className="text-2xl sm:text-3xl font-mono font-bold flex items-center gap-1"
                  style={{ color: currentTemplate.palette.textColor }}
                >
                  <span style={{ color: currentTemplate.palette.accent }}>99.98</span>
                  <span className="text-xs opacity-50 font-sans">%</span>
                </div>
                <div className="text-xs opacity-70 leading-tight mt-1">On-Target Specificity</div>
              </div>

              <div>
                <div
                  className="text-2xl sm:text-3xl font-mono font-bold flex items-center gap-1"
                  style={{ color: currentTemplate.palette.textColor }}
                >
                  <span style={{ color: currentTemplate.palette.primary }}>6</span>
                  <span className="text-xs opacity-50 font-sans">Assets</span>
                </div>
                <div className="text-xs opacity-70 leading-tight mt-1">In Active Clinical Trials</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Stage: Slides in from RIGHT with Parallax floating overlays */}
          <motion.div
            style={{ y: rightColY }}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            {/* Top Floating Badge: Slides down from TOP */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-3 right-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono shadow-md backdrop-blur-md"
              style={{
                backgroundColor: isDark ? 'rgba(13, 20, 36, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                color: currentTemplate.palette.primary,
              }}
            >
              <Sparkles className="w-3 h-3 animate-spin" style={{ color: currentTemplate.palette.primary }} />
              <span>LIVE 3D MACROMOLECULAR STAGE</span>
            </motion.div>

            {/* Interactive 3D BioCanvas Viewport */}
            <div className="relative">
              {/* Architectural Framing Guides */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 pointer-events-none z-20" style={{ borderColor: currentTemplate.palette.primary }} />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 pointer-events-none z-20" style={{ borderColor: currentTemplate.palette.primary }} />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 pointer-events-none z-20" style={{ borderColor: currentTemplate.palette.primary }} />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 pointer-events-none z-20" style={{ borderColor: currentTemplate.palette.primary }} />

              <BioCanvas initialMode="dna-helix" interactive={true} />
            </div>

            {/* Bottom floating telemetry rail: Slides up from BOTTOM */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-3 p-3.5 rounded-2xl backdrop-blur-md border flex items-center justify-between text-xs font-mono shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(13, 20, 36, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                color: currentTemplate.palette.textColor,
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" style={{ color: currentTemplate.palette.primary }} />
                <span>Zero-Break Epigenetic Architecture</span>
              </div>
              <div className="opacity-70 hidden sm:block">
                Target Ref: <span className="font-semibold" style={{ color: currentTemplate.palette.primary }}>PDB-ID: 8G12</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Floating Bottom Navigator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-12 text-center relative z-10"
      >
        <a
          href="#innovation"
          onClick={() => bioSound.playClick(450)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-mono transition-all shadow-sm hover:scale-105"
          style={{
            backgroundColor: isDark ? 'rgba(13, 20, 36, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            color: currentTemplate.palette.textColor,
          }}
        >
          <span>DISCOVER MULTI-OMIC ENGINE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" style={{ color: currentTemplate.palette.primary }} />
        </a>
      </motion.div>
    </section>
  );
};
