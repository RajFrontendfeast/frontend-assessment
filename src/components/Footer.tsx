import React, { useState, useEffect } from 'react';
import { Dna, ShieldCheck, Globe2, ExternalLink, ArrowUp, Cpu } from 'lucide-react';
import { bioSound } from '../utils/sound';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    bioSound.playClick(500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0B0F19] border-t border-slate-800/80 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Dna className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white">SYNTHETIX BIO</span>
                <span className="text-[10px] font-mono text-emerald-300 ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 font-semibold">
                  CLINICAL STAGE
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Synthetix Bio is a clinical-stage biotechnology platform engineering generative de novo proteins, zero-break epigenetic therapeutics, and allogeneic cellular architectures.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Node Health: Nominal</span>
              </span>
              <span>•</span>
              <span>Latency: 18ms</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{utcTime}</span>
            </div>
          </div>

          {/* Col 2: Therapeutics */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              Therapeutic Areas
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#pipeline" className="hover:text-emerald-300 transition-colors">
                  Oncology (KRAS, Solid Tumors)
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-emerald-300 transition-colors">
                  Neurodegeneration (Tau, AD)
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-emerald-300 transition-colors">
                  Rare Genetic (Friedreich's Ataxia)
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-emerald-300 transition-colors">
                  Fibrotic & Autoimmune Colitis
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-emerald-300 transition-colors">
                  Cardiometabolic (MASH / MASH-F3)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform & Science
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#innovation" className="hover:text-emerald-300 transition-colors">
                  Generative Protein Diffusion
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-emerald-300 transition-colors">
                  Zero-Break Epigenetic Editing
                </a>
              </li>
              <li>
                <a href="#workbench" className="hover:text-emerald-300 transition-colors">
                  In Silico Molecular Workbench
                </a>
              </li>
              <li>
                <a href="#publications" className="hover:text-emerald-300 transition-colors">
                  Peer-Reviewed Publications
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-emerald-300 transition-colors">
                  Spatial Multi-Omic Cartography
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Governance */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              Global Foundry Nodes
            </h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li className="flex items-center justify-between text-slate-300">
                <span>Cambridge, MA (HQ)</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Basel, Switzerland</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>South San Francisco</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Oxford, UK</span>
                <span className="text-cyan-400 font-bold">EXPANDING</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed font-sans space-y-2">
          <p>
            <strong>Regulatory Statement:</strong> Therapeutic candidates described on this platform (including SB-402, SB-819, SB-104, SB-670, SB-905, and SB-312) are investigational products under ongoing clinical and preclinical evaluation and have not received commercial marketing authorization from the U.S. FDA, EMA, or other regulatory bodies.
          </p>
          <p>
            © {new Date().getFullYear()} Synthetix Bio Therapeutics Inc. All global rights reserved. Programmable Epigenetics™ and DeNovoFlow™ are registered marks.
          </p>
        </div>

        {/* Back to Top Floating Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">ISO 27001 Bio-Security Certified</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">cGMP / GLP Compliant</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800 flex items-center gap-1.5 text-xs font-mono shadow-sm"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
