import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { HorizontalJourneySection } from '../components/HorizontalJourneySection';
import { TemplateProvider } from '../context/TemplateContext';

describe('HorizontalJourneySection Component', () => {
  it('should render all 6 lifecycle stages and category filters', () => {
    render(
      <TemplateProvider>
        <HorizontalJourneySection />
      </TemplateProvider>
    );

    expect(screen.getByText(/INTEGRATED BIOTECH DISCOVERY LIFECYCLE/i)).toBeInTheDocument();
    expect(screen.getByText('All 6 Phases')).toBeInTheDocument();
    expect(screen.getByText(/Target Holography/i)).toBeInTheDocument();
  });

  it('should allow switching stages and filtering phases', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <HorizontalJourneySection />
      </TemplateProvider>
    );

    const filterBtn = screen.getByText('03-04 Wet-Lab BioFoundry');
    await user.click(filterBtn);

    expect(screen.getByText(/Robotic Bio-Foundry/i)).toBeInTheDocument();
  });
});
