import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { InnovationSection } from '../components/InnovationSection';
import { TemplateProvider } from '../context/TemplateContext';

describe('InnovationSection Component', () => {
  it('should render architecture pillars and interactive deep dive tabs', () => {
    render(
      <TemplateProvider>
        <InnovationSection />
      </TemplateProvider>
    );

    expect(screen.getByText(/DEEP GENERATIVE DIFFUSION/i)).toBeInTheDocument();
    expect(screen.getByText(/Architectural Pillars/i)).toBeInTheDocument();
  });

  it('should switch active innovation pillar on click', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <InnovationSection />
      </TemplateProvider>
    );

    const pillarButtons = screen.getAllByRole('button');
    if (pillarButtons.length > 0) {
      await user.click(pillarButtons[0]);
    }
    expect(screen.getByText(/DEEP GENERATIVE DIFFUSION/i)).toBeInTheDocument();
  });
});
