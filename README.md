# Synthetix Therapeutics // In Silico Bio-Engineering Platform

A high-performance, interactive biotechnology platform showcase built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Lenis Smooth Scroll**, **Motion (Framer Motion)**, and **GSAP ScrollTrigger**.

---

## 🚀 Local Setup & Installation

Follow these instructions to run the project locally on your development machine.

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `bun`

### 1. Clone or Extract the Repository
```bash
# If cloned via Git:
git clone <repository-url>
cd <repository-directory>

# If downloaded as a ZIP:
# Extract the archive, then open your terminal in the extracted folder.
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`**. The dev server binds to `0.0.0.0:3000` with hot-reloading.

### 4. Build for Production
To generate a production-ready optimized build:
```bash
npm run build
```
To preview the production bundle locally:
```bash
npm run preview
```

### 5. Code Quality & Type Checking
To validate TypeScript types across the codebase:
```bash
npm run lint
```

---

## 🎨 Architectural Overview & Design System

The application is structured into modular domain components featuring a live design template switcher (e.g. *Obsidian Cyber*, *Clinical Light*, *Deep Biotech*, *Warm Quartz*):

- **Hero & BioCanvas (`/src/components/Hero.tsx` & `BioCanvas.tsx`)**: Real-time 3D procedural molecular rendering (DNA double helix, crystal lattice, capsid, receptor docking) with hardware-accelerated Canvas operations and intersection-based performance throttling.
- **Metrics Ribbon (`/src/components/MetricsRibbon.tsx`)**: High-throughput computational telemetry and discovery latency benchmarks.
- **Innovation Engine (`/src/components/InnovationSection.tsx`)**: Deep dive into de novo diffusion, epigenetic writing, and spatial transcriptomics.
- **Translational Journey (`/src/components/HorizontalJourneySection.tsx`)**: Interactive Portfolio Tabs detailing the 6-phase sprint from target identification to First-in-Human IND clearance.
- **Therapeutic Pipeline (`/src/components/PipelineSection.tsx`)**: Preclinical and clinical candidate portfolio tracker with stage indicators and filtering.
- **In Silico Molecular Workbench (`/src/components/MolecularLabSection.tsx`)**: Interactive kinetic docking sandbox and mutant target simulation.
- **Publications & Evidence (`/src/components/PublicationsSection.tsx`)**: Peer-reviewed dossiers and crystallography validation charts.

---

## 🌊 Transitions & Motion Architecture Guide

The application incorporates a multi-tiered animation and transition system designed for high visual fidelity and fluid frame-rate stability.

### 1. Lenis Inertia & Momentum Smooth Scrolling
- **Implementation**: Managed in `App.tsx` and configured via `src/index.css`.
- **Easing Model**: Exponential decay function `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` calibrated to `duration: 1.15s`.
- **Synchronization**: Tied directly into GSAP's `ScrollTrigger.update` via `requestAnimationFrame` loop, preventing micro-stuttering and scroll tearing.
- **Anchor Interception**: In-page anchor tags (`#journey`, `#pipeline`, `#workbench`, etc.) are intercepted with smooth programmatic offsets (`offset: -75px`) instead of abrupt browser jumping.

### 2. Framer Motion (`motion/react`) Transition Paradigms
- **Viewport-Triggered Ingress (`whileInView`)**:
  - Elements gracefully enter view using cubic bezier easing `[0.16, 1, 0.3, 1]` (custom gentle deceleration curve).
  - Offsets (`margin: "-40px"`) ensure elements only animate when meaningfully visible.
- **Shared Layout Transitions (`layoutId`)**:
  - **Portfolio Stage Tabs**: Uses `layoutId="activePortfolioTabIndicator"` with a spring animation (`stiffness: 450, damping: 35`) for magnetic pill movement across active tabs.
  - **Category Pills & Filters**: Fluid width and background interpolation without layout shift.
- **Presence & PopLayout (`AnimatePresence mode="wait"` & `mode="popLayout"`)**:
  - Smooth exit and entry sequences for dynamic tabs, expandable technical spec drawers, and modal dialogs.
  - Modal backdrops fade in at `opacity: 0 -> 1` while dialog containers scale up from `scale: 0.95, y: 20` to `scale: 1, y: 0`.

### 3. Kinetic Background Parallax & Watermarks
- **Hook**: `useScroll` with `useTransform`.
- **Optimization**: Background typographic tracks (e.g. *"QUANTUM DE NOVO PROTEIN DIFFUSION"*) utilize `will-change-transform` to delegate positioning to the GPU compositor layer, ensuring zero impact on main-thread scrolling.

### 4. Hardware-Accelerated 3D BioCanvas Loop
- **Optimization**: Bound to `requestAnimationFrame` with delta-time normalization.
- **Viewport Throttling**: Integrated with `IntersectionObserver` to automatically sleep the canvas draw cycles when scrolled out of view, preserving GPU memory and battery.

### 5. Top Scroll Progress Indicator (`ScrollProgressBar.tsx`)
- Driven by `useScroll` and `useSpring` with `stiffness: 120` and `damping: 30` for smooth gradient bar tracking without triggering React component re-renders.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies |
|---|---|
| **Framework** | React 19, TypeScript 5.8 |
| **Styling** | Tailwind CSS v4, PostCSS, Lucide Icons |
| **Motion & Scroll** | Lenis v1.3, Framer Motion (`motion`), GSAP ScrollTrigger |
| **Build Tooling** | Vite 6, TSX, ESBuild |
| **Effects & Audio** | HTML5 Web Audio API Synthesizer (`bioSound`), Canvas Confetti |

---

## 📄 License
Synthetix Bio-Engineering Platform — Internal & Partner Distribution.
