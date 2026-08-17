import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dna,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowRight,
  ArrowLeft,
  FlaskConical,
  Binary,
  Microscope,
  CheckCircle2,
  Atom,
  Terminal,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Zap,
  X,
  Play,
  RotateCcw,
  Sliders,
  Database,
  FileText
} from 'lucide-react';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { centerTabInContainer } from '../utils/tabScroll';

interface JourneyStage {
  id: string;
  step: string;
  category: 'in-silico' | 'wet-lab' | 'clinical';
  categoryLabel: string;
  title: string;
  tagline: string;
  timeframe: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  description: string;
  highlights: string[];
  telemetry: { label: string; value: string; desc?: string }[];
  codeBlock: string;
  deepDiveNote: string;
  visualType: 'diffusion' | 'quantum' | 'acoustic' | 'cryo' | 'organ' | 'ind';
  metrics: { name: string; val: string; pct: number }[];
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'stage-01',
    step: '01',
    category: 'in-silico',
    categoryLabel: 'In Silico Physics',
    title: 'Atomic Target Topology',
    tagline: 'De Novo Backbone Diffusion Engine',
    timeframe: 'Day 01 - 03',
    badge: 'Phase 01 // Diffusion',
    icon: Dna,
    accentColor: '#10B981',
    description:
      'Cryo-EM coordinates of target macromolecules (e.g. KRAS-G12D, Tau-4R) are loaded into our generative diffusion architecture. The AI solves electrostatic fields and synthesizes 128,000 candidate backbones tailored to cryptic allosteric pockets in under 72 hours.',
    highlights: [
      'Sub-angstrom surface contour matching to cryptic pockets',
      'Quantum-accurate electrostatic field mapping & Gibbs free energy',
      'Automatic immunogenicity, solubility, and aggregation filters',
    ],
    telemetry: [
      { label: 'Backbones Generated', value: '128,000', desc: 'SCFF Candidates' },
      { label: 'Binding Pocket Vol', value: '420 Å³', desc: 'Allosteric Site' },
      { label: 'Design Latency', value: '72 Hours', desc: 'Full Proteome Target' },
    ],
    codeBlock: `DIFFUSION_ENGINE // v4.9.2 [DE_NOVO]
> TARGET_PDB: 8G12 [KRAS-G12D Allosteric Pocket]
> REVERSE_LANGEVIN: T=1000 -> T=0 CONVERGED
> POOL_GENERATED: 128,000 candidates
> TOP_GIBBS_ENERGY: -14.2 kcal/mol
> RMSD_PREDICTED: 0.62 Å vs native ligand`,
    deepDiveNote:
      'Generative 3D diffusion models sample coordinate distributions directly from cryogenic voxel density maps, computing reverse Langevin dynamics to sculpt high-affinity macrocyclic backbone conformers without template bias.',
    visualType: 'diffusion',
    metrics: [
      { name: 'Electrostatic Fit', val: '99.4%', pct: 99.4 },
      { name: 'Pocket Complementarity', val: '98.2%', pct: 98.2 },
      { name: 'Solubility Index', val: '94.6%', pct: 94.6 },
    ],
  },
  {
    id: 'stage-02',
    step: '02',
    category: 'in-silico',
    categoryLabel: 'In Silico Physics',
    title: 'Quantum QM/MM Energy Simulation',
    tagline: 'Molecular Dynamics & Solvation Entropy',
    timeframe: 'Day 04 - 07',
    badge: 'Phase 02 // Physics MD',
    icon: Atom,
    accentColor: '#06B6D4',
    description:
      'All candidate conformations undergo accelerated all-atom molecular dynamics on our dedicated 840 PFLOPS compute cluster. Free energy landscapes, solvent entropy, and backbone flexibility are solved to isolate the top 50 sub-nanomolar binders.',
    highlights: [
      'Solvation free energy and entropic penalty calculation',
      'Conformational stability across 310K physiological temps',
      'Off-target proteome-wide cross-reactivity screening (<0.001%)',
    ],
    telemetry: [
      { label: 'Predicted Affinity', value: '0.018 nM Kd', desc: 'Sub-nanomolar' },
      { label: 'MD Trajectories', value: '256,000', desc: '10 µs Simulations' },
      { label: 'Compute Cluster', value: '840 PFLOPS', desc: 'Custom TPU Mesh' },
    ],
    codeBlock: `QUANTUM_SCREEN // QM/MM FREE_ENERGY
> SIMULATION_TIME: 10.0 microseconds
> SOLVENT_ENTROPY_DELTA_S: -2.1 cal/(mol*K)
> OFF_TARGET_BINDING_SCORE: < 0.001%
> PREDICTED_Kd: 0.018 nM [TOP 0.04% ISOLATED]
> WATER_DISPLACEMENT_GAIN: +8.6 kcal/mol`,
    deepDiveNote:
      'Hybrid Quantum Mechanics/Molecular Mechanics (QM/MM) density functional theory accounts for explicit polarization and interfacial water molecule reorganization within deep binding clefts.',
    visualType: 'quantum',
    metrics: [
      { name: 'Binding Stability', val: '99.8%', pct: 99.8 },
      { name: 'Proteome Selectivity', val: '99.9%', pct: 99.9 },
      { name: 'Thermal Resistance', val: '96.2%', pct: 96.2 },
    ],
  },
  {
    id: 'stage-03',
    step: '03',
    category: 'wet-lab',
    categoryLabel: 'Robotic Bio-Foundry',
    title: 'Acoustic Robotic Bio-Foundry',
    tagline: 'High-Throughput Cell-Free Protein Synthesis',
    timeframe: 'Day 08 - 14',
    badge: 'Phase 03 // Robotic Lab',
    icon: FlaskConical,
    accentColor: '#8B5CF6',
    description:
      'In silico blueprints transmit directly to automated acoustic liquid-handlers in our Kendall Square bio-foundry. Cell-free transcription-translation (TX-TL) systems synthesize physical macromolecular proteins at sub-nanoliter precision without cellular culture latency.',
    highlights: [
      '2.5 nL droplet acoustic ejection with zero physical contact',
      'Continuous 384-well microfluidic bioreactor synthesis',
      'Instant active-learning feedback loop continuously updating AI weights',
    ],
    telemetry: [
      { label: 'Droplet Dispense', value: '2.5 nL', desc: 'Acoustic Precision' },
      { label: 'Synthesis Yield', value: '96.4%', desc: 'HPLC Chromatography' },
      { label: 'Cycle Turnaround', value: '4.2 Days', desc: 'Target to Prototype' },
    ],
    codeBlock: `BIO_FOUNDRY // ROBOTIC_NODE_01
> ECHO_650_ACOUSTIC: ONLINE
> PLATES_DISPENSED: 48 x 384-well format
> SYNTHESIS_CONCENTRATION: 185 mg/mL
> HPLC_PURITY: 99.2% single-peak
> ROBOTIC_RUN_TIME: 04h 12m [ZERO CONTACT]`,
    deepDiveNote:
      'Cell-free TX-TL acoustic robotics eliminate the traditional 3-week bacterial transformation cycle, producing pure folded biotherapeutics ready for kinetic assays in under 100 hours.',
    visualType: 'acoustic',
    metrics: [
      { name: 'Dispense Accuracy', val: '99.7%', pct: 99.7 },
      { name: 'Protein Purity', val: '99.2%', pct: 99.2 },
      { name: 'Robotic Uptime', val: '98.9%', pct: 98.9 },
    ],
  },
  {
    id: 'stage-04',
    step: '04',
    category: 'wet-lab',
    categoryLabel: 'Robotic Bio-Foundry',
    title: 'Cryo-EM & SPR Kinetic Validation',
    tagline: 'Atomic Resolution Verification & Real-Time SPR',
    timeframe: 'Day 15 - 24',
    badge: 'Phase 04 // Structural Proof',
    icon: Microscope,
    accentColor: '#10B981',
    description:
      'Synthesized therapeutic leads are co-crystallized with target macromolecules and imaged using 300 kV cryogenic electron microscopy. Real-time surface plasmon resonance (SPR) provides empirical validation of association/dissociation kinetics.',
    highlights: [
      '0.74 Å crystal structure atomic coordinate fit to AI prediction',
      'Real-time Ka / Kd association and dissociation binding kinetics',
      'Thermal shift differential scanning fluorimetry (Tm > 82°C)',
    ],
    telemetry: [
      { label: 'Cryo-EM Resolution', value: '0.74 Å', desc: 'Atomic Density' },
      { label: 'Thermal Stability', value: '82.4°C', desc: 'Tm Melting Point' },
      { label: 'Hit Concordance', value: '87.4%', desc: 'AI vs Empirical' },
    ],
    codeBlock: `CRYO_EM_VERIFY // BEAMLINE_BEACON
> ELECTRON_VOLTAGE: 300 kV Titan Krios
> ATOMIC_RESOLUTION: 0.74 Å
> RMSD_VS_DIFFUSION: 0.72 Å [CONFIRMED FIT]
> SPR_KD_MEASURED: 0.018 nM (Kon: 1.4e6, Koff: 2.5e-5)
> THERMAL_MELTING_Tm: 82.4°C [HYPER-STABLE]`,
    deepDiveNote:
      'Direct SPR multi-cycle kinetics confirm steady-state Kd under 0.02 nM, matching in silico predicted binding conformations to within 0.72 Å RMSD.',
    visualType: 'cryo',
    metrics: [
      { name: 'Resolution Fit', val: '99.1%', pct: 99.1 },
      { name: 'Empirical Concordance', val: '87.4%', pct: 87.4 },
      { name: 'Thermostability', val: '95.8%', pct: 95.8 },
    ],
  },
  {
    id: 'stage-05',
    step: '05',
    category: 'clinical',
    categoryLabel: 'Clinical Translation',
    title: 'Organ-on-Chip & Spatial PK/PD',
    tagline: 'Predictive Human Translation & BBB Transcytosis',
    timeframe: 'Month 02 - 06',
    badge: 'Phase 05 // Human PK/PD',
    icon: Activity,
    accentColor: '#06B6D4',
    description:
      'Physiological organ-on-chip microfluidics model human blood-brain barrier transport, tumor tissue penetration, and hepatic clearance. This replaces flawed historical animal surrogates with human-predictive datasets.',
    highlights: [
      '14.8% BBB receptor-mediated transcytosis (vs 0.1% for standard mAbs)',
      'Single-cell spatial transcriptomics validating zero off-target toxicity',
      'Whole-body physiologically based pharmacokinetics (PBPK)',
    ],
    telemetry: [
      { label: 'Human PK Fit', value: 'R² = 0.94', desc: 'FIH Concordance' },
      { label: 'Therapeutic Index', value: '>320x', desc: 'Safety Window' },
      { label: 'In Vivo Half-Life', value: '28.4 Days', desc: 'Human Plasma' },
    ],
    codeBlock: `PBPK_SIMULATOR // MICROVASCULAR_ARRAY
> BBB_CSF_SERUM_RATIO: 14.8% [RECEPTOR TRANSCYTOSIS]
> SOLID_TUMOR_PENETRATION: 8.4x over standard IgG1
> HEPATIC_CLEARANCE_RATE: < 0.12 mL/min/kg
> THERAPEUTIC_WINDOW: >320x safety margin`,
    deepDiveNote:
      'Human-derived vascularized microchannels predict clinical dose escalation curves with 94% concordance to subsequent First-in-Human Phase I pharmacokinetic data.',
    visualType: 'organ',
    metrics: [
      { name: 'BBB Transcytosis', val: '14.8%', pct: 74 },
      { name: 'Tissue Penetration', val: '8.4x', pct: 84 },
      { name: 'FIH Correlation', val: '94.0%', pct: 94 },
    ],
  },
  {
    id: 'stage-06',
    step: '06',
    category: 'clinical',
    categoryLabel: 'Clinical Translation',
    title: 'IND-Enabling & First-in-Human Sprint',
    tagline: '14-Month Sprint to First-in-Human Dosing',
    timeframe: 'Month 07 - 14',
    badge: 'Phase 06 // Clinical IND',
    icon: ShieldCheck,
    accentColor: '#8B5CF6',
    description:
      'GMP master cell banking, GLP non-human primate toxicology, and FDA/EMA IND electronic dossiers are completed in parallel. Synthetix advances from target discovery to first human dosing in 14 months instead of 6.5 years.',
    highlights: [
      'FDA Fast Track & Orphan Drug acceleration dossier strategies',
      'Master cell bank generation under cGMP Class 7 standards',
      'Seamless multi-center Phase I/II protocol execution at top cancer centers',
    ],
    telemetry: [
      { label: 'Discovery to IND', value: '14 Months', desc: 'Preclinical Sprint' },
      { label: 'Traditional Latency', value: '6.5 Years', desc: 'Pharma Average' },
      { label: 'Velocity Multiplier', value: '5.5x Faster', desc: 'Speed to Clinic' },
    ],
    codeBlock: `REGULATORY_IND // GLOBAL_FILING_DOSSIER
> GMP_BATCH_RELEASE: PASS (21 CFR Part 11)
> FDA_IND_SUBMISSION: CLEARED (Center for Drug Eval)
> PHASE_I_FIRST_PATIENT_DOSED: ACTIVE
> TRIAL_NETWORK: DANA-FARBER / MASCO CANCER`,
    deepDiveNote:
      'Integrated eCTD documentation modules 1 through 5 are generated dynamically with full cryptographic provenance tracking linked directly to raw cryo-EM and SPR source telemetry.',
    visualType: 'ind',
    metrics: [
      { name: 'Regulatory Clearance', val: '100%', pct: 100 },
      { name: 'GMP Yield Purity', val: '99.8%', pct: 99.8 },
      { name: 'Timeline Compression', val: '5.5x', pct: 92 },
    ],
  },
];

