import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App Root Component', () => {
  it('should render all primary sections and header', () => {
    render(<App />);

    expect(screen.getByText('SYNTHETIX')).toBeInTheDocument();
    expect(screen.getByText(/SYNTHESIZING THE/i)).toBeInTheDocument();
    expect(screen.getByText(/PRECISION PIPELINE MATRIX/i)).toBeInTheDocument();
  });
});
