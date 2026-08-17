import { describe, it, expect, vi } from 'vitest';
import { centerTabInContainer } from '../utils/tabScroll';

describe('centerTabInContainer Utility', () => {
  it('should safely return if container or targetTab is null', () => {
    expect(() => centerTabInContainer(null, null)).not.toThrow();
    expect(() => centerTabInContainer(document.createElement('div'), null)).not.toThrow();
    expect(() => centerTabInContainer(null, document.createElement('button'))).not.toThrow();
  });

  it('should not scroll if container has no overflow (maxScrollLeft <= 0)', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    container.appendChild(target);

    Object.defineProperty(container, 'clientWidth', { value: 500, configurable: true });
    Object.defineProperty(container, 'scrollWidth', { value: 400, configurable: true });
    const scrollToSpy = vi.fn();
    container.scrollTo = scrollToSpy;

    centerTabInContainer(container, target);
    expect(scrollToSpy).not.toHaveBeenCalled();
  });

  it('should scroll container to center target tab within clamped bounds', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    container.appendChild(target);

    Object.defineProperty(container, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(container, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(container, 'scrollLeft', { value: 0, configurable: true, writable: true });

    Object.defineProperty(target, 'offsetLeft', { value: 450, configurable: true });
    Object.defineProperty(target, 'offsetWidth', { value: 100, configurable: true });

    const scrollToSpy = vi.fn();
    container.scrollTo = scrollToSpy;

    centerTabInContainer(container, target);

    // ideal = 450 - (300/2) + (100/2) = 450 - 150 + 50 = 350
    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        left: 350,
        behavior: 'smooth',
      })
    );
  });

  it('should clamp scroll position to 0 for elements near the start', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    container.appendChild(target);

    Object.defineProperty(container, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(container, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(container, 'scrollLeft', { value: 50, configurable: true, writable: true });

    Object.defineProperty(target, 'offsetLeft', { value: 20, configurable: true });
    Object.defineProperty(target, 'offsetWidth', { value: 60, configurable: true });

    const scrollToSpy = vi.fn();
    container.scrollTo = scrollToSpy;

    centerTabInContainer(container, target);

    // ideal = 20 - 150 + 30 = -100 -> clamped to 0
    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        left: 0,
      })
    );
  });

  it('should clamp scroll position to maxScrollLeft for elements near the end', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');
    container.appendChild(target);

    Object.defineProperty(container, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(container, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(container, 'scrollLeft', { value: 0, configurable: true, writable: true });

    Object.defineProperty(target, 'offsetLeft', { value: 920, configurable: true });
    Object.defineProperty(target, 'offsetWidth', { value: 80, configurable: true });

    const scrollToSpy = vi.fn();
    container.scrollTo = scrollToSpy;

    centerTabInContainer(container, target);

    // maxScrollLeft = 1000 - 300 = 700
    // ideal = 920 - 150 + 40 = 810 -> clamped to 700
    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        left: 700,
      })
    );
  });
});
