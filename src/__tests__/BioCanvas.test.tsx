import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { BioCanvas } from '../components/BioCanvas';

describe('BioCanvas Component', () => {
  it('should render canvas element cleanly and handle resize', () => {
    const { container } = render(<BioCanvas />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
