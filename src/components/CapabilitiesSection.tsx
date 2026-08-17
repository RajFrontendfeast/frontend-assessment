import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Dna, Sparkles, Activity, Layers, Play, Check, Sliders, RefreshCw, Zap, ShieldCheck, Cpu, Terminal, CheckCircle2 } from 'lucide-react';
import { PLATFORM_CAPABILITIES } from '../data/biotechData';
import { useDesignTemplate } from '../context/TemplateContext';
import { centerTabInContainer } from '../utils/tabScroll';

export const CapabilitiesSection: React.FC = () => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [activeCapId, setActiveCapId] = useState<string>('protein-design');
  const [foldIter, setFoldIter] = useState<number>(4);
  const [isFolding, setIsFolding] = useState<boolean>(false);
  const [methylationLevel, setMethylationLevel] = useState<number>(98);
  const [selectedPromoter, setSelectedPromoter] = useState<string>('KRAS-G12D');
  const [dosageMg, setDosageMg] = useState<number>(15);
  const [deliveryRoute, setDeliveryRoute] = useState<string>('Systemic IV');
  const [selectedCellType, setSelectedCellType] = useState<string>('Macrophage M2');
  const [isScanningTME, setIsScanningTME] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgFloatX = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // Auto-center active tab in horizontal scrolling ribbon on mobile without page shift
  useEffect(() => {
    const container = tabContainerRef.current;
    const target = tabRefs.current[activeCapId];
    if (container && target) {
      centerTabInContainer(container, target);
    }
  }, [activeCapId]);

  const handleSimulateFold = () => {
    setIsFolding(true);
    setTimeout(() => {
      setFoldIter((prev) => (prev >= 8 ? 1 : prev + 1));
      setIsFolding(false);
    }, 600);
  };

  const handleScanMicroenvironment = () => {
    setIsScanningTME(true);
    setTimeout(() => {
      setIsScanningTME(false);
    }, 700);
  };

  const activeCapability = PLATFORM_CAPABILITIES.find((c) => c.id === activeCapId) || PLATFORM_CAPABILITIES[0];

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-12 sm:py-24 lg:py-32 overflow-hidden border-t transition-colors duration-500"
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

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Slides from TOP */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl mb-8 sm:mb-14"
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
          <p className="mt-3 text-sm sm:text-base lg:text-lg opacity-75 font-sans" style={{ color: currentTemplate.palette.mutedText }}>
            Our four-tier in silico platform resolves high-dimensional molecular folding, epigenetic promoter silencing, and spatial transcriptomics in real time.
          </p>
        </motion.div>

        {/* Tactical Dial Selector Strip: Scrollable on mobile with smooth auto-centering */}
        <motion.div
          ref={tabContainerRef}
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 sm:pb-0 no-scrollbar max-w-full"
        >
          {PLATFORM_CAPABILITIES.map((cap) => {
            const isSelected = activeCapId === cap.id;
            return (
              <button
                key={cap.id}
                ref={(el) => (tabRefs.current[cap.id] = el)}
                id={`btn-cap-${cap.id}`}
                onClick={() => {
                  setActiveCapId(cap.id);
                  if (tabContainerRef.current && tabRefs.current[cap.id]) {
                    centerTabInContainer(tabContainerRef.current, tabRefs.current[cap.id]);
                  }
                }}
                className={`p-3.5 sm:p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between min-w-[210px] sm:min-w-0 shrink-0 ${
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
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: currentTemplate.palette.primary }}
                  >
                    {cap.badge}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTemplate.palette.primary }} />
                  )}
                </div>
                <h3 className="text-xs sm:text-base font-heading font-bold mt-2 leading-tight" style={{ color: currentTemplate.palette.textColor }}>
                  {cap.title}
                </h3>
              </button>
            );
          })}
        </motion.div>

        {/* Integrated Console Workstation (Left & Right Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Scientific Specifications: Slides from LEFT */}
          <motion.div
            key={`specs-${activeCapability.id}`}
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 p-5 sm:p-8 rounded-3xl border backdrop-blur-md space-y-6 flex flex-col justify-between shadow-sm"
            style={{
              backgroundColor: isDark ? 'rgba(13, 20, 36, 0.7)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
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

            {/* Bottom Metrics Matrix: 1 col on mobile, 3 cols on sm+ */}
            <div
              className="pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
            >
              {activeCapability.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl border" style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                }}>
                  <div className="text-[10px] opacity-60 font-mono truncate">{m.label}</div>
                  <div className="text-base sm:text-lg font-mono font-bold mt-1" style={{ color: currentTemplate.palette.primary }}>
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
            className="lg:col-span-6 p-5 sm:p-8 rounded-3xl border space-y-6 flex flex-col justify-between shadow-2xl"
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

            {/* TAB 1: De Novo Protein Diffusion Fold */}
            {(activeCapId === 'protein-design' || activeCapId === 'protein-folding') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Conformation Iteration: #{foldIter}</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    ΔG = -{(12.4 + foldIter * 0.8).toFixed(1)} kcal/mol
                  </span>
                </div>

                <div className="h-32 rounded-2xl bg-slate-950 border border-slate-800 p-4 relative flex items-center justify-center overflow-hidden">
                  <div className="text-center font-mono text-xs z-10">
                    <div className="text-emerald-400 font-bold mb-1">
                      {isFolding ? 'Computing All-Atom Gradient Descent...' : `Backbone Scaffold_${foldIter}.pdb [ACTIVE]`}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Pocket Volume: {400 + foldIter * 12} Å³ • RMSD: {(0.8 - foldIter * 0.04).toFixed(2)} Å
                    </div>
                  </div>
                  {/* Subtle animated background grid */}
                  <div className="absolute inset-0 bio-grid-bg opacity-15 pointer-events-none" />
                </div>

                <button
                  onClick={handleSimulateFold}
                  disabled={isFolding}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-[0.98]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFolding ? 'animate-spin' : ''}`} />
                  <span>{isFolding ? 'SOLVING FREE ENERGY...' : 'MUTATE & OPTIMIZE CONFORMATION'}</span>
                </button>
              </div>
            )}

            {/* TAB 2: Epigenetic Switch Locus Control */}
            {(activeCapId === 'epigenetic-switch' || activeCapId === 'epigenetic-editing') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Target Oncogene Promoter</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">dCas9-KRAB-MeCP2</span>
                </div>

                {/* Target Promoter Selectors */}
                <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
                  {['KRAS-G12D', 'MYC-P1', 'BCL2-Prom', 'HER2-Exon'].map((target) => (
                    <button
                      key={target}
                      onClick={() => {
                        setSelectedPromoter(target);
                      }}
                      className={`py-2 px-1 rounded-xl border text-center transition-all ${
                        selectedPromoter === target
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {target}
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">H3K9me3 & CpG Methylation Density</span>
                    <span className="text-cyan-400 font-bold">{methylationLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={methylationLevel}
                    onChange={(e) => setMethylationLevel(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Locus:</span>
                    <span className="text-cyan-300 font-bold">{selectedPromoter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transcriptional Silencing:</span>
                    <span className="text-emerald-400 font-bold">{methylationLevel}% Repression</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Genomic DSB Cuts:</span>
                    <span className="text-slate-300 font-bold">0 Base Pairs (Zero-Break)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Quantum Biophysical PK/PD Modeling */}
            {(activeCapId === 'pk-pd-simulator' || activeCapId === 'precision-pkpd') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Delivery Route & Route Modeling</span>
                  <span className="text-xs font-mono text-violet-400 font-bold">PBPK Core v3.2</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                  {['Systemic IV', 'Subcutaneous', 'BBB Transcytosis'].map((route) => (
                    <button
                      key={route}
                      onClick={() => {
                        setDeliveryRoute(route);
                      }}
                      className={`py-2 px-1 rounded-xl border text-center transition-all ${
                        deliveryRoute === route
                          ? 'bg-violet-950 border-violet-400 text-violet-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {route}
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Administered Dosage</span>
                    <span className="text-violet-400 font-bold">{dosageMg} mg/kg</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={dosageMg}
                    onChange={(e) => setDosageMg(Number(e.target.value))}
                    className="w-full accent-violet-400 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Predicted Cmax:</span>
                    <span className="text-emerald-400 font-bold">{(dosageMg * 4.2).toFixed(1)} ug/mL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Tissue AUC:</span>
                    <span className="text-cyan-400 font-bold">{(dosageMg * 88).toFixed(0)} hr*ug/mL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Projected Half-Life:</span>
                    <span className="text-violet-300 font-bold">{Math.round(24 + dosageMg * 0.4)} Days (FcRn recycling)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Multi-Omic Spatial Cartography */}
            {(activeCapId === 'spatial-cartography' || activeCapId === 'spatial-cell-cartography') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Tissue Microenvironment Subpopulation</span>
                  <span className="text-xs font-mono text-amber-400 font-bold">180 nm Resolution</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {['Macrophage M2', 'Exhausted CD8+ T-Cell', 'Cancer-Stroma Fibroblast', 'Tertiary Lymphoid'].map((cell) => (
                    <button
                      key={cell}
                      onClick={() => {
                        setSelectedCellType(cell);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-colors truncate ${
                        selectedCellType === cell
                          ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cell}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Selected Population:</span>
                    <span className="text-amber-300 font-bold">{selectedCellType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Gene Multiplexing:</span>
                    <span className="text-emerald-400 font-bold">10,000 Transcripts / Slice</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Stromal Infiltration:</span>
                    <span className="text-cyan-400 font-bold">High Density (Score 9.4/10)</span>
                  </div>
                </div>

                <button
                  onClick={handleScanMicroenvironment}
                  disabled={isScanningTME}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isScanningTME ? 'animate-spin' : ''}`} />
                  <span>{isScanningTME ? 'RE-CONSTRUCTING 3D ATLAS...' : 'EXECUTE SINGLE-CELL SPATIAL SCAN'}</span>
                </button>
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
