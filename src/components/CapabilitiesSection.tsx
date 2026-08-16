import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Dna, Sparkles, Activity, Layers, Play, Check, Sliders, RefreshCw, Zap, ShieldCheck, Cpu, Terminal } from 'lucide-react';
import { PLATFORM_CAPABILITIES } from '../data/biotechData';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';

export const CapabilitiesSection: React.FC = () => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);

  const [activeCapId, setActiveCapId] = useState<string>('protein-design');
  const [foldIter, setFoldIter] = useState<number>(4);
  const [isFolding, setIsFolding] = useState<boolean>(false);
  const [methylationLevel, setMethylationLevel] = useState<number>(98);
  const [dosageMg, setDosageMg] = useState<number>(15);
  const [selectedCellType, setSelectedCellType] = useState<string>('Macrophage M2');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgFloatX = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const handleSimulateFold = () => {
    setIsFolding(true);
    bioSound.playClick(600);
    setTimeout(() => {
      setFoldIter((prev) => (prev >= 8 ? 1 : prev + 1));
      setIsFolding(false);
      bioSound.playChime(880, 0.2);
    }, 600);
  };

  const activeCapability = PLATFORM_CAPABILITIES.find((c) => c.id === activeCapId) || PLATFORM_CAPABILITIES[0];

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#0A0E18' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Kinetic Line */}
      <motion.div
        style={{ x: bgFloatX }}
        className="absolute top-10 inset-x-0 overflow-hidden pointer-events-none opacity-[0.03] select-none"
      >
        <div className="whitespace-nowrap text-[12vw] font-display font-black">
          ALL-ATOM MOLECULAR DYNAMICS • 840 PFLOPS SIMULATION
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Slides from TOP */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider mb-3 shadow-sm"
            style={{
              backgroundColor: `${currentTemplate.palette.primary}12`,
              borderColor: `${currentTemplate.palette.primary}30`,
              color: currentTemplate.palette.primary,
            }}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>COMPUTATIONAL SUITE & PLATFORMS</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight"
            style={{ color: currentTemplate.palette.textColor }}
          >
            Integrated Biophysical Technologies
          </h2>
          <p className="mt-3 text-base sm:text-lg opacity-75 font-sans" style={{ color: currentTemplate.palette.mutedText }}>
            Our four-tier in silico platform resolves high-dimensional molecular folding, epigenetic promoter silencing, and spatial transcriptomics in real time.
          </p>
        </motion.div>

        {/* Tactical Dial Selector Strip: Slides from LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {PLATFORM_CAPABILITIES.map((cap) => {
            const isSelected = activeCapId === cap.id;
            return (
              <button
                key={cap.id}
                id={`btn-cap-${cap.id}`}
                onClick={() => {
                  bioSound.playClick(550);
                  setActiveCapId(cap.id);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                  isSelected ? 'shadow-lg scale-[1.02]' : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: isSelected
                    ? isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF'
                    : isDark ? 'rgba(13, 20, 36, 0.5)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isSelected
                    ? currentTemplate.palette.primary
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: currentTemplate.palette.primary }}
                >
                  {cap.badge}
                </span>
                <h3 className="text-sm sm:text-base font-heading font-bold mt-2 leading-tight" style={{ color: currentTemplate.palette.textColor }}>
                  {cap.title}
                </h3>
              </button>
            );
          })}
        </motion.div>

        {/* Integrated Console Workstation (Left & Right Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Scientific Specifications: Slides from LEFT */}
          <motion.div
            key={`specs-${activeCapability.id}`}
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border backdrop-blur-md space-y-6 flex flex-col justify-between shadow-sm"
            style={{
              backgroundColor: isDark ? 'rgba(13, 20, 36, 0.7)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                  style={{
                    backgroundColor: `${currentTemplate.palette.primary}15`,
                    borderColor: `${currentTemplate.palette.primary}30`,
                    color: currentTemplate.palette.primary,
                  }}
                >
                  {activeCapability.badge}
                </span>
                <span className="text-xs font-mono opacity-60">• {activeCapability.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold" style={{ color: currentTemplate.palette.textColor }}>
                {activeCapability.title}
              </h3>

              <p className="text-sm leading-relaxed font-sans opacity-80" style={{ color: currentTemplate.palette.mutedText }}>
                {activeCapability.longDescription}
              </p>

              <div className="pt-2 space-y-2.5">
                {activeCapability.capabilities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div
                      className="p-1 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: `${currentTemplate.palette.primary}20`, color: currentTemplate.palette.primary }}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans" style={{ color: currentTemplate.palette.textColor }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Metrics Matrix: Slides up from BOTTOM */}
            <div
              className="pt-4 border-t grid grid-cols-3 gap-3"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
            >
              {activeCapability.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl border" style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                }}>
                  <div className="text-[10px] opacity-60 font-mono truncate">{m.label}</div>
                  <div className="text-lg font-mono font-bold mt-1" style={{ color: currentTemplate.palette.primary }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Live Interactive Mini-Sandbox: Slides from RIGHT */}
          <motion.div
            key={`sandbox-${activeCapability.id}`}
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border space-y-6 flex flex-col justify-between shadow-2xl"
            style={{
              backgroundColor: isDark ? '#060911' : '#0F172A',
              borderColor: isDark ? '#1E293B' : '#334155',
              color: '#FFFFFF',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <Zap className="w-4 h-4" />
                <span>INTERACTIVE LAB WORKBENCH</span>
              </span>
              <span className="text-[10px] text-slate-500">HPC SIMULATOR // ONLINE</span>
            </div>

            {/* DEMO 1: Protein Fold */}
            {activeCapId === 'protein-design' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Conformation Iteration: #{foldIter}</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    ΔG = -{(12.4 + foldIter * 0.8).toFixed(1)} kcal/mol
                  </span>
                </div>

                <div className="h-32 rounded-2xl bg-slate-950 border border-slate-800 p-4 relative flex items-center justify-center overflow-hidden">
                  <div className="text-center font-mono text-xs">
                    <div className="text-emerald-400 font-bold mb-1">
                      {isFolding ? 'Computing All-Atom Gradient Descent...' : `Backbone Scaffold_${foldIter}.pdb [ACTIVE]`}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Pocket Volume: {400 + foldIter * 12} Å³ • RMSD: {(0.8 - foldIter * 0.04).toFixed(2)} Å
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSimulateFold}
                  disabled={isFolding}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFolding ? 'animate-spin' : ''}`} />
                  <span>{isFolding ? 'SOLVING FREE ENERGY...' : 'MUTATE & OPTIMIZE CONFORMATION'}</span>
                </button>
              </div>
            )}

            {/* DEMO 2: Epigenetic Switch */}
            {activeCapId === 'epigenetic-editing' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">H3K9me3 Methylation Density</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{methylationLevel}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={methylationLevel}
                  onChange={(e) => setMethylationLevel(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Oncogene Transcription:</span>
                    <span className="text-emerald-400 font-bold">{100 - methylationLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Genomic DSB Cuts:</span>
                    <span className="text-slate-300 font-bold">0 Base Pairs (Zero-Break)</span>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 3: PK/PD Simulation */}
            {activeCapId === 'precision-pkpd' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Administered Dose (mg/kg)</span>
                  <span className="text-xs font-mono text-violet-400 font-bold">{dosageMg} mg/kg</span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="50"
                  value={dosageMg}
                  onChange={(e) => setDosageMg(Number(e.target.value))}
                  className="w-full accent-violet-500"
                />

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Predicted Cmax:</span>
                    <span className="text-emerald-400 font-bold">{(dosageMg * 4.2).toFixed(1)} ug/mL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tumor Tissue AUC:</span>
                    <span className="text-cyan-400 font-bold">{(dosageMg * 88).toFixed(0)} hr*ug/mL</span>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 4: Spatial Multiomics */}
            {activeCapId === 'spatial-cell-cartography' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Target Microenvironment Subpopulation</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {['Macrophage M2', 'Exhausted CD8+ T-Cell', 'Cancer-Stroma Fibroblast', 'Dendritic DC1'].map((cell) => (
                    <button
                      key={cell}
                      onClick={() => setSelectedCellType(cell)}
                      className={`p-2.5 rounded-xl border text-left transition-colors ${
                        selectedCellType === cell
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {cell}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                  <div className="text-emerald-400 font-bold">Single-Cell Profile: {selectedCellType}</div>
                  <div className="text-slate-400 text-[11px]">Optical Resolution: 180 nm Multiplexed (10,000 genes)</div>
                </div>
              </div>
            )}

            {/* Terminal status line */}
            <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-2 border-t border-slate-800">
              <span>HPC CLUSTER // ONLINE</span>
              <span>SYNTHETIX BIO-ENGINE v4.9</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
