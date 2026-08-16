import React, { createContext, useContext, useState, useEffect } from 'react';
import { DesignTemplateId, DesignTemplateConfig } from '../types';
import { DESIGN_TEMPLATES } from '../data/templates';
import { bioSound } from '../utils/sound';

interface TemplateContextType {
  currentTemplateId: DesignTemplateId;
  currentTemplate: DesignTemplateConfig;
  setTemplate: (id: DesignTemplateId) => void;
  templates: DesignTemplateConfig[];
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTemplateId, setCurrentTemplateId] = useState<DesignTemplateId>(() => {
    const saved = localStorage.getItem('synthetix_design_template') as DesignTemplateId;
    if (saved && DESIGN_TEMPLATES.some((t) => t.id === saved)) {
      return saved;
    }
    return 'neo-swiss';
  });

  const currentTemplate =
    DESIGN_TEMPLATES.find((t) => t.id === currentTemplateId) || DESIGN_TEMPLATES[0];

  useEffect(() => {
    localStorage.setItem('synthetix_design_template', currentTemplateId);
    document.documentElement.setAttribute('data-template', currentTemplateId);
    document.documentElement.setAttribute('data-theme-mode', currentTemplate.mode);
    if (currentTemplate.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTemplateId, currentTemplate.mode]);

  const setTemplate = (id: DesignTemplateId) => {
    setCurrentTemplateId(id);
    bioSound.playChime(620, 0.25);
  };

  return (
    <TemplateContext.Provider
      value={{
        currentTemplateId,
        currentTemplate,
        setTemplate,
        templates: DESIGN_TEMPLATES,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useDesignTemplate = (): TemplateContextType => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useDesignTemplate must be used within a TemplateProvider');
  }
  return context;
};
