import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PublicationsSection } from '../components/PublicationsSection';
import { TemplateProvider } from '../context/TemplateContext';

describe('PublicationsSection Component', () => {
  it('should render scientific papers, journals, and category filters', () => {
    render(
      <TemplateProvider>
        <PublicationsSection />
      </TemplateProvider>
    );

    expect(screen.getByText(/PEER-REVIEWED SCIENTIFIC LITERATURE/i)).toBeInTheDocument();
    expect(screen.getByText('Nature Biotechnology')).toBeInTheDocument();
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });

  it('should filter papers when clicking category filter pills', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <PublicationsSection />
      </TemplateProvider>
    );

    const epigeneticsBtn = screen.getByRole('button', { name: /epigenetics/i });
    await user.click(epigeneticsBtn);

    expect(screen.getByText('Cell')).toBeInTheDocument();
    expect(screen.queryByText('Nature Genetics')).not.toBeInTheDocument();
  });
});
