import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dna, Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import { useDesignTemplate } from '../context/TemplateContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface NavbarProps {
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartner }) => {
  const { currentTemplate } = useDesignTemplate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          // Section spy with low overhead
          const sections = ['hero', 'innovation', 'journey', 'pipeline', 'capabilities', 'workbench', 'publications'];
          const scrollPos = window.scrollY + 200;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection((prev) => (prev !== sectionId ? sectionId : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Innovation', href: '#innovation', id: 'innovation' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Pipeline', href: '#pipeline', id: 'pipeline' },
    { label: 'Platform', href: '#capabilities', id: 'capabilities' },
    { label: 'Workbench', href: '#workbench', id: 'workbench' },
    { label: 'Publications', href: '#publications', id: 'publications' },
  ];

  const isDark = currentTemplate.mode === 'dark';

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#070B13]/90 backdrop-blur-xl border-b border-slate-800 py-2.5 shadow-md'
            : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/90 py-2.5 shadow-sm'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group select-none shrink-0"
        >
          <div
            className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl border flex items-center justify-center overflow-hidden shadow-sm transition-colors shrink-0"
            style={{
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <Dna
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-45 transition-transform duration-500"
              style={{ color: currentTemplate.palette.primary }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: `${currentTemplate.palette.primary}20` }}
            />
          </div>
          <div className="shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
              <span
                className="font-display font-bold text-xs sm:text-base lg:text-lg tracking-tight"
                style={{ color: currentTemplate.palette.textColor }}
              >
                SYNTHETIX
              </span>
              <span
                className="text-[8px] sm:text-[9px] font-mono font-bold px-1 sm:px-1.5 py-0.5 rounded border shrink-0"
                style={{
                  backgroundColor: `${currentTemplate.palette.primary}18`,
                  color: currentTemplate.palette.primary,
                  borderColor: `${currentTemplate.palette.primary}35`,
                }}
              >
                BIO
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-wider hidden sm:block opacity-60 whitespace-nowrap">
              PROGRAMMABLE THERAPEUTICS
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-sm transition-colors shrink-0"
          style={{
            backgroundColor: isDark ? 'rgba(13, 20, 36, 0.75)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-2.5 lg:px-3.5 py-1.5 text-[11px] lg:text-xs font-semibold tracking-normal lg:tracking-wide whitespace-nowrap transition-colors duration-200 group flex flex-col items-center justify-center ${
                  isActive
                    ? 'font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  color: isActive
                    ? currentTemplate.palette.primary
                    : currentTemplate.palette.textColor,
                }}
              >
                <span>{link.label}</span>

                {/* Animated Bottom Border Line */}
                <span
                  className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-all duration-300 ease-out origin-center pointer-events-none ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                  style={{
                    backgroundColor: currentTemplate.palette.primary,
                  }}
                />
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Partner CTA */}
          <button
            id="btn-nav-partner"
            onClick={() => {
              onOpenPartner();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full text-[11px] lg:text-xs font-semibold tracking-normal shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 whitespace-nowrap"
            style={{
              backgroundColor: currentTemplate.palette.primary,
              color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF',
            }}
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 sm:p-2 rounded-full border shadow-sm shrink-0 transition-colors"
            style={{
              backgroundColor: isDark ? '#0D1424' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              color: currentTemplate.palette.textColor,
            }}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b px-4 py-6 max-h-[80vh] overflow-y-auto overscroll-contain backdrop-blur-2xl shadow-xl"
            style={{
              backgroundColor: isDark ? '#070B13' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              color: currentTemplate.palette.textColor,
            }}
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="relative group px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between"
                    style={{
                      backgroundColor: isActive ? `${currentTemplate.palette.primary}12` : 'transparent',
                      color: isActive ? currentTemplate.palette.primary : currentTemplate.palette.textColor,
                    }}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`h-[2px] rounded-full transition-all duration-300 origin-right ${
                        isActive
                          ? 'w-6 opacity-100'
                          : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-100'
                      }`}
                      style={{ backgroundColor: currentTemplate.palette.primary }}
                    />
                  </a>
                );
              })}

              <div className="pt-3 border-t" style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPartner();
                  }}
                  className="w-full py-3 rounded-full font-semibold text-xs tracking-normal flex items-center justify-center gap-2 shadow-sm"
                  style={{
                    backgroundColor: currentTemplate.palette.primary,
                    color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF',
                  }}
                >
                  <span>Partner With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

