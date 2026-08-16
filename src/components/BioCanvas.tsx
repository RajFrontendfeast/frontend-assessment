import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Zap, Sparkles, Activity, Eye } from 'lucide-react';
import { bioSound } from '../utils/sound';
import { useDesignTemplate } from '../context/TemplateContext';

type SimulationMode = 'dna-helix' | 'receptor-docking' | 'nanoparticle';

interface BioCanvasProps {
  initialMode?: SimulationMode;
  interactive?: boolean;
}

export const BioCanvas: React.FC<BioCanvasProps> = ({
  initialMode = 'dna-helix',
  interactive = true,
}) => {
  const { currentTemplate } = useDesignTemplate();
  const isDark = currentTemplate.mode === 'dark';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<SimulationMode>(initialMode);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [mutationCount, setMutationCount] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const [energyScore, setEnergyScore] = useState<number>(-42.8);

  // Rotation angles for 3D projection
  const rotRef = useRef<{ x: number; y: number; z: number }>({ x: 0.2, y: 0, z: 0 });
  const mouseRef = useRef<{ isDown: boolean; lastX: number; lastY: number; targetRotY: number; targetRotX: number }>({
    isDown: false,
    lastX: 0,
    lastY: 0,
    targetRotY: 0,
    targetRotX: 0.2,
  });

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  // Trigger mutation / pulse effect
  const handleTriggerMutation = useCallback(() => {
    setIsMutating(true);
    setMutationCount((prev) => prev + 1);
    setEnergyScore((prev) => Number((prev + (Math.random() * 4 - 2)).toFixed(2)));
    bioSound.playChime(780, 0.2);
    setTimeout(() => setIsMutating(false), 1200);
  }, []);

  const handleResetConformation = useCallback(() => {
    rotRef.current = { x: 0.2, y: 0, z: 0 };
    mouseRef.current.targetRotX = 0.2;
    mouseRef.current.targetRotY = 0;
    setEnergyScore(-42.8);
    bioSound.playClick(440);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Particle nodes for receptor docking or nanoparticle
    const numLigands = 36;
    const ligands = Array.from({ length: numLigands }, (_, i) => {
      const theta = (i / numLigands) * Math.PI * 2;
      const phi = Math.acos(2 * (i / numLigands) - 1);
      const r = 85 + (i % 4) * 22;
      return {
        baseX: r * Math.sin(phi) * Math.cos(theta),
        baseY: r * Math.sin(phi) * Math.sin(theta),
        baseZ: r * Math.cos(phi),
        x: 0,
        y: 0,
        z: 0,
        radius: 2.5 + (i % 3) * 1.5,
        color: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#06B6D4' : '#8B5CF6',
        speedOffset: i * 0.15,
        bound: false,
      };
    });

    // 3D projection helper
    const project = (x: number, y: number, z: number, fov = 350) => {
      // Rotate around X
      const radX = rotRef.current.x;
      const y1 = y * Math.cos(radX) - z * Math.sin(radX);
      const z1 = y * Math.sin(radX) + z * Math.cos(radX);

      // Rotate around Y
      const radY = rotRef.current.y;
      const x2 = x * Math.cos(radY) + z1 * Math.sin(radY);
      const z2 = -x * Math.sin(radY) + z1 * Math.cos(radY);

      // Perspective projection
      const distance = 420;
      const scale = fov / (distance + z2);
      const projX = width / 2 + x2 * scale;
      const projY = height / 2 + y1 * scale;

      return { x: projX, y: projY, scale, zIndex: z2 };
    };

    let animationTime = 0;
    let isVisible = true;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animFrameRef.current) {
          lastTimeRef.current = performance.now();
          animFrameRef.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    const render = (time: number) => {
      if (!isVisible) {
        animFrameRef.current = null;
        return;
      }

      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      animationTime += delta * (isRotating ? rotationSpeed : 0.2);

      // Smooth mouse rotation damping
      rotRef.current.y += (mouseRef.current.targetRotY - rotRef.current.y) * 0.08;
      rotRef.current.x += (mouseRef.current.targetRotX - rotRef.current.x) * 0.08;

      if (isRotating) {
        mouseRef.current.targetRotY += 0.012 * rotationSpeed;
      }

      // Clear with subtle trail
      ctx.clearRect(0, 0, width, height);

      // Background subtle circular grid / energy rings
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.38, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.restore();

      // Render based on selected biotech mode
      if (mode === 'dna-helix') {
        renderDNAHelix(ctx, width, height, animationTime, project, isMutating);
      } else if (mode === 'receptor-docking') {
        renderReceptorDocking(ctx, width, height, animationTime, project, ligands, isMutating);
      } else {
        renderNanoparticle(ctx, width, height, animationTime, project, isMutating);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [mode, isRotating, rotationSpeed, isMutating]);

  // DNA Double Helix 3D Simulation
  const renderDNAHelix = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    t: number,
    project: (x: number, y: number, z: number) => { x: number; y: number; scale: number; zIndex: number },
    mutating: boolean
  ) => {
    const numPairs = 24;
    const helixRadius = 68;
    const helixHeight = Math.min(height * 0.72, 340);
    const strandPairs: {
      p1: { x: number; y: number; scale: number; zIndex: number };
      p2: { x: number; y: number; scale: number; zIndex: number };
      baseColor1: string;
      baseColor2: string;
      basePairName: string;
      yIndex: number;
    }[] = [];

    const basePairs = [
      { c1: '#10B981', c2: '#06B6D4', name: 'A-T' },
      { c1: '#8B5CF6', c2: '#3B82F6', name: 'G-C' },
      { c1: '#06B6D4', c2: '#10B981', name: 'T-A' },
      { c1: '#3B82F6', c2: '#8B5CF6', name: 'C-G' },
    ];

    for (let i = 0; i < numPairs; i++) {
      const y = ((i - numPairs / 2) / numPairs) * helixHeight;
      const angle = (i / numPairs) * Math.PI * 3.5 + t * 0.9;
      const mutateWiggle = mutating ? Math.sin(i * 0.8 + t * 5) * 14 : 0;

      const x1 = Math.cos(angle) * (helixRadius + mutateWiggle);
      const z1 = Math.sin(angle) * (helixRadius + mutateWiggle);

      const x2 = Math.cos(angle + Math.PI) * (helixRadius + mutateWiggle);
      const z2 = Math.sin(angle + Math.PI) * (helixRadius + mutateWiggle);

      const p1 = project(x1, y, z1);
      const p2 = project(x2, y, z2);

      const pairInfo = basePairs[i % basePairs.length];
      strandPairs.push({
        p1,
        p2,
        baseColor1: mutating && i % 3 === 0 ? '#F59E0B' : pairInfo.c1,
        baseColor2: mutating && i % 3 === 0 ? '#EC4899' : pairInfo.c2,
        basePairName: mutating && i % 3 === 0 ? 'SYN-EDIT' : pairInfo.name,
        yIndex: i,
      });
    }

    // Sort by average depth for correct 3D z-buffering
    strandPairs.sort((a, b) => (b.p1.zIndex + b.p2.zIndex) / 2 - (a.p1.zIndex + a.p2.zIndex) / 2);

    // Draw connecting rungs (hydrogen bonds)
    strandPairs.forEach((pair) => {
      const avgScale = (pair.p1.scale + pair.p2.scale) / 2;
      const alpha = Math.max(0.25, Math.min(0.95, (pair.p1.zIndex + pair.p2.zIndex + 200) / 400));

      // Hydrogen bond dotted rungs
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pair.p1.x, pair.p1.y);
      ctx.lineTo(pair.p2.x, pair.p2.y);
      ctx.strokeStyle = `rgba(15, 23, 42, ${alpha * 0.22})`;
      ctx.lineWidth = 1.5 * avgScale;
      ctx.setLineDash([3 * avgScale, 3 * avgScale]);
      ctx.stroke();
      ctx.restore();

      // Middle nucleotide base intersection indicator
      const midX = (pair.p1.x + pair.p2.x) / 2;
      const midY = (pair.p1.y + pair.p2.y) / 2;
      ctx.beginPath();
      ctx.arc(midX, midY, 2.5 * avgScale, 0, Math.PI * 2);
      ctx.fillStyle = mutating ? 'rgba(245, 158, 11, 0.9)' : 'rgba(15, 23, 42, 0.4)';
      ctx.fill();

      // Strand 1 Backbone Atom (Sugar-Phosphate)
      ctx.save();
      ctx.beginPath();
      ctx.arc(pair.p1.x, pair.p1.y, 5.5 * pair.p1.scale, 0, Math.PI * 2);
      ctx.fillStyle = pair.baseColor1;
      ctx.shadowColor = pair.baseColor1;
      ctx.shadowBlur = 8 * pair.p1.scale;
      ctx.fill();

      // Glow halo
      ctx.beginPath();
      ctx.arc(pair.p1.x, pair.p1.y, 8.5 * pair.p1.scale, 0, Math.PI * 2);
      ctx.fillStyle = `${pair.baseColor1}25`;
      ctx.fill();
      ctx.restore();

      // Strand 2 Backbone Atom
      ctx.save();
      ctx.beginPath();
      ctx.arc(pair.p2.x, pair.p2.y, 5.5 * pair.p2.scale, 0, Math.PI * 2);
      ctx.fillStyle = pair.baseColor2;
      ctx.shadowColor = pair.baseColor2;
      ctx.shadowBlur = 8 * pair.p2.scale;
      ctx.fill();

      // Glow halo
      ctx.beginPath();
      ctx.arc(pair.p2.x, pair.p2.y, 8.5 * pair.p2.scale, 0, Math.PI * 2);
      ctx.fillStyle = `${pair.baseColor2}25`;
      ctx.fill();
      ctx.restore();
    });
  };

  // Receptor Ligand Docking Simulation
  const renderReceptorDocking = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    t: number,
    project: (x: number, y: number, z: number) => { x: number; y: number; scale: number; zIndex: number },
    ligands: any[],
    mutating: boolean
  ) => {
    // Draw central target protein pocket (macro-molecule lattice)
    const centralP = project(0, 0, 0);

    ctx.save();
    // Central glowing binding pocket
    const grad = ctx.createRadialGradient(
      centralP.x,
      centralP.y,
      10 * centralP.scale,
      centralP.x,
      centralP.y,
      65 * centralP.scale
    );
    grad.addColorStop(0, mutating ? 'rgba(236, 72, 153, 0.4)' : 'rgba(16, 185, 129, 0.35)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.beginPath();
    ctx.arc(centralP.x, centralP.y, 65 * centralP.scale, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Central geometric receptor lattice
    const coreNodes = 12;
    const projectedCore: any[] = [];
    for (let i = 0; i < coreNodes; i++) {
      const th = (i / coreNodes) * Math.PI * 2;
      const ph = (i % 2 === 0 ? 0.3 : -0.3) * Math.PI;
      const r = 38 + Math.sin(i * 1.5 + t) * 4;
      const cx = r * Math.cos(th) * Math.cos(ph);
      const cy = r * Math.sin(th) * Math.cos(ph);
      const cz = r * Math.sin(ph);
      projectedCore.push(project(cx, cy, cz));
    }

    // Connect core lattice lines
    ctx.beginPath();
    for (let i = 0; i < projectedCore.length; i++) {
      const next = projectedCore[(i + 1) % projectedCore.length];
      ctx.moveTo(projectedCore[i].x, projectedCore[i].y);
      ctx.lineTo(next.x, next.y);
      if (i % 2 === 0) {
        ctx.lineTo(centralP.x, centralP.y);
      }
    }
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    projectedCore.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.5 * p.scale, 0, Math.PI * 2);
      ctx.fillStyle = idx % 2 === 0 ? '#10B981' : '#06B6D4';
      ctx.fill();
    });
    ctx.restore();

    // Dynamic ligand docking orbits
    ligands.forEach((lig, i) => {
      const wobble = Math.sin(t * 1.5 + lig.speedOffset) * 15;
      const dockDist = mutating ? 0.35 : 0.75 + Math.sin(t + i) * 0.2;
      const curX = lig.baseX * dockDist + wobble;
      const curY = lig.baseY * dockDist;
      const curZ = lig.baseZ * dockDist;

      const p = project(curX, curY, curZ);

      // Affinity electrostatic force line to center
      if (i % 4 === 0) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(centralP.x, centralP.y);
        ctx.strokeStyle = mutating ? 'rgba(236, 72, 153, 0.45)' : 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, lig.radius * p.scale, 0, Math.PI * 2);
      ctx.fillStyle = mutating ? '#EC4899' : lig.color;
      ctx.shadowColor = mutating ? '#EC4899' : lig.color;
      ctx.shadowBlur = 8 * p.scale;
      ctx.fill();
      ctx.restore();
    });
  };

  // Cellular Nanoparticle Lipid Bilayer Simulation
  const renderNanoparticle = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    t: number,
    project: (x: number, y: number, z: number) => { x: number; y: number; scale: number; zIndex: number },
    mutating: boolean
  ) => {
    const center = project(0, 0, 0);
    const radius = 80;
    const numLipids = 48;

    // Lipid outer bilayer membrane particles
    const lipidParticles: any[] = [];
    for (let i = 0; i < numLipids; i++) {
      const th = (i / numLipids) * Math.PI * 2;
      const ph = Math.sin(i * 1.8 + t * 0.6) * 0.7;
      const r = radius + (mutating ? Math.sin(i * 2 + t * 6) * 12 : Math.sin(i + t) * 3);

      const lx = r * Math.cos(th) * Math.cos(ph);
      const ly = r * Math.sin(th) * Math.cos(ph);
      const lz = r * Math.sin(ph);

      lipidParticles.push({
        ...project(lx, ly, lz),
        isHomingPeptide: i % 6 === 0,
      });
    }

    lipidParticles.sort((a, b) => b.zIndex - a.zIndex);

    // Inner RNA payload strand
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const angle = i * 0.6 + t * 2;
      const ir = 24 + Math.sin(angle * 3) * 10;
      const px = Math.cos(angle) * ir;
      const py = Math.sin(angle) * ir;
      const p = project(px, py, Math.sin(angle) * 15);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = mutating ? '#F59E0B' : '#8B5CF6';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // Render outer lipid heads & targeting peptides
    lipidParticles.forEach((lp) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(lp.x, lp.y, (lp.isHomingPeptide ? 5.5 : 3) * lp.scale, 0, Math.PI * 2);
      ctx.fillStyle = lp.isHomingPeptide ? (mutating ? '#F43F5E' : '#10B981') : '#06B6D4';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 6 * lp.scale;
      ctx.fill();

      // If homing peptide, draw receptor antenna spike
      if (lp.isHomingPeptide) {
        ctx.beginPath();
        ctx.moveTo(lp.x, lp.y);
        ctx.lineTo(lp.x + (lp.x - center.x) * 0.25, lp.y + (lp.y - center.y) * 0.25);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 1.5 * lp.scale;
        ctx.stroke();
      }
      ctx.restore();
    });
  };

  // Mouse drag & interactive orbit handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    mouseRef.current.isDown = true;
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    if (mouseRef.current.isDown) {
      const deltaX = e.clientX - mouseRef.current.lastX;
      const deltaY = e.clientY - mouseRef.current.lastY;
      mouseRef.current.targetRotY += deltaX * 0.008;
      mouseRef.current.targetRotX += deltaY * 0.008;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    } else {
      // Subtle parallax on hover
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        mouseRef.current.targetRotY += normX * 0.003;
        mouseRef.current.targetRotX = 0.2 + normY * 0.2;
      }
    }
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  return (
    <div
      id="biocanvas-container"
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden border shadow-xl flex flex-col items-center justify-center select-none group transition-all duration-500"
      style={{
        backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        boxShadow: `0 20px 50px -10px ${currentTemplate.palette.primaryGlow}`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 bg-radial via-transparent to-transparent pointer-events-none opacity-40"
        style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${currentTemplate.palette.primaryGlow} 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ backgroundColor: currentTemplate.palette.accent }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ backgroundColor: currentTemplate.palette.primary }}
      />

      {/* Main HTML5 Canvas */}
      <canvas
        id="biocanvas-render-surface"
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Mode Selector Pill Bar */}
      <div
        className="absolute top-4 left-4 sm:left-6 flex flex-wrap items-center gap-1.5 p-1 rounded-2xl backdrop-blur-md border shadow-sm z-10"
        style={{
          backgroundColor: isDark ? 'rgba(13, 20, 36, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        }}
      >
        <button
          id="btn-mode-dna"
          onClick={() => {
            setMode('dna-helix');
            bioSound.playClick(600);
          }}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
            mode === 'dna-helix'
              ? 'text-white shadow-sm font-bold'
              : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          style={{
            backgroundColor: mode === 'dna-helix' ? currentTemplate.palette.primary : 'transparent',
            color: mode === 'dna-helix' ? (isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF') : currentTemplate.palette.textColor,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>DNA Helix</span>
        </button>

        <button
          id="btn-mode-docking"
          onClick={() => {
            setMode('receptor-docking');
            bioSound.playClick(700);
          }}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
            mode === 'receptor-docking'
              ? 'text-white shadow-sm font-bold'
              : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          style={{
            backgroundColor: mode === 'receptor-docking' ? currentTemplate.palette.accent : 'transparent',
            color: mode === 'receptor-docking' ? '#FFFFFF' : currentTemplate.palette.textColor,
          }}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Ligand Docking</span>
        </button>

        <button
          id="btn-mode-nanoparticle"
          onClick={() => {
            setMode('nanoparticle');
            bioSound.playClick(800);
          }}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
            mode === 'nanoparticle'
              ? 'bg-violet-600 text-white shadow-sm font-bold'
              : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          style={{
            backgroundColor: mode === 'nanoparticle' ? '#8B5CF6' : 'transparent',
            color: mode === 'nanoparticle' ? '#FFFFFF' : currentTemplate.palette.textColor,
          }}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>LNP Carrier</span>
        </button>
      </div>

      {/* Real-time Telemetry HUD (Top Right) */}
      <div
        className="absolute top-4 right-4 sm:right-6 hidden sm:flex flex-col items-end gap-1 text-[11px] font-mono backdrop-blur-md px-3.5 py-2 rounded-2xl border shadow-sm pointer-events-none z-10"
        style={{
          backgroundColor: isDark ? 'rgba(13, 20, 36, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          color: currentTemplate.palette.textColor,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: currentTemplate.palette.primary }}
          />
          <span className="font-semibold">SYNTHESIS ENGINE</span>
          <span className="font-bold" style={{ color: currentTemplate.palette.primary }}>{fps} FPS</span>
        </div>
        <div className="text-[10px] opacity-75">
          Free Energy: <span className="font-bold" style={{ color: currentTemplate.palette.accent }}>{energyScore} kcal/mol</span>
        </div>
        <div className="text-[10px] opacity-75">
          Conformation: <span className="font-bold" style={{ color: currentTemplate.palette.primary }}>0.74 Å RMSD</span>
        </div>
      </div>

      {/* Interactive Action Controls (Bottom Bar) */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between gap-2 z-10 pointer-events-auto">
        <div className="flex items-center gap-2">
          <button
            id="btn-bio-mutate"
            onClick={handleTriggerMutation}
            disabled={isMutating}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 shadow-sm border ${
              isMutating
                ? 'scale-105 animate-pulse'
                : 'hover:scale-[1.02]'
            }`}
            style={{
              backgroundColor: isMutating
                ? '#FEF3C7'
                : isDark ? '#0D1424' : '#FFFFFF',
              borderColor: isMutating ? '#F59E0B' : currentTemplate.palette.primary,
              color: isMutating ? '#B45309' : currentTemplate.palette.primary,
            }}
          >
            <Zap className={`w-3.5 h-3.5 ${isMutating ? 'text-amber-500 animate-spin' : ''}`} style={{ color: isMutating ? '#F59E0B' : currentTemplate.palette.primary }} />
            <span>{isMutating ? 'INDUCING SPLICE...' : 'INDUCE MUTATION'}</span>
            {mutationCount > 0 && (
              <span
                className="ml-1 px-1.5 py-0.2 rounded text-[10px]"
                style={{ backgroundColor: `${currentTemplate.palette.primary}20`, color: currentTemplate.palette.primary }}
              >
                +{mutationCount}
              </span>
            )}
          </button>

          <button
            id="btn-bio-reset"
            onClick={handleResetConformation}
            title="Reset 3D Camera Angles"
            className="p-2 rounded-xl border transition-colors shadow-sm"
            style={{
              backgroundColor: isDark ? '#0D1424' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              color: currentTemplate.palette.textColor,
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          className="flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-xl border text-xs font-mono shadow-sm"
          style={{
            backgroundColor: isDark ? 'rgba(13, 20, 36, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            color: currentTemplate.palette.textColor,
          }}
        >
          <button
            id="btn-bio-toggle-rot"
            onClick={() => {
              setIsRotating(!isRotating);
              bioSound.playClick(500);
            }}
            className="flex items-center gap-1 font-medium"
          >
            <Play
              className="w-3 h-3"
              style={{
                color: isRotating ? currentTemplate.palette.primary : currentTemplate.palette.mutedText,
                fill: isRotating ? currentTemplate.palette.primary : 'none',
              }}
            />
            <span className="text-[11px]">{isRotating ? 'Spin' : 'Pause'}</span>
          </button>

          <div className="h-3 w-px mx-1" style={{ backgroundColor: isDark ? '#1E293B' : '#E2E8F0' }} />

          <button
            id="btn-bio-speed"
            onClick={() => {
              setRotationSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1));
              bioSound.playClick(650);
            }}
            className="text-[11px] transition-colors font-bold"
            style={{ color: currentTemplate.palette.accent }}
          >
            {rotationSpeed}x
          </button>
        </div>
      </div>
    </div>
  );
};
