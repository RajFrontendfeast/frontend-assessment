import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, Download, Mail, CheckCircle2, ShieldCheck, Dna, FileText, Activity } from 'lucide-react';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';

interface CtaSectionProps {
  onOpenPartner: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenPartner }) => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.15]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    bioSound.playClick(600);
    setIsSubscribed(true);
    bioSound.playSynthesisSuccess();
  };

  const handleDownloadWhitepaper = () => {
    bioSound.playClick(500);
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden border-t transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#060911' : '#F4F5F0',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Dynamic Parallax Radiant Atmosphere */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none opacity-25"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            backgroundImage: `radial-gradient(circle, ${currentTemplate.palette.primary}, ${currentTemplate.palette.accent})`,
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Full-Width Architectural Portal Shell */}
        <div
          className="p-8 sm:p-14 lg:p-16 rounded-3xl border backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          style={{
            backgroundColor: isDark ? 'rgba(11, 15, 26, 0.9)' : '#0F172A',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#334155',
            color: '#FFFFFF',
          }}
        >
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bio-grid-bg opacity-15 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Content: Slides from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Eyebrow: Slides down from TOP */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider"
                style={{
                  backgroundColor: `${currentTemplate.palette.primary}20`,
                  border: `1px solid ${currentTemplate.palette.primary}40`,
                  color: currentTemplate.palette.primary,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>COLLABORATE WITH SYNTHETIX BIO</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-[1.15]">
                Accelerate Your Pipeline from Target to IND in{' '}
                <span
                  className="font-serif-italic font-normal text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${currentTemplate.palette.primary}, ${currentTemplate.palette.accent})`,
                  }}
                >
                  14 Months
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
                Partner with our multidisciplinary teams of structural biologists, machine learning researchers, and clinical oncologists to co-develop first-in-class precision therapeutics.
              </p>
            </motion.div>

            {/* Right Action Controls: Slides from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              <button
                id="btn-cta-partner"
                onClick={() => {
                  bioSound.playClick(750);
                  onOpenPartner();
                }}
                className="w-full py-4 px-6 rounded-full font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2.5 shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all"
                style={{
                  backgroundColor: currentTemplate.palette.primary,
                  color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#000000',
                }}
              >
                <span>INITIATE STRATEGIC PARTNERSHIP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-cta-download-whitepaper"
                onClick={handleDownloadWhitepaper}
                className="w-full py-4 px-6 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 border border-slate-700 active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>2026 CLINICAL WHITEPAPER (PDF)</span>
              </button>

              {/* Download Notification Toast */}
              <AnimatePresence>
                {downloadNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Synthetix Bio 2026 Corporate Scientific Whitepaper downloaded.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Newsletter Subscription Dock: Slides up from BOTTOM */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="pt-10 mt-10 border-t border-slate-800 relative z-10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs font-mono text-slate-400">
                  Subscribe to our Quarterly Peer-Reviewed Research Dispatch:
                </p>
                <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                  Direct clinical updates, cryo-EM structures, and algorithm releases.
                </p>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter scientific email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2.5 rounded-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-emerald-500 min-w-[240px]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider shrink-0 transition-all hover:scale-105 shadow-md"
                    style={{
                      backgroundColor: currentTemplate.palette.primary,
                      color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#000000',
                    }}
                  >
                    JOIN DISPATCH
                  </button>
                </form>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! You will receive our next quarterly clinical update.</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
