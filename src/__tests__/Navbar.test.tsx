import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { TemplateProvider } from '../context/TemplateContext';

describe('Navbar Component', () => {
  const onOpenPartnerModal = vi.fn();

  it('should render brand logo and navigation links', () => {
    render(
      <TemplateProvider>
        <Navbar onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    expect(screen.getByText('SYNTHETIX')).toBeInTheDocument();
    expect(screen.getByText('Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Bio-Lab')).toBeInTheDocument();
    expect(screen.getByText('Publications')).toBeInTheDocument();
  });

  it('should trigger onOpenPartnerModal when clicking Partner With Us', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <Navbar onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    const partnerBtn = screen.getByRole('button', { name: /partner with us/i });
    await user.click(partnerBtn);

    expect(onOpenPartnerModal).toHaveBeenCalledTimes(1);
  });
});
