# SYNTHETIX BIO — Computational Biotechnology & Programmable Therapeutics Platform

SYNTHETIX BIO is a clinical-stage biotechnology web application engineering generative de novo proteins, zero-break epigenetic therapeutics, and allogeneic cellular architectures with an interactive in-silico workbench, translational clinical pipeline, robotic bio-foundry telemetry, and multi-directional kinetic layout transitions.

---

## Quick Start & Local Setup Instructions

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm** (or **pnpm** / **yarn**)

### 1. Clone or Download the Project
```bash
# Extract the downloaded archive or clone the repository
cd synthetix-bio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port indicated in your console output).

### 4. Build for Production
```bash
npm run build
```
The compiled static assets and server output will be created inside the `dist/` directory.

---

## Architectural & Transition Overview

This application delivers a high-performance, immersive scientific experience combining fluid physics-based kinetic animations, scroll synchronization, and sound design.

### 1. Motion & Kinetic Transitions (`motion/react`)
- **Multi-Plane Scroll Parallax**: Background kinetic typography watermarks track with scroll velocity across inverted axes (`[-120px, 120px]`), generating optical depth without layout shifting.
- **Directional Slide-in Orchestration**:
  - Section headers descend dynamically (`initial={{ opacity: 0, y: -45 }}`).
  - Controls, search inputs, and filters arrive from opposing sides (`x: -60` / `x: 60`).
  - Interactive grid elements and pipeline assets alternate entry vectors with staggered delays (`idx * 0.06s`) using custom cubic bezier curves (`[0.16, 1, 0.3, 1]`).
- **Interactive Tab & Modal State Morphing**: Smooth layout state transitions via `AnimatePresence` and `layout` props, preventing abrupt UI snapping.

### 2. Smooth Scrolling & Modal Scroll Lock (`Lenis`)
- **Lenis Smooth Scroll Engine**: Normalizes wheel and touch physics across desktop and mobile devices.
- **Body Scroll & Modal Isolation (`useBodyScrollLock`)**: When modals (Dossier detail modal, Partner proposal modal) or mobile drawer menus are opened, background document scrolling is locked, and `data-lenis-prevent` is applied to ensure touch and wheel gestures remain inside the overlay.

### 3. Responsive Mobile Architecture (Down to 320px)
- **Universal Mobile Padding**: All major sections standardize to `py-12 sm:py-24 lg:py-32` and `px-3 sm:px-6 lg:px-8` for uniform rhythm on mobile devices.
- **Horizontal Scrollable Tab Ribbons**: Complex desktop dials and multi-column tabs (in Platform Capabilities, Bio-Foundry, Innovation Pillars, and Research Publications) dynamically adapt on mobile screens into horizontally swipeable, touch-friendly pill ribbons with `overflow-x-auto`, `no-scrollbar`, and `whitespace-nowrap`.
- **Responsive Navigation**: Brand typography, sound toggles, template switcher badges, and mobile hamburger controls adapt gracefully without wrapping or clipping even on 320px viewport widths.

### 4. Web Audio Synthesizer (`Web Audio API`)
- Zero external audio assets required. All sonic interactions (button clicks, mode changes, simulation runs) are generated in real-time using custom sine/triangle oscillator waves with exponential gain decays.

### 5. Multi-Theme Dynamic Palette Engine
- Supports multiple distinct scientific visual themes (Obsidian Cyber, Clinical Emerald, Deep Atlantic, Clean Bio-White) with live CSS color space adjustments and high contrast legibility.
