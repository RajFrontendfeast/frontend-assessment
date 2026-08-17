import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TemplateProvider, useDesignTemplate } from '../context/TemplateContext';
import { DESIGN_TEMPLATES } from '../data/templates';

const TestComponent = () => {
  const { currentTemplate, currentTemplateId, setTemplate, templates } = useDesignTemplate();

  return (
    <div>
      <span data-testid="template-id">{currentTemplateId}</span>
      <span data-testid="template-name">{currentTemplate.name}</span>
      <span data-testid="template-mode">{currentTemplate.mode}</span>
      <span data-testid="templates-count">{templates.length}</span>
      <button onClick={() => setTemplate('nordic-titanium')}>Set Nordic</button>
      <button onClick={() => setTemplate('obsidian-cyber')}>Set Obsidian</button>
    </div>
  );
};

describe('TemplateContext', () => {
  it('should provide default template and list templates', () => {
    expect(DESIGN_TEMPLATES.length).toBeGreaterThanOrEqual(4);

    render(
      <TemplateProvider>
        <TestComponent />
      </TemplateProvider>
    );

    expect(screen.getByTestId('template-id').textContent).toBeTruthy();
    expect(screen.getByTestId('template-name').textContent).toBeTruthy();
    expect(Number(screen.getByTestId('templates-count').textContent)).toBeGreaterThanOrEqual(4);
  });

  it('should allow changing template via setTemplate', async () => {
    const user = userEvent.setup();

    render(
      <TemplateProvider>
        <TestComponent />
      </TemplateProvider>
    );

    const setNordicBtn = screen.getByText('Set Nordic');
    await user.click(setNordicBtn);

    expect(screen.getByTestId('template-id').textContent).toBe('nordic-titanium');
    expect(screen.getByTestId('template-mode').textContent).toBe('light');

    const setObsidianBtn = screen.getByText('Set Obsidian');
    await user.click(setObsidianBtn);
    expect(screen.getByTestId('template-id').textContent).toBe('obsidian-cyber');
    expect(screen.getByTestId('template-mode').textContent).toBe('dark');
  });
});
