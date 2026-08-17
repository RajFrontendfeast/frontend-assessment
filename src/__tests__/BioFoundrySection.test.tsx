import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BioFoundrySection } from '../components/BioFoundrySection';
import { TemplateProvider } from '../context/TemplateContext';

describe('BioFoundrySection Component', () => {
  it('should render lab facilities and global discovery network', () => {
    render(
      <TemplateProvider>
        <BioFoundrySection />
      </TemplateProvider>
    );

    expect(screen.getByText(/SYNTHETIX BIO-FOUNDRY NETWORK/i)).toBeInTheDocument();
    expect(screen.getByText('Cambridge')).toBeInTheDocument();
    expect(screen.getByText('Basel')).toBeInTheDocument();
  });

  it('should allow toggling between global facilities', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <BioFoundrySection />
      </TemplateProvider>
    );

    const baselBtn = screen.getByRole('button', { name: /basel/i });
    await user.click(baselBtn);

    expect(screen.getByText(/Synthetix Europe Innovation Campus/i)).toBeInTheDocument();
  });
});
