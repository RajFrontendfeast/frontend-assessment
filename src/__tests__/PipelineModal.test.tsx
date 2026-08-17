import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PipelineModal } from '../components/PipelineModal';
import { TemplateProvider } from '../context/TemplateContext';
import { PIPELINE_ASSETS } from '../data/biotechData';

describe('PipelineModal Component', () => {
  const asset = PIPELINE_ASSETS[0];
  const onClose = vi.fn();
  const onOpenPartner = vi.fn();

  it('should render detailed asset metrics and milestone progress when open', () => {
    render(
      <TemplateProvider>
        <PipelineModal asset={asset} onClose={onClose} onOpenPartner={onOpenPartner} />
      </TemplateProvider>
    );

    expect(screen.getByText(asset.name)).toBeInTheDocument();
    expect(screen.getByText(asset.targetFull)).toBeInTheDocument();
    expect(screen.getByText(/Development Milestones/i)).toBeInTheDocument();
  });

  it('should trigger close callback when close button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <PipelineModal asset={asset} onClose={onClose} onOpenPartner={onOpenPartner} />
      </TemplateProvider>
    );

    const closeBtn = screen.getByRole('button', { name: /close modal/i });
    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
  });
});
