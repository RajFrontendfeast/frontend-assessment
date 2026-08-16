export type TherapeuticArea = 'All' | 'Oncology' | 'Neurodegeneration' | 'Autoimmune' | 'Rare Genetic' | 'Cardiometabolic';

export type ClinicalPhase = 'Discovery' | 'Preclinical' | 'Phase I' | 'Phase II' | 'Phase III' | 'Approved';

export interface PipelineAsset {
  id: string;
  code: string;
  name: string;
  target: string;
  targetFull: string;
  therapeuticArea: Exclude<TherapeuticArea, 'All'>;
  phase: ClinicalPhase;
  phaseProgress: number; // 0 to 100%
  indication: string;
  modality: string;
  deliveryMethod: string;
  description: string;
  mechanismSummary: string;
  bindingAffinity: string; // e.g. "0.042 nM Kd"
  structureResolution: string; // e.g. "0.85 Å"
  safetyMargin: string; // e.g. ">240x Therapeutic Window"
  partnerOrRights: string; // e.g. "Wholly Owned" or "Co-Dev with Roche"
  milestones: {
    year: string;
    event: string;
    completed: boolean;
  }[];
  keyDataPoints: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export interface PlatformCapability {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  accentColor: 'emerald' | 'cyan' | 'violet' | 'amber';
  description: string;
  longDescription: string;
  capabilities: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  demoType: 'protein-fold' | 'epigenetic-switch' | 'pk-curve' | 'spatial-map';
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  authors: string;
  doi: string;
  citations: number;
  impactFactor: number;
  abstract: string;
  category: 'Structure' | 'Epigenetics' | 'Clinical' | 'AI Models';
  keyFinding: string;
  badge: string;
}

export interface ImpactStat {
  id: string;
  number: string;
  suffix: string;
  numericVal: number;
  label: string;
  sublabel: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface LabLocation {
  city: string;
  country: string;
  facility: string;
  focus: string;
  status: 'Operational' | 'Expanding';
  coords: { x: number; y: number };
}

export interface MolecularTarget {
  id: string;
  name: string;
  symbol: string;
  class: string;
  diseaseAssociation: string;
  aminoAcids: number;
  defaultPdb: string;
  defaultAffinity: number; // in nM
  sequenceSnippet: string;
}

export interface VirtualExperimentResult {
  target: string;
  modality: string;
  bindingAffinityKd: number; // in nM
  solubilityScore: number; // 0-100
  halfLifeHours: number;
  offTargetRisk: number; // low %
  conformationRMSD: number; // in Angstroms
  syntheticReadiness: number; // 0-100%
  recommendation: 'Highly Favorable' | 'Candidate Viable' | 'Requires Optimization';
}

export type DesignTemplateId = 'neo-swiss' | 'obsidian-cyber' | 'nordic-titanium' | 'quantum-amber';

export interface DesignTemplateConfig {
  id: DesignTemplateId;
  name: string;
  subtitle: string;
  aesthetic: string;
  mode: 'light' | 'dark';
  badge: string;
  palette: {
    primary: string;
    primaryGlow: string;
    accent: string;
    canvasBg: string;
    cardBg: string;
    cardBorder: string;
    textColor: string;
    mutedText: string;
  };
  features: string[];
}
