import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Footer } from '../components/Footer';
import { TemplateProvider } from '../context/TemplateContext';

describe('Footer Component', () => {
  const onOpenPartnerModal = vi.fn();

  it('should render brand information, links, and copyright', () => {
    render(
      <TemplateProvider>
        <Footer onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    expect(screen.getByText('SYNTHETIX BIO-ENGINEERING')).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it('should trigger partner modal when clicking partner link in footer', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <Footer onOpenPartnerModal={onOpenPartnerModal} />
      </TemplateProvider>
    );

    const partnerLink = screen.getByText('Partner Inquiries');
    await user.click(partnerLink);

    expect(onOpenPartnerModal).toHaveBeenCalled();
  });
});
