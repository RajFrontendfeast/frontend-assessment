import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

describe('useBodyScrollLock Hook', () => {
  it('should lock body scroll when isLocked is true and restore on false', () => {
    const { rerender } = renderHook(({ isLocked }) => useBodyScrollLock(isLocked), {
      initialProps: { isLocked: true },
    });

    expect(document.body.style.overflow).toBe('hidden');

    rerender({ isLocked: false });
    expect(document.body.style.overflow).toBe('');
  });

  it('should restore body overflow when component unmounts', () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
