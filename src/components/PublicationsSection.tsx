import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BookOpen, ExternalLink, Award, FileText, ChevronDown, ChevronUp, Quote, Activity } from 'lucide-react';
import { SCIENTIFIC_PUBLICATIONS } from '../data/biotechData';
import { useDesignTemplate } from '../context/TemplateContext';
import { centerTabInContainer } from '../utils/tabScroll';

export const PublicationsSection: React.FC = () => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedPubId, setExpandedPubId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const categories = ['All', 'Structure', 'Epigenetics', 'AI Models', 'Clinical'];

  // Center active category tab on selection / mobile scroll without page shift
  useEffect(() => {
    const container = tabContainerRef.current;
    const target = tabRefs.current[selectedCategory];
    if (container && target) {
      centerTabInContainer(container, target);
    }
  }, [selectedCategory]);

  const filteredPubs = SCIENTIFIC_PUBLICATIONS.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedPubId(expandedPubId === id ? null : id);
  };

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="relative py-12 sm:py-24 lg:py-32 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#080C16' : '#F7F8F4',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Kinetic Watermark */}
      <div className="absolute top-1/4 inset-x-0 overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <motion.div style={{ x: watermarkX }} className="whitespace-nowrap text-[14vw] font-display font-black">
          PEER-REVIEWED SCIENTIFIC RIGOR • NATURE • SCIENCE • CELL
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Slides from TOP & Category Filters: Slide from RIGHT */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider mb-3 shadow-sm"
              style={{
                backgroundColor: `${currentTemplate.palette.primary}12`,
                borderColor: `${currentTemplate.palette.primary}30`,
                color: currentTemplate.palette.primary,
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>PEER-REVIEWED SCIENTIFIC RIGOR</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight"
              style={{ color: currentTemplate.palette.textColor }}
            >
              Published Research & Validation
            </h2>
            <p className="mt-2 text-sm sm:text-base opacity-75 max-w-2xl font-sans" style={{ color: currentTemplate.palette.mutedText }}>
              Our underlying generative diffusion physics, zero-break chromatin writers, and clinical trial results are documented in leading high-impact peer-reviewed journals.
            </p>
          </motion.div>

          {/* Category Filter Pills: Slide from RIGHT */}
          <motion.div
            ref={tabContainerRef}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                ref={(el) => (tabRefs.current[cat] = el)}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (tabContainerRef.current && tabRefs.current[cat]) {
                    centerTabInContainer(tabContainerRef.current, tabRefs.current[cat]);
                  }
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'shadow-sm font-bold scale-105'
                    : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? currentTemplate.palette.primary : 'transparent',
                  color: selectedCategory === cat
                    ? isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF'
                    : currentTemplate.palette.textColor,
                  border: selectedCategory === cat
                    ? `1px solid ${currentTemplate.palette.primary}`
                    : `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Editorial Dossier Stream (Alternating Left & Right Slide-ins, connected by vertical axis) */}
        <div className="relative space-y-6">
          
          {/* Vertical Architectural Axis Line */}
          <div
            className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 hidden sm:block opacity-20"
            style={{ backgroundColor: currentTemplate.palette.primary }}
          />

          {filteredPubs.map((pub, idx) => {
            const isEven = idx % 2 === 0;
            const isExpanded = expandedPubId === pub.id;

            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 lg:gap-12 relative z-10`}
              >
                {/* Center Node Indicator */}
                <div
                  className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-8 h-8 rounded-full border-2 items-center justify-center font-mono text-[10px] font-bold z-20"
                  style={{
                    backgroundColor: isDark ? '#080C16' : '#FFFFFF',
                    borderColor: currentTemplate.palette.primary,
                    color: currentTemplate.palette.primary,
                  }}
                >
                  0{idx + 1}
                </div>

                {/* Dossier Body */}
                <div
                  className={`w-full max-w-xl lg:max-w-none mx-auto lg:mx-0 lg:w-[calc(50%-2rem)] p-6 sm:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 hover:shadow-xl ${
                    isEven ? 'lg:mr-auto' : 'lg:ml-auto'
                  }`}
                  style={{
                    backgroundColor: isDark ? 'rgba(13, 20, 36, 0.75)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded text-xs font-mono font-bold border"
                        style={{
                          backgroundColor: `${currentTemplate.palette.primary}15`,
                          borderColor: `${currentTemplate.palette.primary}30`,
                          color: currentTemplate.palette.primary,
                        }}
                      >
                        {pub.journal}
                      </span>
                      <span className="text-xs font-mono opacity-60">{pub.year}</span>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xl border"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                        color: currentTemplate.palette.textColor,
                      }}
                    >
                      {pub.badge}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-heading font-bold leading-snug"
                    style={{ color: currentTemplate.palette.textColor }}
                  >
                    {pub.title}
                  </h3>

                  <p className="text-xs font-mono opacity-60 mt-1">{pub.authors}</p>

                  {/* Key Finding Pull Quote */}
                  <div
                    className="mt-4 p-4 rounded-2xl border text-xs"
                    style={{
                      backgroundColor: `${currentTemplate.palette.primary}08`,
                      borderColor: `${currentTemplate.palette.primary}20`,
                    }}
                  >
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider font-bold block mb-1"
                      style={{ color: currentTemplate.palette.primary }}
                    >
                      Key Scientific Finding:
                    </span>
                    <p className="font-sans leading-relaxed" style={{ color: currentTemplate.palette.textColor }}>
                      {pub.keyFinding}
                    </p>
                  </div>

                  {/* Expandable Abstract Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 rounded-2xl border text-xs font-sans leading-relaxed overflow-hidden"
                        style={{
                          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.03)',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                          color: currentTemplate.palette.textColor,
                        }}
                      >
                        <p className="font-mono text-[10px] uppercase font-bold opacity-60 mb-1">Peer-Reviewed Abstract:</p>
                        {pub.abstract}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer Stats & Actions */}
                  <div
                    className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono"
                    style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
                  >
                    <div className="flex items-center gap-4 opacity-70">
                      <span>
                        IF: <strong style={{ color: currentTemplate.palette.textColor }}>{pub.impactFactor}</strong>
                      </span>
                      <span>
                        Citations: <strong style={{ color: currentTemplate.palette.primary }}>{pub.citations}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpand(pub.id)}
                        className="px-3 py-1.5 rounded-full border flex items-center gap-1 text-[11px] font-semibold transition-all hover:scale-105"
                        style={{
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                          color: currentTemplate.palette.textColor,
                        }}
                      >
                        <span>{isExpanded ? 'Less' : 'Abstract'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border transition-all hover:scale-110"
                        style={{
                          backgroundColor: `${currentTemplate.palette.primary}15`,
                          borderColor: `${currentTemplate.palette.primary}30`,
                          color: currentTemplate.palette.primary,
                        }}
                        title="Open DOI Reference"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
