import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MetricsRibbon } from '../components/MetricsRibbon';
import { TemplateProvider } from '../context/TemplateContext';

describe('MetricsRibbon Component', () => {
  it('should render impact statistics items and metrics', () => {
    render(
      <TemplateProvider>
        <MetricsRibbon />
      </TemplateProvider>
    );

    expect(screen.getByText(/Virtual Molecules Synthesized/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Clinical Pipeline/i)).toBeInTheDocument();
  });
});
