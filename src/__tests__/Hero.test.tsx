import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Hero } from '../components/Hero';
import { TemplateProvider } from '../context/TemplateContext';

describe('Hero Component', () => {
  const onOpenPartnerModal = vi.fn();

  it('should render main headlines and live telemetry indicators', () => {
    render(
      <TemplateProvider>
        <Hero onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    expect(screen.getByText(/SYNTHESIZING THE/i)).toBeInTheDocument();
    expect(screen.getByText(/NEXT ERA OF THERAPEUTICS/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Clinical Pipeline/i)).toBeInTheDocument();
  });

  it('should call onOpenPartnerModal when initiating partnership action', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <Hero onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    const partnerBtn = screen.getByRole('button', { name: /partner with us/i });
    await user.click(partnerBtn);

    expect(onOpenPartnerModal).toHaveBeenCalled();
  });
});
