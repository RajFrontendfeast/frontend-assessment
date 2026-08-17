import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { TemplateProvider } from '../context/TemplateContext';

describe('CapabilitiesSection Component', () => {
  it('should render section title and platform capability selector dials', () => {
    render(
      <TemplateProvider>
        <CapabilitiesSection />
      </TemplateProvider>
    );

    expect(screen.getByText(/FOUR FOUNDATIONAL VECTORS/i)).toBeInTheDocument();
    expect(screen.getByText('De Novo Generative Protein Design')).toBeInTheDocument();
    expect(screen.getByText('Programmable Epigenetic Silencing')).toBeInTheDocument();
  });

  it('should switch active capability and update interactive telemetry display', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <CapabilitiesSection />
      </TemplateProvider>
    );

    const epigeneticBtn = screen.getByText('Programmable Epigenetic Silencing');
    await user.click(epigeneticBtn);

    expect(screen.getByText(/Zero-DNA-Break CRISPR/i)).toBeInTheDocument();
  });
});
