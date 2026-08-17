import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { TemplateProvider } from '../context/TemplateContext';

describe('ScrollProgressBar Component', () => {
  it('should render scroll progress bar with template styles', () => {
    const { container } = render(
      <TemplateProvider>
        <ScrollProgressBar />
      </TemplateProvider>
    );

    const bar = container.querySelector('div');
    expect(bar).toBeInTheDocument();
  });
});
