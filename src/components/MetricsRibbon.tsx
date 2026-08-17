import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TrendingUp, Award, Cpu, ShieldCheck, Zap, ArrowUpRight, Activity } from 'lucide-react';
import { IMPACT_STATS } from '../data/biotechData';
import { AnimatedCounter } from './AnimatedCounter';
import { useDesignTemplate } from '../context/TemplateContext';

export const MetricsRibbon: React.FC = () => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const tickerX1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const tickerX2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Zap className="w-4 h-4" style={{ color: currentTemplate.palette.primary }} />;
      case 1:
        return <Award className="w-4 h-4" style={{ color: currentTemplate.palette.accent }} />;
      case 2:
        return <ShieldCheck className="w-4 h-4" style={{ color: currentTemplate.palette.primary }} />;
      case 3:
        return <TrendingUp className="w-4 h-4" style={{ color: '#F59E0B' }} />;
      case 4:
        return <Cpu className="w-4 h-4" style={{ color: '#8B5CF6' }} />;
      default:
        return <Zap className="w-4 h-4" style={{ color: currentTemplate.palette.primary }} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 border-y overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#080B12' : '#F4F5F0',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Background Optical Grid and Ambient Glows */}
      <div className="absolute inset-0 bio-grid-bg opacity-25 pointer-events-none" />
      
      {/* Parallax Kinetic Ticker Lines */}
      <div className="absolute top-2 inset-x-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          style={{ x: tickerX1 }}
          className="whitespace-nowrap font-mono text-[10px] tracking-widest flex items-center gap-8"
        >
          <span>// REAL-TIME TRANSLATIONAL METRICS</span>
          <span>•</span>
          <span>HIGH-THROUGHPUT CRYO-EM DOCKING</span>
          <span>•</span>
          <span>EPIGENOMIC METHYLATION FIDELITY: 99.98%</span>
          <span>•</span>
          <span>SYNTHESIS LATENCY: 72H</span>
          <span>•</span>
          <span>MASSIVE PARALLEL SPR KINETICS</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header: Slides from TOP */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider mb-1" style={{ color: currentTemplate.palette.primary }}>
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE COMPUTATIONAL PERFORMANCE TELEMETRY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight" style={{ color: currentTemplate.palette.textColor }}>
              Deterministic Benchmarks & Preclinical Acceleration
            </h3>
          </div>
          <div className="text-xs font-mono opacity-60 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTemplate.palette.primary }} />
            <span>CONTINUOUS CLUSTER SYNCHRONIZED</span>
          </div>
        </motion.div>

        {/* Continuous Unbroken Data Monolith (No cards - sleek horizontal stream) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x rounded-3xl backdrop-blur-md border overflow-hidden shadow-sm"
          style={{
            backgroundColor: isDark ? 'rgba(13, 20, 36, 0.6)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            divideColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          }}
        >
          {IMPACT_STATS.map((stat, idx) => {
            // Multi-directional ingress: Alternating Left & Right & Bottom
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={stat.id}
                initial={{
                  opacity: 0,
                  x: idx === 0 ? -60 : idx === 4 ? 60 : 0,
                  y: idx !== 0 && idx !== 4 ? (isEven ? -40 : 40) : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="p-2.5 rounded-xl border transition-colors"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {getIcon(idx)}
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${currentTemplate.palette.primary}15`,
                        borderColor: `${currentTemplate.palette.primary}30`,
                        color: currentTemplate.palette.primary,
                      }}
                    >
                      {stat.change}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 my-1">
                    <AnimatedCounter
                      value={stat.numericVal}
                      decimals={stat.numericVal % 1 !== 0 ? 1 : 0}
                      suffix={stat.suffix}
                      className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <h4 className="text-sm font-heading font-semibold mt-2 leading-snug" style={{ color: currentTemplate.palette.textColor }}>
                    {stat.label}
                  </h4>
                  <p className="text-xs mt-1.5 leading-relaxed opacity-70 font-sans" style={{ color: currentTemplate.palette.mutedText }}>
                    {stat.sublabel}
                  </p>
                </div>

                {/* Real-time Kinetic Laser Gauge */}
                <div className="mt-6 pt-3 border-t" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}>
                  <div className="flex justify-between text-[10px] font-mono opacity-60 mb-1">
                    <span>INDEX RATE</span>
                    <span>{Math.round(35 + idx * 16)}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, 35 + idx * 16)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + idx * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${currentTemplate.palette.primary}, ${currentTemplate.palette.accent})`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Parallax Stream */}
      <div className="absolute bottom-2 inset-x-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          style={{ x: tickerX2 }}
          className="whitespace-nowrap font-mono text-[10px] tracking-widest flex items-center gap-8"
        >
          <span>PDB CONFORMATIONS: 8G12, 7K8Z, 6VXX</span>
          <span>•</span>
          <span>QM/MM FREE ENERGY: -14.2 KCAL/MOL</span>
          <span>•</span>
          <span>ON-TARGET RESIDUE ENGAGEMENT: 100%</span>
          <span>•</span>
          <span>TX-TL PROTEIN SYNTHESIS: ACTIVE</span>
        </motion.div>
      </div>
    </section>
  );
};
