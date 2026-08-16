import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsRibbon } from './components/MetricsRibbon';
import { InnovationSection } from './components/InnovationSection';
import { HorizontalJourneySection } from './components/HorizontalJourneySection';
import { PipelineSection } from './components/PipelineSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { MolecularLabSection } from './components/MolecularLabSection';
import { PublicationsSection } from './components/PublicationsSection';
import { BioFoundrySection } from './components/BioFoundrySection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';
import { PipelineModal } from './components/PipelineModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { TemplateSwitcher } from './components/TemplateSwitcher';
import { TemplateProvider, useDesignTemplate } from './context/TemplateContext';
import { PipelineAsset } from './types';

gsap.registerPlugin(ScrollTrigger);

function MainAppContent() {
  const { currentTemplate } = useDesignTemplate();
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerAssetCode, setPartnerAssetCode] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<PipelineAsset | null>(null);

  // Initialize Lenis Smooth Scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    // Make lenis globally available for smooth programmatic jumps
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global anchor click handler for ultra-smooth scrolling without browser jumping
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -75,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  const handleOpenPartner = (assetCode = '') => {
    setPartnerAssetCode(assetCode);
    setPartnerModalOpen(true);
  };

  const handleClosePartner = () => {
    setPartnerModalOpen(false);
    setPartnerAssetCode('');
  };

  const handleSelectAsset = (asset: PipelineAsset) => {
    setSelectedAsset(asset);
  };

  const handleCloseAssetModal = () => {
    setSelectedAsset(null);
  };

  const isDark = currentTemplate.mode === 'dark';

  return (
    <div
      className={`min-h-screen antialiased overflow-x-hidden font-sans transition-colors duration-500 selection:bg-emerald-500/20`}
      style={{
        backgroundColor: currentTemplate.palette.canvasBg,
        color: currentTemplate.palette.textColor,
      }}
    >
      {/* Top Ambient Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Primary Sticky Navbar */}
      <Navbar onOpenPartner={() => handleOpenPartner()} />

      <main>
        {/* Hero Section with Interactive 3D BioCanvas Simulation */}
        <Hero onOpenPartner={() => handleOpenPartner()} />

        {/* Real-Time Impact & Computational Stats */}
        <MetricsRibbon />

        {/* Section 1: About & The Multi-Omic Innovation Engine */}
        <InnovationSection />

        {/* Section 2: Interactive Horizontal Scroll Showcase (From Target to IND) */}
        <HorizontalJourneySection />

        {/* Section 3: Clinical & Preclinical Research Pipeline Explorer */}
        <PipelineSection onSelectAsset={handleSelectAsset} />

        {/* Section 4: Interactive Platform Capabilities & Mini-Simulators */}
        <CapabilitiesSection />

        {/* Section 5: In Silico Molecular Workbench Sandbox */}
        <MolecularLabSection onOpenPartner={() => handleOpenPartner()} />

        {/* Section 6: Peer-Reviewed Scientific Publications & Evidence */}
        <PublicationsSection />

        {/* Section 7: Global Robotic Bio-Foundry & Cleanroom Network */}
        <BioFoundrySection />

        {/* Final CTA & Clinical Whitepaper Portal */}
        <CtaSection onOpenPartner={() => handleOpenPartner()} />
      </main>

      {/* Regulatory & Institutional Footer */}
      <Footer />

      {/* Interactive Floating Design Template Switcher Studio */}
      <TemplateSwitcher />

      {/* Interactive Modals */}
      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={handleClosePartner}
        defaultAssetCode={partnerAssetCode}
      />

      <PipelineModal
        asset={selectedAsset}
        onClose={handleCloseAssetModal}
        onOpenPartnerWithAsset={(code) => handleOpenPartner(code)}
      />
    </div>
  );
}

export default function App() {
  return (
    <TemplateProvider>
      <MainAppContent />
    </TemplateProvider>
  );
}
