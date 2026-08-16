import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Shield, FileText, ArrowRight, Dna, Activity, ExternalLink, Download } from 'lucide-react';
import { PipelineAsset } from '../types';
import { bioSound } from '../utils/sound';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface PipelineModalProps {
  asset: PipelineAsset | null;
  onClose: () => void;
  onOpenPartnerWithAsset?: (assetCode: string) => void;
}

export const PipelineModal: React.FC<PipelineModalProps> = ({
  asset,
  onClose,
  onOpenPartnerWithAsset,
}) => {
  useBodyScrollLock(!!asset);

  if (!asset) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain bg-slate-900/60 backdrop-blur-md"
      >
        {/* Backdrop Click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Container */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 z-10 text-slate-900"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {asset.code}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                  {asset.therapeuticArea}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-violet-50 text-violet-800 border border-violet-200 font-mono">
                  {asset.phase}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                {asset.name}
              </h2>
              <p className="text-sm font-mono text-slate-500 mt-1">
                Target: <span className="text-slate-900 font-semibold">{asset.target}</span> — {asset.targetFull}
              </p>
            </div>

            <button
              id="btn-close-pipeline-modal"
              onClick={() => {
                bioSound.playClick(400);
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-6 space-y-6 text-sm text-slate-600">
            {/* Primary Description */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold mb-1.5 flex items-center gap-1.5">
                <Dna className="w-4 h-4 text-emerald-600" />
                Biological Mechanism & Modality
              </h3>
              <p className="leading-relaxed text-slate-700">{asset.description}</p>
              <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-y-2 gap-x-6 text-xs font-mono text-slate-600">
                <div>
                  <span className="text-slate-400">Modality:</span> <span className="text-slate-800 font-semibold">{asset.modality}</span>
                </div>
                <div>
                  <span className="text-slate-400">Delivery:</span> <span className="text-violet-700 font-semibold">{asset.deliveryMethod}</span>
                </div>
              </div>
            </div>

            {/* Key Biophysical Data Metrics */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-600" />
                Biophysical Kinetics & In Vivo Readouts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {asset.keyDataPoints.map((dp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div className="text-xs text-slate-500 font-mono">{dp.label}</div>
                    <div className="text-xl font-mono font-bold text-emerald-700 mt-1">
                      {dp.value}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight">{dp.subtext}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Binding Affinity (Kd)</div>
                <div className="text-emerald-700 font-bold mt-0.5">{asset.bindingAffinity}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Cryo-EM Resolution</div>
                <div className="text-cyan-700 font-bold mt-0.5">{asset.structureResolution}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Commercial Rights</div>
                <div className="text-violet-700 font-bold mt-0.5">{asset.partnerOrRights}</div>
              </div>
            </div>

            {/* Clinical Milestones Roadmap */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                Clinical Development Milestone Timeline
              </h3>
              <div className="space-y-2.5">
                {asset.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs ${
                      m.completed
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${m.completed ? 'text-emerald-600' : 'text-slate-400'}`}
                    />
                    <span className="font-mono font-bold text-slate-700 shrink-0 w-16">{m.year}</span>
                    <span className="flex-1 font-medium">{m.event}</span>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                        m.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {m.completed ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              id="btn-download-dossier"
              onClick={() => {
                bioSound.playClick(600);
                alert(`Preclinical Data Dossier for ${asset.code} has been prepared for download.`);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center gap-2 border border-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Scientific Dossier (PDF)</span>
            </button>

            <button
              id="btn-partner-asset"
              onClick={() => {
                bioSound.playClick(700);
                onClose();
                if (onOpenPartnerWithAsset) {
                  onOpenPartnerWithAsset(asset.code);
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold font-mono tracking-wider flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <span>DISCUSS PARTNERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