type CategoryFilter = 'all' | 'in-silico' | 'wet-lab' | 'clinical';

export const HorizontalJourneySection: React.FC = () => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const categoryTabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const stageTabRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoryFilter>('all');
  const [activeInnerTab, setActiveInnerTab] = useState<'visual' | 'telemetry' | 'protocol'>('visual');
  const [modalStage, setModalStage] = useState<JourneyStage | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useBodyScrollLock(!!modalStage);

  // Auto-center active stage tab in horizontal scroll container without page shift
  useEffect(() => {
    const container = stageContainerRef.current;
    const target = stageTabRefs.current[selectedStageIndex];
    if (container && target) {
      centerTabInContainer(container, target);
    }
  }, [selectedStageIndex]);

  // Auto-center active category filter tab in horizontal scroll container
  useEffect(() => {
    const container = categoryContainerRef.current;
    const target = categoryTabRefs.current[activeCategoryFilter];
    if (container && target) {
      centerTabInContainer(container, target);
    }
  }, [activeCategoryFilter]);

  const activeStage = JOURNEY_STAGES[selectedStageIndex];
  const ActiveIcon = activeStage.icon;

  const filteredStages = JOURNEY_STAGES.filter((stage) => {
    if (activeCategoryFilter === 'all') return true;
    return stage.category === activeCategoryFilter;
  });

  const handleSelectStage = (index: number) => {
    bioSound.playClick(600);
    setSelectedStageIndex(index);
  };

  const handleNextStage = () => {
    bioSound.playClick(700);
    setSelectedStageIndex((prev) => (prev + 1) % JOURNEY_STAGES.length);
  };

  const handlePrevStage = () => {
    bioSound.playClick(500);
    setSelectedStageIndex((prev) => (prev - 1 + JOURNEY_STAGES.length) % JOURNEY_STAGES.length);
  };

  const handleFilterChange = (cat: CategoryFilter) => {
    bioSound.playClick(550);
    setActiveCategoryFilter(cat);
    // If current selected stage doesn't match filter, select first matching
    if (cat !== 'all') {
      const matchIdx = JOURNEY_STAGES.findIndex((s) => s.category === cat);
      if (matchIdx !== -1) {
        setSelectedStageIndex(matchIdx);
      }
    }
  };

  const handleTriggerSimulation = () => {
    bioSound.playClick(800);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1800);
  };

  return (
    <section
      id="journey"
      className="relative py-12 sm:py-24 lg:py-32 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#080C16' : '#FAFAFC',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Ambient background light gradients */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-15"
        style={{ backgroundColor: currentTemplate.palette.primary }}
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-10"
        style={{ backgroundColor: currentTemplate.palette.accent }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider mb-3 shadow-sm mx-auto"
            style={{
              backgroundColor: `${currentTemplate.palette.primary}12`,
              borderColor: `${currentTemplate.palette.primary}30`,
              color: currentTemplate.palette.primary,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO STAGES // 14-MONTH PIPELINE</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight"
            style={{ color: currentTemplate.palette.textColor }}
          >
            Translational Pipeline{' '}
            <span
              className="font-serif-italic font-normal text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentTemplate.palette.primary}, ${currentTemplate.palette.accent})`,
              }}
            >
              Portfolio & Milestones
            </span>
          </h2>

          <p
            className="mt-3 text-sm sm:text-base lg:text-lg opacity-75 font-sans leading-relaxed"
            style={{ color: currentTemplate.palette.mutedText }}
          >
            Select any phase below to inspect the computational synthesis blueprints, robotic wet-lab fabrication nodes, and clinical translational milestones.
          </p>

          {/* Velocity Bar */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mt-5 pt-4 border-t font-mono text-xs opacity-80"
            style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Target Discovery: <strong>72 Hours</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Robotic Synthesis: <strong>4.2 Days</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>IND Regulatory Clearance: <strong>14 Months</strong></span>
            </div>
          </div>
        </motion.div>

        {/* Category Filters - Nowrap and horizontally scrollable on mobile */}
        <div
          ref={categoryContainerRef}
          className="flex items-center sm:justify-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar max-w-full"
        >
          {[
            { id: 'all' as CategoryFilter, label: 'All 6 Phases' },
            { id: 'in-silico' as CategoryFilter, label: '01-02 In Silico Physics' },
            { id: 'wet-lab' as CategoryFilter, label: '03-04 Robotic Bio-Foundry' },
            { id: 'clinical' as CategoryFilter, label: '05-06 Clinical Translation' },
          ].map((cat) => {
            const isCatActive = activeCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => (categoryTabRefs.current[cat.id] = el)}
                onClick={() => {
                  handleFilterChange(cat.id);
                  if (categoryContainerRef.current && categoryTabRefs.current[cat.id]) {
                    centerTabInContainer(categoryContainerRef.current, categoryTabRefs.current[cat.id]);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap shrink-0 transition-all duration-200 ${
                  isCatActive
                    ? 'font-bold shadow-md scale-105'
                    : 'opacity-65 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isCatActive
                    ? `${currentTemplate.palette.primary}20`
                    : isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: isCatActive
                    ? currentTemplate.palette.primary
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  color: isCatActive ? currentTemplate.palette.primary : currentTemplate.palette.textColor,
                  borderWidth: 1,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Stage Tabs Navigation Ribbon */}
        <div
          ref={stageContainerRef}
          className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border backdrop-blur-xl mb-6 sm:mb-8 shadow-sm overflow-x-auto no-scrollbar max-w-full"
          style={{
            backgroundColor: isDark ? 'rgba(13, 19, 33, 0.85)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 min-w-max sm:min-w-0">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isSelected = selectedStageIndex === idx;
              const StageIcon = stage.icon;
              const isFilteredOut = activeCategoryFilter !== 'all' && stage.category !== activeCategoryFilter;

              return (
                <button
                  key={stage.id}
                  ref={(el) => (stageTabRefs.current[idx] = el)}
                  id={`journey-tab-${stage.id}`}
                  onClick={() => {
                    handleSelectStage(idx);
                    if (stageContainerRef.current && stageTabRefs.current[idx]) {
                      centerTabInContainer(stageContainerRef.current, stageTabRefs.current[idx]);
                    }
                  }}
                  className={`relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-left transition-all duration-300 flex flex-col justify-between group min-w-[140px] sm:min-w-0 shrink-0 ${
                    isSelected
                      ? 'shadow-lg'
                      : isFilteredOut
                      ? 'opacity-35 hover:opacity-75'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'
                      : 'transparent',
                    border: isSelected
                      ? `1px solid ${currentTemplate.palette.primary}`
                      : '1px solid transparent',
                  }}
                >
                  {/* Active highlight indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="activePortfolioTabIndicator"
                      className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
                      style={{
                        backgroundColor: `${currentTemplate.palette.primary}12`,
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-1.5 mb-2 relative z-10">
                    <div
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: isSelected
                          ? currentTemplate.palette.primary
                          : isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                        color: isSelected
                          ? isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF'
                          : currentTemplate.palette.textColor,
                      }}
                    >
                      {stage.step}
                    </div>

                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded-full truncate opacity-75"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                        color: currentTemplate.palette.textColor,
                      }}
                    >
                      {stage.timeframe}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div
                      className="text-xs font-heading font-bold leading-snug line-clamp-1 group-hover:text-emerald-500 transition-colors"
                      style={{ color: currentTemplate.palette.textColor }}
                    >
                      {stage.title}
                    </div>
                    <div
                      className="text-[10px] font-mono truncate mt-0.5 opacity-60"
                      style={{ color: currentTemplate.palette.mutedText }}
                    >
                      {stage.categoryLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Portfolio Showcase View (Bento Grid / Split Screen) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-3xl border backdrop-blur-2xl p-4 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden"
            style={{
              backgroundColor: isDark ? 'rgba(12, 18, 32, 0.85)' : 'rgba(255, 255, 255, 0.98)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Background Watermark */}
            <div
              className="absolute top-4 right-8 text-8xl lg:text-9xl font-display font-black opacity-[0.04] select-none pointer-events-none"
              style={{ color: currentTemplate.palette.textColor }}
            >
              {activeStage.step}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start relative z-10">
              
              {/* Left Column: Stage Specifications, Overview & Telemetry (7 Cols on desktop) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Meta Top Tag Strip */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <div
                    className="p-2 rounded-xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `${currentTemplate.palette.primary}15`,
                      borderColor: `${currentTemplate.palette.primary}30`,
                      color: currentTemplate.palette.primary,
                    }}
                  >
                    <ActiveIcon className="w-5 h-5" />
                  </div>

                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                    style={{
                      backgroundColor: `${currentTemplate.palette.primary}12`,
                      borderColor: `${currentTemplate.palette.primary}25`,
                      color: currentTemplate.palette.primary,
                    }}
                  >
                    {activeStage.badge}
                  </span>

                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono opacity-80 border flex items-center gap-1.5"
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <Clock className="w-3.5 h-3.5 opacity-60" />
                    <span>Duration: {activeStage.timeframe}</span>
                  </span>
                </div>

                {/* Stage Title & Tagline */}
                <div>
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight leading-tight"
                    style={{ color: currentTemplate.palette.textColor }}
                  >
                    {activeStage.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base font-mono font-semibold mt-1"
                    style={{ color: currentTemplate.palette.primary }}
                  >
                    {activeStage.tagline}
                  </p>
                </div>

                {/* Executive Description */}
                <p
                  className="text-sm sm:text-base leading-relaxed font-sans opacity-85"
                  style={{ color: currentTemplate.palette.mutedText }}
                >
                  {activeStage.description}
                </p>

                {/* Key Technical Highlights */}
                <div
                  className="p-4 sm:p-5 rounded-2xl border space-y-2.5"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="text-[11px] font-mono uppercase font-bold opacity-60 tracking-wider">
                    Core Technical Deliverables:
                  </div>
                  <div className="space-y-2">
                    {activeStage.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: currentTemplate.palette.primary }}
                        />
                        <span className="font-sans leading-snug" style={{ color: currentTemplate.palette.textColor }}>
                          {hl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Telemetry Matrix - 1 col on mobile, 3 cols on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                  {activeStage.telemetry.map((tel, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3 sm:p-3.5 rounded-2xl border transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="text-[10px] font-mono opacity-60 uppercase truncate">{tel.label}</div>
                      <div
                        className="text-base sm:text-lg font-mono font-bold mt-1 tracking-tight truncate"
                        style={{ color: currentTemplate.palette.primary }}
                      >
                        {tel.value}
                      </div>
                      {tel.desc && (
                        <div className="text-[10px] font-sans opacity-50 truncate mt-0.5">{tel.desc}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Action Controls & Pagination */}
                <div
                  className="pt-4 border-t flex flex-wrap items-center justify-between gap-3"
                  style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevStage}
                      className="p-2.5 rounded-xl border opacity-75 hover:opacity-100 transition-all hover:scale-105"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                      }}
                      title="Previous Stage"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextStage}
                      className="p-2.5 rounded-xl border opacity-75 hover:opacity-100 transition-all hover:scale-105"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                      }}
                      title="Next Stage"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono opacity-60 ml-2">
                      Phase {selectedStageIndex + 1} of {JOURNEY_STAGES.length}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      bioSound.playClick(650);
                      setModalStage(activeStage);
                    }}
                    className="px-4 py-2 rounded-full border text-xs font-mono font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
                    style={{
                      backgroundColor: `${currentTemplate.palette.primary}18`,
                      borderColor: `${currentTemplate.palette.primary}35`,
                      color: currentTemplate.palette.primary,
                    }}
                  >
                    <span>Full Stage Dossier</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Right Column: Interactive Visual Simulator, Metrics & Console Terminal (5 Cols on desktop) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Visual Showcase Card with Sub-Tab Selector */}
                <div
                  className="rounded-2xl border p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between"
                  style={{
                    backgroundColor: isDark ? '#050811' : '#0F172A',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                  }}
                >
                  {/* Top Sub-Tab Switcher */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {activeStage.visualType.toUpperCase()}_SIMULATOR // ACTIVE
                      </span>
                    </div>

                    <button
                      onClick={handleTriggerSimulation}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 flex items-center gap-1 transition-all"
                    >
                      <RotateCcw className={`w-3 h-3 ${isSimulating ? 'animate-spin text-emerald-400' : ''}`} />
                      <span>{isSimulating ? 'Calibrating...' : 'Re-Run Model'}</span>
                    </button>
                  </div>

                  {/* Stage-Specific Interactive Visual Simulation Canvas */}
                  <div className="relative min-h-[190px] rounded-xl bg-slate-950/80 border border-slate-800/80 p-4 flex flex-col justify-center items-center overflow-hidden">
                    
                    {/* Background Grid Accent */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(#10B981 1px, transparent 1px)`,
                        backgroundSize: '16px 16px',
                      }}
                    />

                    {/* Visual Type 1: Diffusion Backbone */}
                    {activeStage.visualType === 'diffusion' && (
                      <div className="text-center space-y-3 relative z-10 w-full">
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            animate={{ rotate: [0, 360], scale: isSimulating ? [1, 1.15, 1] : 1 }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-400/60 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                          >
                            <Dna className="w-8 h-8 text-emerald-400 animate-pulse" />
                          </motion.div>
                          <div className="text-left font-mono text-xs">
                            <div className="text-emerald-400 font-bold">128,000 Conformers</div>
                            <div className="text-slate-400 text-[10px]">Pocket: KRAS-G12D (8G12)</div>
                            <div className="text-slate-400 text-[10px]">Solvent Volume: 420 Å³</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-emerald-400 h-full rounded-full"
                            initial={{ width: '20%' }}
                            animate={{ width: isSimulating ? ['0%', '100%', '98%'] : '98%' }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                          <span>Reverse Langevin Sampling</span>
                          <span className="text-emerald-400">Converged T=0</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Type 2: Quantum Free Energy */}
                    {activeStage.visualType === 'quantum' && (
                      <div className="text-center space-y-3 relative z-10 w-full">
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            animate={{ rotate: [360, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 rounded-full border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20"
                          >
                            <Atom className="w-8 h-8 text-cyan-400" />
                          </motion.div>
                          <div className="text-left font-mono text-xs">
                            <div className="text-cyan-400 font-bold">Kd = 0.018 nM Target</div>
                            <div className="text-slate-400 text-[10px]">Trajectory: 10.0 µs</div>
                            <div className="text-slate-400 text-[10px]">RMSD: 0.68 Å Equil</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-cyan-400 h-full rounded-full"
                            initial={{ width: '40%' }}
                            animate={{ width: isSimulating ? ['10%', '100%', '99.2%'] : '99.2%' }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                          <span>840 PFLOPS Molecular Dynamics</span>
                          <span className="text-cyan-400">ΔG = -14.2 kcal/mol</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Type 3: Acoustic Dispenser */}
                    {activeStage.visualType === 'acoustic' && (
                      <div className="text-center space-y-3 relative z-10 w-full">
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            animate={{ y: [-3, 3, -3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 rounded-full border-2 border-purple-400/50 flex items-center justify-center shadow-lg shadow-purple-500/20"
                          >
                            <FlaskConical className="w-8 h-8 text-purple-400" />
                          </motion.div>
                          <div className="text-left font-mono text-xs">
                            <div className="text-purple-400 font-bold">Echo 650 Acoustic</div>
                            <div className="text-slate-400 text-[10px]">Droplet: 2.5 nL Pulse</div>
                            <div className="text-slate-400 text-[10px]">HPLC Purity: 99.2%</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-purple-400 h-full rounded-full"
                            initial={{ width: '30%' }}
                            animate={{ width: isSimulating ? ['10%', '100%', '96.4%'] : '96.4%' }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                          <span>Cell-Free TX-TL Bio-Foundry</span>
                          <span className="text-purple-400">4.2 Day Turnaround</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Type 4: Cryo-EM Resolution */}
                    {activeStage.visualType === 'cryo' && (
                      <div className="text-center space-y-3 relative z-10 w-full">
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-16 h-16 rounded-full border-2 border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                          >
                            <Microscope className="w-8 h-8 text-emerald-400" />
                          </motion.div>
                          <div className="text-left font-mono text-xs">
                            <div className="text-emerald-400 font-bold">300 kV Titan Krios</div>
                            <div className="text-slate-400 text-[10px]">0.74 Å Atomic Fit</div>
                            <div className="text-slate-400 text-[10px]">Tm Melting: 82.4°C</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-emerald-400 h-full rounded-full"
                            initial={{ width: '50%' }}
                            animate={{ width: isSimulating ? ['20%', '100%', '97.5%'] : '97.5%' }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                          <span>SPR Empirical Kd: 0.018 nM</span>
                          <span className="text-emerald-400">RMSD 0.72 Å</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Type 5: Organ-on-Chip */}
                    {activeStage.visualType === 'organ' && (
                      <div className="text-center space-y-3 relative z-10 w-full">
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="w-16 h-16 rounded-full border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20"
                          >
                            <Activity className="w-8 h-8 text-cyan-400" />
                          </motion.div>
                          <div className="text-left font-mono text-xs">
                            <div className="text-cyan-400 font-bold">BBB Receptor Transcytosis</div>
                            <div className="text-slate-400 text-[10px]">CSF/Serum: 14.8%</div>
                            <div className="text-slate-400 text-[10px]">Tumor Penetration: 8.4x</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-cyan-400 h-full rounded-full"
                            initial={{ width: '40%' }}
                            animate={{ width: isSimulating ? ['15%', '100%', '94.0%'] : '94.0%' }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                          <span>Human PBPK Microchannels</span>
                          <span className="text-cyan-400">FIH Fit R² = 0.94</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Type 6: IND Regulatory Sprint */}
                    {activeStage.visualType === 'ind' && (
                      <div className="text-center space-y-3 relative z-10 w-full">
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-16 h-16 rounded-full border-2 border-purple-400/50 flex items-center justify-center shadow-lg shadow-purple-500/20"
                          >
                            <ShieldCheck className="w-8 h-8 text-purple-400" />
                          </motion.div>
                          <div className="text-left font-mono text-xs">
                            <div className="text-purple-400 font-bold">FDA IND Dossier Active</div>
                            <div className="text-slate-400 text-[10px]">Phase I Dosing Active</div>
                            <div className="text-slate-400 text-[10px]">GMP Class 7 Certified</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-purple-400 h-full rounded-full"
                            initial={{ width: '60%' }}
                            animate={{ width: isSimulating ? ['20%', '100%', '100%'] : '100%' }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                          <span>14 Months Target-to-Clinic</span>
                          <span className="text-purple-400">5.5x Compression</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantitative Progression Indicators */}
                  <div className="mt-4 space-y-2.5">
                    {activeStage.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300">{m.name}</span>
                          <span className="text-emerald-400 font-bold">{m.val}</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${m.pct}%` }}
                            transition={{ duration: 0.8, delay: mIdx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: activeStage.accentColor }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Console Log Terminal Box */}
                <div className="rounded-2xl bg-slate-950 border border-slate-800/80 p-4 text-[11px] font-mono shadow-inner overflow-hidden">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>TELEMETRY_LOG // STREAM</span>
                    </div>
                    <span className="text-emerald-400">200_OK</span>
                  </div>
                  <pre className="text-emerald-400 whitespace-pre-wrap leading-tight font-mono text-[10.5px]">
                    {activeStage.codeBlock}
                  </pre>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Deep-Dive Stage Dossier Modal */}
      <AnimatePresence>
        {modalStage && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalStage(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog Body */}
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto overscroll-contain"
              style={{
                backgroundColor: isDark ? '#0A0E18' : '#FFFFFF',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                color: currentTemplate.palette.textColor,
              }}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between pb-4 border-b"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: `${currentTemplate.palette.primary}15`,
                      borderColor: `${currentTemplate.palette.primary}30`,
                      color: currentTemplate.palette.primary,
                    }}
                  >
                    <modalStage.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono opacity-50 block">PHASE {modalStage.step} DOSSIER</span>
                    <h3 className="text-xl font-heading font-bold">{modalStage.title}</h3>
                  </div>
                </div>

                <button
                  onClick={() => setModalStage(null)}
                  className="p-2 rounded-full border opacity-70 hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mt-6 space-y-6">
                <div>
                  <div className="text-xs font-mono font-semibold opacity-60 uppercase mb-1">Translational Overview:</div>
                  <p className="text-sm leading-relaxed font-sans">{modalStage.description}</p>
                </div>

                {/* Mechanism of Action */}
                <div
                  className="p-4 rounded-2xl border space-y-2 text-xs"
                  style={{
                    backgroundColor: `${currentTemplate.palette.primary}08`,
                    borderColor: `${currentTemplate.palette.primary}20`,
                  }}
                >
                  <span className="font-mono uppercase font-bold block" style={{ color: currentTemplate.palette.primary }}>
                    Biophysical & In Silico Mechanism:
                  </span>
                  <p className="font-sans leading-relaxed">{modalStage.deepDiveNote}</p>
                </div>

                {/* Telemetry Matrix Grid */}
                <div>
                  <div className="text-xs font-mono font-semibold opacity-60 uppercase mb-2">Phase Verification Telemetry:</div>
                  <div className="grid grid-cols-3 gap-3">
                    {modalStage.telemetry.map((t, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl border text-center"
                        style={{
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        <div className="text-[10px] font-mono opacity-50">{t.label}</div>
                        <div className="text-sm font-mono font-bold mt-1" style={{ color: currentTemplate.palette.primary }}>
                          {t.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Terminal Trace */}
                <div>
                  <div className="text-xs font-mono font-semibold opacity-60 uppercase mb-2">Live Quantum Log:</div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                    <pre className="whitespace-pre-wrap">{modalStage.codeBlock}</pre>
                  </div>
                </div>

                {/* Modal Footer */}
                <div
                  className="pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
                >
                  <span className="text-xs font-mono opacity-60">Phase Duration: {modalStage.timeframe}</span>
                  <button
                    onClick={() => setModalStage(null)}
                    className="px-5 py-2.5 rounded-full font-mono font-bold text-xs"
                    style={{
                      backgroundColor: currentTemplate.palette.primary,
                      color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF',
                    }}
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
