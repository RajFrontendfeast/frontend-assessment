import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CtaSection } from '../components/CtaSection';
import { TemplateProvider } from '../context/TemplateContext';

describe('CtaSection Component', () => {
  const onOpenPartnerModal = vi.fn();

  it('should render call to action copy and button', () => {
    render(
      <TemplateProvider>
        <CtaSection onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    expect(screen.getByText(/ACCELERATE YOUR THERAPEUTIC PIPELINE/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /initiate strategic partnership/i })).toBeInTheDocument();
  });

  it('should call onOpenPartnerModal on partnership button click', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <CtaSection onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    const btn = screen.getByRole('button', { name: /initiate strategic partnership/i });
    await user.click(btn);

    expect(onOpenPartnerModal).toHaveBeenCalled();
  });
});
