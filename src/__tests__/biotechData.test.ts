import { describe, it, expect } from 'vitest';
import {
  PIPELINE_ASSETS,
  PLATFORM_CAPABILITIES,
  SCIENTIFIC_PUBLICATIONS,
  IMPACT_STATS,
  LAB_LOCATIONS,
  MOLECULAR_TARGETS,
  getPipelineAssetById,
  getAssetsByTherapeuticArea,
  searchPipelineAssets,
  getCapabilityById,
  getPublicationById,
  filterPublicationsByCategory,
  getMolecularTargetById,
  calculatePipelineSummary,
} from '../data/biotechData';

describe('Biotech Data Layer', () => {
  it('should have valid pipeline assets structure', () => {
    expect(PIPELINE_ASSETS.length).toBeGreaterThanOrEqual(5);
    PIPELINE_ASSETS.forEach((asset) => {
      expect(asset.id).toBeTruthy();
      expect(asset.name).toBeTruthy();
      expect(asset.target).toBeTruthy();
      expect(asset.phase).toBeTruthy();
      expect(asset.milestones.length).toBeGreaterThan(0);
      expect(asset.keyDataPoints.length).toBeGreaterThan(0);
    });
  });

  it('should have valid platform capabilities', () => {
    expect(PLATFORM_CAPABILITIES.length).toBe(4);
    PLATFORM_CAPABILITIES.forEach((cap) => {
      expect(cap.id).toBeTruthy();
      expect(cap.title).toBeTruthy();
      expect(cap.capabilities.length).toBeGreaterThan(0);
      expect(cap.metrics.length).toBeGreaterThan(0);
    });
  });

  it('should have valid scientific publications', () => {
    expect(SCIENTIFIC_PUBLICATIONS.length).toBeGreaterThanOrEqual(4);
    SCIENTIFIC_PUBLICATIONS.forEach((pub) => {
      expect(pub.id).toBeTruthy();
      expect(pub.title).toBeTruthy();
      expect(pub.journal).toBeTruthy();
      expect(pub.doi).toBeTruthy();
    });
  });

  it('should have valid molecular targets and lab locations', () => {
    expect(MOLECULAR_TARGETS.length).toBeGreaterThan(0);
    expect(LAB_LOCATIONS.length).toBeGreaterThan(0);
    expect(IMPACT_STATS.length).toBeGreaterThan(0);
  });

  describe('Data Selectors & Utilities', () => {
    it('getPipelineAssetById should find asset by ID or code', () => {
      const asset = getPipelineAssetById('sb-402');
      expect(asset).toBeDefined();
      expect(asset?.name).toBe('Atropos-KRAS');

      const assetByCode = getPipelineAssetById('SB-402');
      expect(assetByCode).toBeDefined();

      const notFound = getPipelineAssetById('non-existent');
      expect(notFound).toBeUndefined();
    });

    it('getAssetsByTherapeuticArea should filter properly', () => {
      const oncology = getAssetsByTherapeuticArea('Oncology');
      expect(oncology.length).toBeGreaterThan(0);
      expect(oncology.every((a) => a.therapeuticArea === 'Oncology')).toBe(true);

      const all = getAssetsByTherapeuticArea('All');
      expect(all.length).toBe(PIPELINE_ASSETS.length);
    });

    it('searchPipelineAssets should match name, code, target, or indication', () => {
      const searchKras = searchPipelineAssets('KRAS');
      expect(searchKras.length).toBeGreaterThan(0);
      expect(searchKras.some((a) => a.name.includes('KRAS') || a.target.includes('KRAS'))).toBe(true);

      const searchEmpty = searchPipelineAssets('');
      expect(searchEmpty.length).toBe(PIPELINE_ASSETS.length);
    });

    it('getCapabilityById should return the matching capability', () => {
      const cap = getCapabilityById('protein-design');
      expect(cap).toBeDefined();
      expect(cap?.title).toContain('Protein');
    });

    it('getPublicationById and filterPublicationsByCategory should work', () => {
      const pub = getPublicationById('pub-01');
      expect(pub).toBeDefined();
      expect(pub?.journal).toBe('Nature Biotechnology');

      const structurePubs = filterPublicationsByCategory('Structure');
      expect(structurePubs.length).toBeGreaterThan(0);
      expect(structurePubs.every((p) => p.category === 'Structure')).toBe(true);

      const allPubs = filterPublicationsByCategory('All');
      expect(allPubs.length).toBe(SCIENTIFIC_PUBLICATIONS.length);
    });

    it('getMolecularTargetById should find target by id or symbol', () => {
      const target = getMolecularTargetById('kras-g12d');
      expect(target).toBeDefined();
      expect(target?.symbol).toBe('KRAS-G12D');
    });

    it('calculatePipelineSummary should aggregate metrics accurately', () => {
      const summary = calculatePipelineSummary();
      expect(summary.totalAssets).toBe(PIPELINE_ASSETS.length);
      expect(summary.inClinical).toBeGreaterThan(0);
      expect(summary.totalMilestones).toBeGreaterThan(0);
      expect(summary.milestoneCompletionRate).toBeGreaterThan(0);
    });
  });
});
