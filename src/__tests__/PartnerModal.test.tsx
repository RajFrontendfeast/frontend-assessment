import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PartnerModal } from '../components/PartnerModal';
import { TemplateProvider } from '../context/TemplateContext';

describe('PartnerModal Component', () => {
  const onClose = vi.fn();

  it('should render form fields when isOpen is true', () => {
    render(
      <TemplateProvider>
        <PartnerModal isOpen={true} onClose={onClose} />
      </TemplateProvider>
    );

    expect(screen.getByText(/INITIATE STRATEGIC PARTNERSHIP/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Dr. Eleanor Vance/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Novartis, Roche, Genentech/i)).toBeInTheDocument();
  });

  it('should submit inquiry form and show success state', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <PartnerModal isOpen={true} onClose={onClose} />
      </TemplateProvider>
    );

    const nameInput = screen.getByPlaceholderText(/e.g. Dr. Eleanor Vance/i);
    const emailInput = screen.getByPlaceholderText(/e.g. e.vance@pharma.com/i);
    const orgInput = screen.getByPlaceholderText(/e.g. Novartis, Roche, Genentech/i);
    const messageInput = screen.getByPlaceholderText(/Briefly describe target programs/i);

    await user.type(nameInput, 'Dr. John Doe');
    await user.type(emailInput, 'john.doe@biotech.com');
    await user.type(orgInput, 'BioTech Global');
    await user.type(messageInput, 'Interested in KRAS co-development.');

    const submitBtn = screen.getByRole('button', { name: /transmit partnership inquiry/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/PARTNERSHIP INQUIRY TRANSMITTED/i)).toBeInTheDocument();
  });
});
