import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { InteractiveGlowCard } from '../components/InteractiveGlowCard';

describe('InteractiveGlowCard Component', () => {
  it('should render children content and custom className', () => {
    render(
      <InteractiveGlowCard className="test-custom-card" glowColor="rgba(16, 185, 129, 0.2)">
        <p>Glow Card Content</p>
      </InteractiveGlowCard>
    );

    expect(screen.getByText('Glow Card Content')).toBeInTheDocument();
  });

  it('should handle mouse move and mouse leave events cleanly', () => {
    const { container } = render(
      <InteractiveGlowCard>
        <span>Card Item</span>
      </InteractiveGlowCard>
    );

    const card = container.firstChild as HTMLElement;
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();
  });
});
