import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { FlaskConical, Play, Sparkles, CheckCircle2, Shield, Activity, Dna, Download, ArrowRight, RefreshCw, Sliders, Terminal, Zap } from 'lucide-react';
import { MOLECULAR_TARGETS } from '../data/biotechData';
import { VirtualExperimentResult } from '../types';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';

interface MolecularLabSectionProps {
  onOpenPartner: () => void;
}

export const MolecularLabSection: React.FC<MolecularLabSectionProps> = ({ onOpenPartner }) => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);

  const [selectedTargetId, setSelectedTargetId] = useState<string>('kras-g12d');
  const [selectedModality, setSelectedModality] = useState<string>('De Novo Engineered Macrocycle');
  const [targetKd, setTargetKd] = useState<number>(0.02);
  const [rigidity, setRigidity] = useState<number>(85);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<VirtualExperimentResult | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const waterMarkX = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  const currentTarget = MOLECULAR_TARGETS.find((t) => t.id === selectedTargetId) || MOLECULAR_TARGETS[0];

  const modalities = [
    'De Novo Engineered Macrocycle',
    'Epigenetic dCas Methylation Silencer',
    'Bispecific Logic-Gated Engager',
    'Targeted mRNA-LNP Nanocapsule',
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setResult(null);
    bioSound.playClick(600);

    setTimeout(() => {
      setIsSimulating(false);
      const computedKd = Number((targetKd * (0.85 + Math.random() * 0.3)).toFixed(3));
      const solubility = Math.round(92 + Math.random() * 7);
      const halfLife = Math.round(18 + Math.random() * 14);
      const rmsd = Number((0.65 + Math.random() * 0.25).toFixed(2));
      const offTarget = Number((0.002 + Math.random() * 0.005).toFixed(4));
      const readiness = Math.round(88 + Math.random() * 11);

      setResult({
        target: currentTarget.name,
        modality: selectedModality,
        bindingAffinityKd: computedKd,
        solubilityScore: solubility,
        halfLifeHours: halfLife,
        offTargetRisk: offTarget,
        conformationRMSD: rmsd,
        syntheticReadiness: readiness,
        recommendation: computedKd < 0.05 ? 'Highly Favorable' : 'Candidate Viable',
      });

      bioSound.playSynthesisSuccess();
    }, 1400);
  };

  return (
    <section
      id="workbench"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#080C16' : '#F7F8F4',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Kinetic Watermark with Parallax */}
      <div className="absolute top-10 inset-x-0 overflow-hidden pointer-events-none opacity-[0.035] select-none">
        <motion.div style={{ x: waterMarkX }} className="whitespace-nowrap text-[13vw] font-display font-black will-change-transform">
          IN SILICO COMPUTATIONAL WORKBENCH • ATOMIC DOCKING
        </motion.div>
      </div>

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
            <FlaskConical className="w-3.5 h-3.5" />
            <span>IN SILICO MOLECULAR WORKBENCH</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight"
            style={{ color: currentTemplate.palette.textColor }}
          >
            Design & Screen Virtual Therapeutics
          </h2>
          <p className="mt-3 text-base sm:text-lg opacity-75 font-sans" style={{ color: currentTemplate.palette.mutedText }}>
            Configure atomic target parameters, select therapeutic modalities, and execute biophysical simulations against high-resolution cryo-EM coordinates in real time.
          </p>
        </motion.div>

        {/* Workbench Split Station (Left Config, Right Execution Console) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Parameter Configuration: Slides from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border backdrop-blur-md space-y-6 shadow-sm"
            style={{
              backgroundColor: isDark ? 'rgba(13, 20, 36, 0.75)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <h3 className="text-lg font-heading font-bold flex items-center gap-2" style={{ color: currentTemplate.palette.textColor }}>
              <Dna className="w-5 h-5" style={{ color: currentTemplate.palette.primary }} />
              <span>Target & Modality Matrix</span>
            </h3>

            {/* 1. Target Receptor Picker */}
            <div>
              <label className="block text-xs font-mono opacity-60 mb-2">
                1. Select Target Macromolecule
              </label>
              <select
                value={selectedTargetId}
                onChange={(e) => {
                  bioSound.playClick(500);
                  setSelectedTargetId(e.target.value);
                }}
                className="w-full px-4 py-3 rounded-2xl border font-mono text-xs focus:outline-none transition-colors shadow-sm"
                style={{
                  backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                  color: currentTemplate.palette.textColor,
                }}
              >
                {MOLECULAR_TARGETS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.symbol}) — {t.class}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Details Badge */}
            <div
              className="p-4 rounded-2xl border text-xs font-mono space-y-1.5"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <div className="flex justify-between opacity-70">
                <span>Associated Disease:</span>
                <span className="font-sans font-medium" style={{ color: currentTemplate.palette.textColor }}>{currentTarget.diseaseAssociation}</span>
              </div>
              <div className="flex justify-between opacity-70">
                <span>PDB Cryo-EM Crystal:</span>
                <span className="font-bold" style={{ color: currentTemplate.palette.primary }}>{currentTarget.defaultPdb}</span>
              </div>
              <div className="flex justify-between opacity-70">
                <span>Chain Length:</span>
                <span style={{ color: currentTemplate.palette.textColor }}>{currentTarget.aminoAcids} Amino Acids</span>
              </div>
            </div>

            {/* 2. Modality Picker */}
            <div>
              <label className="block text-xs font-mono opacity-60 mb-2">
                2. Therapeutic Modality
              </label>
              <div className="space-y-2">
                {modalities.map((mod) => {
                  const isSelected = selectedModality === mod;
                  return (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => {
                        bioSound.playClick(600);
                        setSelectedModality(mod);
                      }}
                      className={`w-full p-3 rounded-2xl text-left text-xs font-mono transition-all flex items-center justify-between border ${
                        isSelected ? 'font-bold scale-[1.01]' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? `${currentTemplate.palette.primary}15`
                          : isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)',
                        borderColor: isSelected
                          ? currentTemplate.palette.primary
                          : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                        color: isSelected ? currentTemplate.palette.primary : currentTemplate.palette.textColor,
                      }}
                    >
                      <span>{mod}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Slider: Target Kd */}
            <div>
              <div className="flex justify-between text-xs font-mono opacity-70 mb-1">
                <span>Target Binding Affinity (Kd):</span>
                <span className="font-bold" style={{ color: currentTemplate.palette.primary }}>{targetKd} nM</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.1"
                step="0.005"
                value={targetKd}
                onChange={(e) => setTargetKd(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Submit Action Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-4 rounded-full font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: currentTemplate.palette.primary,
                color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#000000',
              }}
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>SIMULATING IN SILICO TRAJECTORIES...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>EXECUTE ALL-ATOM SIMULATION</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Right Column: Execution Output Dock: Slides from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 flex flex-col justify-between"
            style={{
              backgroundColor: isDark ? '#060911' : '#0F172A',
              borderColor: isDark ? '#1E293B' : '#334155',
              color: '#FFFFFF',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span>BIOPHYSICAL SIMULATION DOCK</span>
              </span>
              <span className="text-[10px] text-slate-500">QM/MM ENGINE // RUNNING</span>
            </div>

            {/* Live Terminal & Graph Viewport */}
            <div className="min-h-[220px] rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {isSimulating ? (
                <div className="space-y-4">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                  <div className="font-mono text-xs text-emerald-400 font-bold">
                    Minimizing Gibbs Free Energy ΔG...
                  </div>
                  <div className="font-mono text-[11px] text-slate-500">
                    Traversing 256,000 all-atom solvent conformations in cryo-EM pocket
                  </div>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-left space-y-4 font-mono text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-emerald-400 font-bold">CANDIDATE SYNTHESIZED:</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-bold">
                      {result.recommendation}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Computed Kd:</div>
                      <div className="text-base text-emerald-400 font-bold">{result.bindingAffinityKd} nM</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Solubility Index:</div>
                      <div className="text-base text-cyan-400 font-bold">{result.solubilityScore}%</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">In Vivo Half-Life:</div>
                      <div className="text-base text-violet-400 font-bold">{result.halfLifeHours} Hours</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Off-Target Cleavage:</div>
                      <div className="text-base text-slate-200 font-bold">{result.offTargetRisk}%</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Backbone RMSD:</div>
                      <div className="text-base text-emerald-400 font-bold">{result.conformationRMSD} Å</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Readiness Score:</div>
                      <div className="text-base text-amber-400 font-bold">{result.syntheticReadiness}/100</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-2 text-slate-500 font-mono text-xs">
                  <FlaskConical className="w-8 h-8 mx-auto opacity-40 text-emerald-400" />
                  <p>Select target and click "EXECUTE ALL-ATOM SIMULATION" to screen candidate scaffold.</p>
                </div>
              )}
            </div>

            {/* Bottom Actions: Slide up from BOTTOM */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">
                PDB Target: <strong className="text-white">{currentTarget.defaultPdb}</strong>
              </span>
              <button
                onClick={() => {
                  bioSound.playClick(600);
                  onOpenPartner();
                }}
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <span>REQUEST SYNTHESIS IN ROBOTIC FOUNDRY</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
