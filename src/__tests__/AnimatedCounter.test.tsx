import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { AnimatedCounter } from '../components/AnimatedCounter';

describe('AnimatedCounter Component', () => {
  it('should render prefix and suffix correctly', () => {
    render(<AnimatedCounter value={99.4} decimals={1} prefix="$" suffix="%" duration={0.5} />);

    expect(screen.getByText(/%/i)).toBeInTheDocument();
    expect(screen.getByText(/\$/i)).toBeInTheDocument();
  });

  it('should render integer values without errors', () => {
    render(<AnimatedCounter value={180} suffix="x" />);
    expect(screen.getByText(/x/i)).toBeInTheDocument();
  });
});
