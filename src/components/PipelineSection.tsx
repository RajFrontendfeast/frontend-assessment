import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Search, Activity, ChevronRight, Dna, ShieldCheck, Sparkles, Filter, ArrowUpRight, Check, Layers } from 'lucide-react';
import { PIPELINE_ASSETS } from '../data/biotechData';
import { TherapeuticArea, PipelineAsset, ClinicalPhase } from '../types';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';

interface PipelineSectionProps {
  onSelectAsset: (asset: PipelineAsset) => void;
}

const PHASES: ClinicalPhase[] = ['Discovery', 'Preclinical', 'Phase I', 'Phase II', 'Phase III'];

export const PipelineSection: React.FC<PipelineSectionProps> = ({ onSelectAsset }) => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);

  const [selectedArea, setSelectedArea] = useState<TherapeuticArea>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const waterMarkX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const therapeuticAreas: TherapeuticArea[] = [
    'All',
    'Oncology',
    'Neurodegeneration',
    'Rare Genetic',
    'Autoimmune',
    'Cardiometabolic',
  ];

  const filteredAssets = useMemo(() => {
    return PIPELINE_ASSETS.filter((asset) => {
      const matchesArea = selectedArea === 'All' || asset.therapeuticArea === selectedArea;
      const matchesQuery =
        searchQuery.trim() === '' ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.indication.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesArea && matchesQuery;
    });
  }, [selectedArea, searchQuery]);

  const getPhaseIndex = (phase: ClinicalPhase) => {
    switch (phase) {
      case 'Discovery':
        return 0;
      case 'Preclinical':
        return 1;
      case 'Phase I':
        return 2;
      case 'Phase II':
        return 3;
      case 'Phase III':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="relative py-12 sm:py-24 lg:py-32 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#080C16' : '#F7F8F4',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Subtle Parallax Background Watermark */}
      <div className="absolute top-10 inset-x-0 overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <motion.div style={{ x: waterMarkX }} className="whitespace-nowrap text-[14vw] font-display font-black">
          TRANSLATIONAL DEVELOPMENT LEDGER • SUB-NANOMOLAR PHARMACOKINETICS
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header: Slides from TOP & Search from RIGHT */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider mb-3 shadow-sm"
              style={{
                backgroundColor: `${currentTemplate.palette.primary}12`,
                borderColor: `${currentTemplate.palette.primary}30`,
                color: currentTemplate.palette.primary,
              }}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>TRANSLATIONAL RESEARCH & CLINICAL REGISTER</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight"
              style={{ color: currentTemplate.palette.textColor }}
            >
              Therapeutic Clinical Pipeline
            </h2>
            <p className="mt-2 text-sm sm:text-base opacity-75 max-w-2xl font-sans" style={{ color: currentTemplate.palette.mutedText }}>
              Zero-cleavage epigenetic switches and de novo macrocycles engineered for high target occupancy and superior human safety indices.
            </p>
          </motion.div>

          {/* Search Input: Slides from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative min-w-[260px] sm:w-80"
          >
            <Search className="w-4 h-4 opacity-40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search target, drug code, indication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border text-xs font-sans focus:outline-none transition-all shadow-sm"
              style={{
                backgroundColor: isDark ? 'rgba(13, 20, 36, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                color: currentTemplate.palette.textColor,
              }}
            />
          </motion.div>
        </div>

        {/* Therapeutic Area Filter Tabs: Slide from LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"
        >
          {therapeuticAreas.map((area) => (
            <button
              key={area}
              id={`filter-pipeline-${area.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                bioSound.playClick(600);
                setSelectedArea(area);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedArea === area
                  ? 'shadow-sm font-bold scale-105'
                  : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              style={{
                backgroundColor: selectedArea === area ? currentTemplate.palette.primary : 'transparent',
                color: selectedArea === area
                  ? isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF'
                  : currentTemplate.palette.textColor,
                border: selectedArea === area
                  ? `1px solid ${currentTemplate.palette.primary}`
                  : `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              {area}
            </button>
          ))}
        </motion.div>

        {/* Column Stage Header */}
        <div
          className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 rounded-2xl border text-xs font-mono opacity-60 mb-4"
          style={{
            backgroundColor: isDark ? 'rgba(13, 20, 36, 0.4)' : 'rgba(255, 255, 255, 0.6)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
            color: currentTemplate.palette.textColor,
          }}
        >
          <div className="col-span-4">ASSET / TARGET / INDICATION</div>
          <div className="col-span-2">MODALITY</div>
          <div className="col-span-5 grid grid-cols-5 text-center font-semibold">
            {PHASES.map((ph) => (
              <span key={ph} className="text-[11px]">{ph}</span>
            ))}
          </div>
          <div className="col-span-1 text-right">DOSSIER</div>
        </div>

        {/* High-Density Pipeline Rows (Multi-directional slide-ins, No card boxing) */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, idx) => {
                const currentPhaseIdx = getPhaseIndex(asset.phase);
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={asset.id}
                    layout
                    initial={{ opacity: 0, x: isEven ? -70 : 70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: idx * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      bioSound.playClick(600);
                      onSelectAsset(asset);
                    }}
                    className="p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer group hover:translate-x-1 shadow-sm hover:shadow-xl"
                    style={{
                      backgroundColor: isDark ? 'rgba(13, 20, 36, 0.75)' : 'rgba(255, 255, 255, 0.95)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                      
                      {/* Asset Identity */}
                      <div className="lg:col-span-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border"
                            style={{
                              backgroundColor: `${currentTemplate.palette.primary}15`,
                              borderColor: `${currentTemplate.palette.primary}30`,
                              color: currentTemplate.palette.primary,
                            }}
                          >
                            {asset.code}
                          </span>
                          <span className="text-xs font-mono opacity-60">PDB: {asset.pdbId}</span>
                        </div>
                        
                        <h3
                          className="text-base sm:text-lg font-heading font-bold group-hover:text-emerald-500 transition-colors"
                          style={{ color: currentTemplate.palette.textColor }}
                        >
                          {asset.name}
                        </h3>
                        
                        <p className="text-xs opacity-75 font-sans mt-0.5" style={{ color: currentTemplate.palette.mutedText }}>
                          {asset.target} • <span className="font-semibold">{asset.indication}</span>
                        </p>
                      </div>

                      {/* Modality Tag */}
                      <div className="lg:col-span-2">
                        <span
                          className="inline-block px-3 py-1 rounded text-xs font-mono border"
                          style={{
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                            color: currentTemplate.palette.textColor,
                          }}
                        >
                          {asset.modality}
                        </span>
                      </div>

                      {/* Phase Progression Spectrum Track */}
                      <div className="lg:col-span-5">
                        <div className="relative pt-2 pb-1">
                          {/* Background Track Bar */}
                          <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 relative overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${((currentPhaseIdx + 1) / PHASES.length) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{
                                backgroundImage: `linear-gradient(90deg, ${currentTemplate.palette.primary}, ${currentTemplate.palette.accent})`,
                              }}
                            />
                          </div>

                          {/* 5 Phase Milestones */}
                          <div className="grid grid-cols-5 text-center mt-2 text-[10px] font-mono">
                            {PHASES.map((ph, pIdx) => {
                              const isReached = pIdx <= currentPhaseIdx;
                              const isCurrent = pIdx === currentPhaseIdx;
                              return (
                                <span
                                  key={ph}
                                  className={`transition-colors font-semibold ${
                                    isCurrent
                                      ? 'font-bold'
                                      : isReached
                                      ? 'opacity-80'
                                      : 'opacity-30'
                                  }`}
                                  style={{
                                    color: isCurrent ? currentTemplate.palette.primary : currentTemplate.palette.textColor,
                                  }}
                                >
                                  {ph}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Dossier Arrow Trigger */}
                      <div className="lg:col-span-1 flex items-center justify-end">
                        <div
                          className="p-2 rounded-xl border group-hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: `${currentTemplate.palette.primary}15`,
                            borderColor: `${currentTemplate.palette.primary}30`,
                            color: currentTemplate.palette.primary,
                          }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-16 text-xs font-mono opacity-60">
                No matching pipeline assets found.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
