import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, ShieldCheck, Cpu, Building2, CheckCircle2, Globe2, Activity, Zap } from 'lucide-react';
import { LAB_LOCATIONS } from '../data/biotechData';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';
import { centerTabInContainer } from '../utils/tabScroll';

export const BioFoundrySection: React.FC = () => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const [activeLocIdx, setActiveLocIdx] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgFloatY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  // Auto-center active location tab on mobile
  useEffect(() => {
    const container = mobileContainerRef.current;
    const target = mobileTabRefs.current[activeLocIdx];
    if (container && target) {
      centerTabInContainer(container, target);
    }
  }, [activeLocIdx]);

  const activeLocation = LAB_LOCATIONS[activeLocIdx];

  const complianceBadges = [
    { title: 'FDA 21 CFR Part 11', desc: 'Electronic Records & Signatures Compliant' },
    { title: 'GLP / cGMP Certified', desc: 'Clinical Grade Cleanroom Standards' },
    { title: 'ISO 27001 Bio-Data', desc: 'Enterprise Genomic Encryption & Security' },
    { title: 'NIH BSL-2+ Verified', desc: 'Airborne Containment & Biosafety Level 2+' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-24 lg:py-32 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#0A0E18' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Ambient Parallax Backdrop */}
      <motion.div
        style={{ y: bgFloatY }}
        className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none opacity-20"
      >
        <div className="w-full h-full rounded-full" style={{ backgroundColor: currentTemplate.palette.accent }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Slides from TOP */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl mb-8 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider mb-3 shadow-sm"
            style={{
              backgroundColor: `${currentTemplate.palette.primary}12`,
              borderColor: `${currentTemplate.palette.primary}30`,
              color: currentTemplate.palette.primary,
            }}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>GLOBAL LABORATORY & FOUNDRY NETWORK</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight"
            style={{ color: currentTemplate.palette.textColor }}
          >
            Robotic Bio-Foundry Infrastructure
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg opacity-75 font-sans" style={{ color: currentTemplate.palette.mutedText }}>
            Our closed-loop facilities synthesize, test, and sequence thousands of therapeutic candidates 24/7 with sub-nanoliter acoustic dispensing and real-time SPR kinetic feedback.
          </p>
        </motion.div>

        {/* Mobile Horizontal Facility Selector Ribbon (Visible only on mobile/tablet < lg) */}
        <div
          ref={mobileContainerRef}
          className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar max-w-full"
        >
          {LAB_LOCATIONS.map((loc, idx) => {
            const isActive = activeLocIdx === idx;
            return (
              <button
                key={loc.city}
                ref={(el) => (mobileTabRefs.current[idx] = el)}
                onClick={() => {
                  bioSound.playClick(500 + idx * 50);
                  setActiveLocIdx(idx);
                  if (mobileContainerRef.current && mobileTabRefs.current[idx]) {
                    centerTabInContainer(mobileContainerRef.current, mobileTabRefs.current[idx]);
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-mono whitespace-nowrap shrink-0 border transition-all ${
                  isActive
                    ? 'font-bold shadow-md scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive
                    ? `${currentTemplate.palette.primary}20`
                    : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: isActive
                    ? currentTemplate.palette.primary
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  color: isActive ? currentTemplate.palette.primary : currentTemplate.palette.textColor,
                }}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>{loc.city}, {loc.country}</span>
              </button>
            );
          })}
        </div>

        {/* Split Cleanroom Workspace (Left selector, Right Live HUD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left Facility Nodes (Hidden on mobile, visible on lg+) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-6 space-y-3"
          >
            {LAB_LOCATIONS.map((loc, idx) => {
              const isActive = activeLocIdx === idx;
              return (
                <button
                  key={loc.city}
                  onClick={() => {
                    bioSound.playClick(500 + idx * 50);
                    setActiveLocIdx(idx);
                  }}
                  className={`w-full p-5 rounded-2xl text-left border transition-all duration-300 flex items-start gap-4 ${
                    isActive ? 'translate-x-2 shadow-lg' : 'opacity-70 hover:opacity-100 hover:translate-x-1'
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'
                      : 'transparent',
                    borderColor: isActive
                      ? currentTemplate.palette.primary
                      : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div
                    className="p-3 rounded-xl shrink-0"
                    style={{
                      backgroundColor: isActive
                        ? `${currentTemplate.palette.primary}20`
                        : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                      color: isActive ? currentTemplate.palette.primary : currentTemplate.palette.mutedText,
                    }}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-heading font-bold" style={{ color: currentTemplate.palette.textColor }}>
                        {loc.city}, {loc.country}
                      </h3>
                      <span
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold"
                        style={{
                          backgroundColor: `${currentTemplate.palette.primary}15`,
                          borderColor: `${currentTemplate.palette.primary}30`,
                          color: currentTemplate.palette.primary,
                        }}
                      >
                        {loc.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono mt-1 opacity-70 truncate">{loc.facility}</p>
                    <p className="text-[11px] opacity-60 mt-0.5 line-clamp-1">{loc.focus}</p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Cleanroom Node Live HUD: Slides from RIGHT */}
          <motion.div
            key={activeLocation.city}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 p-8 sm:p-10 rounded-3xl border backdrop-blur-md space-y-6 shadow-2xl"
            style={{
              backgroundColor: isDark ? 'rgba(13, 20, 36, 0.85)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <div
              className="flex items-center justify-between pb-4 border-b"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: currentTemplate.palette.primary }} />
                <span className="text-xs font-mono font-bold uppercase" style={{ color: currentTemplate.palette.primary }}>
                  Active Cleanroom Node
                </span>
              </div>
              <span className="text-xs font-mono opacity-50">ISO Class 7 / cGMP</span>
            </div>

            <div>
              <h3 className="text-2xl font-display font-extrabold" style={{ color: currentTemplate.palette.textColor }}>
                {activeLocation.facility}
              </h3>
              <p className="text-sm font-mono mt-1 flex items-center gap-1.5 font-semibold" style={{ color: currentTemplate.palette.accent }}>
                <MapPin className="w-4 h-4" />
                {activeLocation.city}, {activeLocation.country}
              </p>
              <p className="text-sm opacity-80 mt-3 leading-relaxed font-sans" style={{ color: currentTemplate.palette.mutedText }}>
                Equipped with acoustic liquid handlers, ultra-high field 1.2 GHz NMR spectroscopy, cryo-EM electron microscopes, and high-throughput robotic bioreactors connected directly to our quantum cluster.
              </p>
            </div>

            <div
              className="p-4 rounded-2xl border space-y-2 text-xs font-mono"
              style={{
                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <div className="text-[10px] opacity-60 uppercase font-semibold">Facility Core Focus:</div>
              <div className="font-bold" style={{ color: currentTemplate.palette.primary }}>{activeLocation.focus}</div>
              <div className="text-[11px] opacity-60 pt-1 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}>
                Acoustic Droplet Ejection: <span className="font-semibold" style={{ color: currentTemplate.palette.textColor }}>2.5 nL resolution at 500 drops/sec</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Regulatory Governance Matrix: Slides up from BOTTOM */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {complianceBadges.map((badge, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border backdrop-blur-md flex items-start gap-3.5"
              style={{
                backgroundColor: isDark ? 'rgba(13, 20, 36, 0.6)' : 'rgba(255, 255, 255, 0.85)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <div
                className="p-2.5 rounded-xl border shrink-0"
                style={{
                  backgroundColor: `${currentTemplate.palette.primary}15`,
                  borderColor: `${currentTemplate.palette.primary}30`,
                  color: currentTemplate.palette.primary,
                }}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-mono font-bold" style={{ color: currentTemplate.palette.textColor }}>{badge.title}</h4>
                <p className="text-xs opacity-70 mt-1 font-sans" style={{ color: currentTemplate.palette.mutedText }}>{badge.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
