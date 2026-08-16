import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-1 bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 origin-left shadow-[0_0_12px_rgba(16,185,129,0.8)] will-change-transform"
        style={{ scaleX }}
      />
    </div>
  );
};
