import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sparkles, Sliders, ChevronDown, ChevronUp, Sun, Moon, Info, X } from 'lucide-react';
import { useDesignTemplate } from '../context/TemplateContext';
import { DesignTemplateId } from '../types';

export const TemplateSwitcher: React.FC = () => {
  const { currentTemplateId, currentTemplate, setTemplate, templates } = useDesignTemplate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSelect = (id: DesignTemplateId) => {
    setTemplate(id);
  };

  return (
    <>
      {/* Floating Template Quick Dock */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="mb-3 w-80 sm:w-96 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl border transition-all"
              style={{
                backgroundColor: currentTemplate.mode === 'dark' ? 'rgba(13, 20, 36, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: currentTemplate.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                color: currentTemplate.palette.textColor,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b" style={{ borderColor: currentTemplate.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${currentTemplate.palette.primary}20`, color: currentTemplate.palette.primary }}
                  >
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                      Design Template Studio
                    </h4>
                    <p className="text-[10px] opacity-70">
                      Switch architectural UI themes
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 opacity-60 hover:opacity-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Template Options Grid */}
              <div
                data-lenis-prevent
                className="mt-4 space-y-2.5 max-h-[360px] overflow-y-auto overscroll-contain pr-1"
              >
                {templates.map((tpl) => {
                  const isSelected = tpl.id === currentTemplateId;
                  return (
                    <button
                      key={tpl.id}
                      onClick={() => handleSelect(tpl.id)}
                      className={`w-full p-3.5 rounded-2xl text-left transition-all border relative flex items-start gap-3.5 group ${
                        isSelected
                          ? 'shadow-md ring-2'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? tpl.mode === 'dark'
                            ? '#11192E'
                            : '#F1F5F9'
                          : 'transparent',
                        borderColor: isSelected ? tpl.palette.primary : tpl.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                        // @ts-ignore
                        '--tw-ring-color': isSelected ? tpl.palette.primary : 'transparent',
                      }}
                    >
                      {/* Color Swatch Preview Dot */}
                      <div className="mt-0.5 relative shrink-0">
                        <div
                          className="w-5 h-5 rounded-full border flex items-center justify-center shadow-sm"
                          style={{
                            backgroundColor: tpl.palette.canvasBg,
                            borderColor: tpl.palette.primary,
                          }}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: tpl.palette.primary }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-display font-bold truncate">
                            {tpl.name}
                          </span>
                          <span
                            className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0"
                            style={{
                              backgroundColor: `${tpl.palette.primary}20`,
                              color: tpl.palette.primary,
                              border: `1px solid ${tpl.palette.primary}40`,
                            }}
                          >
                            {tpl.badge}
                          </span>
                        </div>

                        <p className="text-[11px] leading-snug line-clamp-2 opacity-75 font-sans">
                          {tpl.subtitle}
                        </p>

                        <div className="mt-2 flex items-center gap-3 text-[10px] font-mono opacity-60">
                          <span className="flex items-center gap-1">
                            {tpl.mode === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                            <span className="capitalize">{tpl.mode} mode</span>
                          </span>
                          <span>•</span>
                          <span>{tpl.aesthetic}</span>
                        </div>
                      </div>

                      {/* Check icon */}
                      {isSelected && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 self-center"
                          style={{ backgroundColor: tpl.palette.primary, color: '#FFFFFF' }}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Template Specs */}
              <div
                className="mt-4 p-3 rounded-xl border text-[11px] font-mono flex items-center justify-between"
                style={{
                  backgroundColor: currentTemplate.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: currentTemplate.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: currentTemplate.palette.primary }} />
                  <span>Active Template: <strong>{currentTemplate.name}</strong></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <motion.button
          id="btn-floating-template-switcher"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl border backdrop-blur-xl font-mono text-xs font-bold transition-all"
          style={{
            backgroundColor: currentTemplate.mode === 'dark' ? '#0F172A' : '#FFFFFF',
            borderColor: currentTemplate.palette.primary,
            color: currentTemplate.palette.textColor,
            boxShadow: `0 10px 30px -5px ${currentTemplate.palette.primaryGlow}`,
          }}
        >
          <Palette className="w-4 h-4 animate-spin-slow" style={{ color: currentTemplate.palette.primary }} />
          <span>TEMPLATE: <span style={{ color: currentTemplate.palette.primary }}>{currentTemplate.badge}</span></span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </motion.button>
      </div>
    </>
  );
};
