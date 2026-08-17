import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PipelineSection } from '../components/PipelineSection';
import { TemplateProvider } from '../context/TemplateContext';
import { PIPELINE_ASSETS } from '../data/biotechData';

describe('PipelineSection Component', () => {
  const onSelectAsset = vi.fn();

  it('should render therapeutic filter pills and asset cards', () => {
    render(
      <TemplateProvider>
        <PipelineSection onSelectAsset={onSelectAsset} />
      </TemplateProvider>
    );

    expect(screen.getByText(/PRECISION PIPELINE MATRIX/i)).toBeInTheDocument();
    expect(screen.getByText('Atropos-KRAS')).toBeInTheDocument();
    expect(screen.getByText('NeuroShield-Tau')).toBeInTheDocument();
  });

  it('should filter pipeline assets when selecting a therapeutic area', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <PipelineSection onSelectAsset={onSelectAsset} />
      </TemplateProvider>
    );

    const neuroFilter = screen.getByRole('button', { name: /neurodegeneration/i });
    await user.click(neuroFilter);

    expect(screen.getByText('NeuroShield-Tau')).toBeInTheDocument();
    expect(screen.queryByText('Atropos-KRAS')).not.toBeInTheDocument();
  });

  it('should trigger onSelectAsset callback when clicking on an asset card', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <PipelineSection onSelectAsset={onSelectAsset} />
      </TemplateProvider>
    );

    const assetCard = screen.getByText('Atropos-KRAS');
    await user.click(assetCard);

    expect(onSelectAsset).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'sb-402',
        name: 'Atropos-KRAS',
      })
    );
  });
});
