import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dna, Menu, X, ArrowUpRight, Cpu, Sparkles, Palette } from 'lucide-react';
import { useDesignTemplate } from '../context/TemplateContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface NavbarProps {
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartner }) => {
  const { currentTemplate, currentTemplateId, setTemplate, templates } = useDesignTemplate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between gap-1 sm:gap-4">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-1.5 sm:gap-3 group select-none min-w-0 shrink"
        >
          <div
            className="relative w-7 h-7 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center overflow-hidden shadow-sm transition-colors shrink-0"
            style={{
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <Dna
              className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-500"
              style={{ color: currentTemplate.palette.primary }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: `${currentTemplate.palette.primary}20` }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span
                className="font-display font-bold text-xs sm:text-xl tracking-tight truncate"
                style={{ color: currentTemplate.palette.textColor }}
              >
                SYNTHETIX
              </span>
              <span
                className="text-[8px] sm:text-[10px] font-mono font-bold px-1 sm:px-1.5 py-0.5 rounded border shrink-0"
                style={{
                  backgroundColor: `${currentTemplate.palette.primary}18`,
                  color: currentTemplate.palette.primary,
                  borderColor: `${currentTemplate.palette.primary}35`,
                }}
              >
                BIO
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider hidden sm:block opacity-60">
              PROGRAMMABLE THERAPEUTICS
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-full border backdrop-blur-md shadow-sm transition-colors"
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'shadow-sm font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive
                    ? currentTemplate.palette.primary
                    : 'transparent',
                  color: isActive
                    ? '#FFFFFF'
                    : currentTemplate.palette.textColor,
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Template Switcher Dropdown in Nav */}
          <div className="relative">
            <button
              id="btn-nav-template-toggle"
              onClick={() => {
                setTemplateMenuOpen(!templateMenuOpen);
              }}
              title="Change UI Design Template"
              className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-sm"
              style={{
                backgroundColor: isDark ? '#0D1424' : '#FFFFFF',
                borderColor: `${currentTemplate.palette.primary}40`,
                color: currentTemplate.palette.textColor,
              }}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: currentTemplate.palette.primary }} />
              <span className="hidden xl:inline text-[11px]">TEMPLATE:</span>
              <span className="hidden sm:inline text-[11px]" style={{ color: currentTemplate.palette.primary }}>
                {currentTemplate.name.split(' ')[0]}
              </span>
            </button>

            <AnimatePresence>
              {templateMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl p-3 border shadow-2xl z-50 backdrop-blur-2xl"
                  style={{
                    backgroundColor: isDark ? '#0D1424' : '#FFFFFF',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                    color: currentTemplate.palette.textColor,
                  }}
                >
                  <div className="px-2 pb-2 mb-2 border-b text-[11px] font-mono opacity-70 flex items-center justify-between" style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}>
                    <span>CHOOSE DESIGN TEMPLATE</span>
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    {templates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          setTemplate(tpl.id);
                          setTemplateMenuOpen(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left text-xs font-mono flex items-center justify-between border transition-all ${
                          tpl.id === currentTemplateId
                            ? 'font-bold shadow-sm'
                            : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                        style={{
                          backgroundColor: tpl.id === currentTemplateId ? `${tpl.palette.primary}15` : 'transparent',
                          borderColor: tpl.id === currentTemplateId ? tpl.palette.primary : 'transparent',
                          color: currentTemplate.palette.textColor,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full border shadow-sm shrink-0"
                            style={{ backgroundColor: tpl.palette.primary, borderColor: '#FFFFFF' }}
                          />
                          <span className="truncate">{tpl.name}</span>
                        </div>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded opacity-60 shrink-0">
                          {tpl.mode}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Partner CTA */}
          <button
            id="btn-nav-partner"
            onClick={() => {
              onOpenPartner();
            }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold font-mono tracking-wider shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: isDark ? currentTemplate.palette.primary : '#0F172A',
              color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF',
            }}
          >
            <span>PARTNER WITH US</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 sm:p-2 rounded-xl border shadow-sm shrink-0"
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
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: activeSection === link.id ? `${currentTemplate.palette.primary}20` : 'transparent',
                    color: activeSection === link.id ? currentTemplate.palette.primary : currentTemplate.palette.textColor,
                  }}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Template Selector */}
              <div className="pt-3 border-t" style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}>
                <p className="text-[11px] font-mono opacity-70 mb-2">DESIGN TEMPLATE:</p>
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => {
                        setTemplate(tpl.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-2 rounded-xl text-left text-xs font-mono border transition-all ${
                        tpl.id === currentTemplateId ? 'font-bold' : 'opacity-70'
                      }`}
                      style={{
                        backgroundColor: tpl.id === currentTemplateId ? `${tpl.palette.primary}20` : 'transparent',
                        borderColor: tpl.id === currentTemplateId ? tpl.palette.primary : isDark ? '#1E293B' : '#E2E8F0',
                        color: currentTemplate.palette.textColor,
                      }}
                    >
                      {tpl.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t" style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPartner();
                  }}
                  className="w-full py-3 rounded-xl text-white font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-sm"
                  style={{
                    backgroundColor: currentTemplate.palette.primary,
                    color: isDark && currentTemplate.id === 'obsidian-cyber' ? '#041B15' : '#FFFFFF',
                  }}
                >
                  <span>INITIATE PARTNERSHIP</span>
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

