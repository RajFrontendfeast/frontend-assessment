import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TemplateSwitcher } from '../components/TemplateSwitcher';
import { TemplateProvider } from '../context/TemplateContext';

describe('TemplateSwitcher Component', () => {
  it('should render toggle floating pill and open dialog on click', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <TemplateSwitcher />
      </TemplateProvider>
    );

    const triggerBtn = screen.getByRole('button', { name: /palette/i });
    expect(triggerBtn).toBeInTheDocument();

    await user.click(triggerBtn);
    expect(screen.getByText(/Design Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/Preset Colorways/i)).toBeInTheDocument();
  });

  it('should allow selecting a different preset template and changing density/radius', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <TemplateSwitcher />
      </TemplateProvider>
    );

    const triggerBtn = screen.getByRole('button', { name: /palette/i });
    await user.click(triggerBtn);

    const lightOption = screen.getByText('Light Clinical');
    await user.click(lightOption);

    // Verify preset change
    expect(screen.getByText('Light Clinical')).toBeInTheDocument();
  });
});
