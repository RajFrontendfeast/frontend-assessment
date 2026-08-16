import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Dna, Sparkles, Layers, Cpu, CheckCircle2, Binary, ShieldCheck, ArrowRight, Activity, Terminal, Zap } from 'lucide-react';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';

export const InnovationSection: React.FC = () => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgFloatY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const pillars = [
    {
      id: 'generative-diffusion',
      title: 'Generative Protein Diffusion',
      subtitle: 'Atomic Conformation Synthesis',
      icon: Dna,
      badge: 'Quantum-Accelerated AI',
      description:
        'Instead of screening billions of random chemical libraries over years, our deep diffusion architectures compute de novo macro-protein scaffolds tailored to the sub-angstrom electrostatic pocket of any disease target in 72 hours.',
      points: [
        'Direct 3D backbone generation from cryo-EM electron density maps',
        'Atomic-level Gibbs free energy (ΔG) minimization with sub-0.05 nM target affinity',
        'Automatic computational de-immunization filtering against human HLA-DR alleles',
      ],
      stats: [
        { label: 'Backbones Generated', val: '128,000' },
        { label: 'Binding Kd', val: '0.018 nM' },
        { label: 'Solubility Index', val: '99.4%' },
      ],
      codeSnippet: `SYNTH-DIFFUSION v4.9:
> TARGET_PDB: 8G12 (KRAS-G12D)
> GENERATED_CONFORMATIONS: 128,000
> BINDING_POCKET_VOL: 420 Å³
> COMPUTED_AFFINITY_Kd: 0.018 nM
> SOLUBILITY_INDEX: 99.4% [OPTIMAL]`,
    },
    {
      id: 'zero-break-epigenetics',
      title: 'Zero-Break Epigenetic Editing',
      subtitle: 'Permanent Transcriptional Switches',
      icon: Sparkles,
      badge: 'No Chromosomal Cuts',
      description:
        'Traditional CRISPR causes dangerous double-strand DNA breaks and oncogenic chromosomal translocations. Synthetix uses catalytically dead Cas complexes linked to human chromatin remodelers to write durable methylation marks without cutting a single base pair.',
      points: [
        'Permanent silencing of oncogenes (KRAS, MYC) across >150 cellular divisions',
        'Reversible activation of silenced tumor suppressors and frataxin loci',
        'Zero off-target genomic cleavage confirmed by ultra-deep CIRCLE-seq',
      ],
      stats: [
        { label: 'Promoter Methylation', val: '99.8%' },
        { label: 'Off-Target Cleavage', val: '0.000%' },
        { label: 'Expression Silencing', val: '-98.7%' },
      ],
      codeSnippet: `EPIGENOME_WRITER_LOG:
> LOCUS: chr12:25,245,350..25,245,384
> HISTONE_MARK: H3K9me3 (Repressive)
> PROMOTER_METHYLATION: 99.8%
> TRANSCRIPTION_REDUCTION: -98.7%
> OFF_TARGET_CLEAVAGE: 0.0000%`,
    },
    {
      id: 'spatial-multiomics',
      title: 'Spatial Multi-Omic Cartography',
      subtitle: 'Sub-Cellular Tissue Resolution',
      icon: Layers,
      badge: '10,000+ Genes Multiplexed',
      description:
        'Diseases operate as dynamic multicellular ecosystems. We map millions of intact mRNA transcripts, protein expressions, and chromatin accessibility states directly inside human patient tumor biopsies down to 180nm optical resolution.',
      points: [
        'Single-cell mapping of immunosuppressive tumor-stroma boundaries',
        'Predicts human clinical drug penetration before starting primate studies',
        'Identifies novel bispecific target synergies invisible to standard bulk RNA-seq',
      ],
      stats: [
        { label: 'Spatial Resolution', val: '180 nm' },
        { label: 'Genes Multiplexed', val: '10,000+' },
        { label: 'Cell Density', val: '8,400/mm²' },
      ],
      codeSnippet: `SPATIAL_CARTO_MATRIX:
> TISSUE_CORE: Glioblastoma Recurrent
> RESOLUTION: 180 nm Optical
> CELL_DENSITY: 8,400 cells/mm²
> MACROPHAGE_POLARITY: M2-Suppressive
> TARGET_SYNERGY: CD47 + SIRPa [HOT]`,
    },
    {
      id: 'autonomous-foundry',
      title: 'Closed-Loop Bio-Foundry',
      subtitle: 'High-Throughput Robotic Wet-Lab',
      icon: Cpu,
      badge: '24/7 Autonomous Synthesis',
      description:
        'In silico designs are instantly transmitted to our automated liquid-handling robotics in Cambridge, MA. Recombinant proteins are synthesized, crystallized, and measured for surface plasmon resonance binding within 4.2 days.',
      points: [
        'Massive parallel microfluidic cell-free protein expression',
        'Automated real-time Surface Plasmon Resonance (SPR) kinetic assays',
        'Continuous active-learning feedback loop updating AI weights daily',
      ],
      stats: [
        { label: 'Droplet Dispense', val: '2.5 nL' },
        { label: 'Hit Confirmation', val: '87.4%' },
        { label: 'Turnaround Latency', val: '4.2 Days' },
      ],
      codeSnippet: `ROBOTIC_BIO_FOUNDRY:
> PLATFORM: Echo-650 Acoustic Dispenser
> ASSAY_RUN: SPR Kinetic Screen
> MOLECULES_SYNTHESIZED_TODAY: 1,420
> HIT_CONFIRMATION_RATE: 87.4%
> CYCLE_LATENCY: 4.2 Days End-to-End`,
    },
  ];

  const currentPillar = pillars[activeTab];

  return (
    <section
      id="innovation"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#0A0E18' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Dynamic Parallax Lighting Backdrop */}
      <motion.div
        style={{ y: bgFloatY }}
        className="absolute top-1/3 left-0 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none opacity-20"
      >
        <div className="w-full h-full rounded-full" style={{ backgroundColor: currentTemplate.palette.primary }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Slides from TOP */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider mb-4 shadow-sm"
            style={{
              backgroundColor: `${currentTemplate.palette.primary}12`,
              borderColor: `${currentTemplate.palette.primary}30`,
              color: currentTemplate.palette.primary,
            }}
          >
            <Binary className="w-3.5 h-3.5" />
            <span>THE MULTI-OMIC INNOVATION ENGINE</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight" style={{ color: currentTemplate.palette.textColor }}>
            Transforming biological discovery into{' '}
            <span
              className="font-serif-italic font-normal text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentTemplate.palette.primary}, ${currentTemplate.palette.accent})`,
              }}
            >
              deterministic computation
            </span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg leading-relaxed font-sans opacity-80" style={{ color: currentTemplate.palette.mutedText }}>
            By merging quantum-accurate generative biophysics with automated closed-loop synthesis, we systematically eliminate the high attrition rate of legacy pharmacology.
          </p>
        </motion.div>

        {/* Fluid Architectural Split Layout (No card boxes!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Vertical Architectural Spine: Slides from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Center connecting laser rail */}
            <div
              className="absolute left-6 top-8 bottom-8 w-0.5 hidden sm:block opacity-20"
              style={{ backgroundColor: currentTemplate.palette.primary }}
            />

            <div className="space-y-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={pillar.id}
                    id={`tab-pillar-${pillar.id}`}
                    onClick={() => {
                      bioSound.playClick(500 + idx * 60);
                      setActiveTab(idx);
                    }}
                    className={`w-full p-5 rounded-2xl text-left transition-all duration-300 relative flex items-start gap-4 ${
                      isActive
                        ? 'translate-x-2'
                        : 'opacity-65 hover:opacity-100 hover:translate-x-1'
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? isDark
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.03)'
                        : 'transparent',
                      borderLeft: isActive
                        ? `3px solid ${currentTemplate.palette.primary}`
                        : '3px solid transparent',
                    }}
                  >
                    <div
                      className="p-3 rounded-xl shrink-0 transition-transform"
                      style={{
                        backgroundColor: isActive
                          ? `${currentTemplate.palette.primary}20`
                          : isDark
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                        color: isActive ? currentTemplate.palette.primary : currentTemplate.palette.mutedText,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-wider"
                          style={{ color: isActive ? currentTemplate.palette.primary : currentTemplate.palette.mutedText }}
                        >
                          {pillar.badge}
                        </span>
                        <span className="text-[10px] font-mono opacity-50">0{idx + 1}</span>
                      </div>

                      <h3
                        className="text-base sm:text-lg font-heading font-bold mt-1 leading-snug"
                        style={{ color: currentTemplate.palette.textColor }}
                      >
                        {pillar.title}
                      </h3>
                      
                      <p className="text-xs font-mono mt-0.5 opacity-60 truncate">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Holographic Console Terminal: Slides from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45 }}
                className="p-6 sm:p-10 rounded-3xl border backdrop-blur-xl space-y-8 relative overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: isDark ? 'rgba(11, 15, 26, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Top Corner Registration Crosshairs */}
                <div className="absolute top-3 left-3 text-[9px] font-mono opacity-30">// PILLAR_ENG_0{activeTab + 1}</div>
                <div className="absolute top-3 right-3 text-[9px] font-mono opacity-30">PDB_STREAM // ACTIVE</div>

                {/* Main Overview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                      style={{
                        backgroundColor: `${currentTemplate.palette.primary}15`,
                        borderColor: `${currentTemplate.palette.primary}35`,
                        color: currentTemplate.palette.primary,
                      }}
                    >
                      {currentPillar.badge}
                    </span>
                    <span className="text-xs font-mono opacity-50">• {currentPillar.subtitle}</span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                    style={{ color: currentTemplate.palette.textColor }}
                  >
                    {currentPillar.title}
                  </h3>

                  <p
                    className="text-sm sm:text-base leading-relaxed font-sans"
                    style={{ color: currentTemplate.palette.mutedText }}
                  >
                    {currentPillar.description}
                  </p>
                </div>

                {/* Biophysical Key Metrics Strip: Unbroken Bar */}
                <div
                  className="grid grid-cols-3 gap-3 p-4 rounded-2xl border"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {currentPillar.stats.map((s, idx) => (
                    <div key={idx} className="text-left">
                      <div className="text-[10px] font-mono opacity-60 uppercase truncate">{s.label}</div>
                      <div
                        className="text-lg sm:text-xl font-mono font-bold mt-0.5"
                        style={{ color: idx === 1 ? currentTemplate.palette.accent : currentTemplate.palette.primary }}
                      >
                        {s.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Architectural Proof Points */}
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider font-semibold opacity-60">
                    Scientific Core Validation:
                  </div>
                  {currentPillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <div
                        className="p-1 rounded-full shrink-0 mt-0.5"
                        style={{ backgroundColor: `${currentTemplate.palette.primary}25`, color: currentTemplate.palette.primary }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-sans leading-relaxed" style={{ color: currentTemplate.palette.textColor }}>
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Real-time Code Output Terminal: Slides up from BOTTOM */}
                <div
                  className="p-4 rounded-2xl font-mono text-xs overflow-x-auto border"
                  style={{
                    backgroundColor: isDark ? '#05070D' : '#0F172A',
                    borderColor: isDark ? '#1E293B' : '#334155',
                    color: '#10B981',
                  }}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>HPC SIMULATION LOG</span>
                    </span>
                    <span className="text-[10px] text-emerald-500 font-bold animate-pulse">LIVE COMPUTATION</span>
                  </div>
                  <pre className="text-[11px] text-slate-300 leading-relaxed font-mono">
                    {currentPillar.codeSnippet}
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
