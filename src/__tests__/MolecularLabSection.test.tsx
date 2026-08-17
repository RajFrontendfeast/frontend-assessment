import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MolecularLabSection } from '../components/MolecularLabSection';
import { TemplateProvider } from '../context/TemplateContext';

describe('MolecularLabSection Component', () => {
  it('should render interactive in silico laboratory controls and targets', () => {
    render(
      <TemplateProvider>
        <MolecularLabSection />
      </TemplateProvider>
    );

    expect(screen.getByText(/INTERACTIVE IN SILICO LAB/i)).toBeInTheDocument();
    expect(screen.getByText('KRAS G12D Mutant')).toBeInTheDocument();
  });

  it('should allow switching targets and triggering simulation synthesis', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <MolecularLabSection />
      </TemplateProvider>
    );

    const runBtn = screen.getByRole('button', { name: /synthesize in silico binder/i });
    expect(runBtn).toBeInTheDocument();
    await user.click(runBtn);
  });
});
