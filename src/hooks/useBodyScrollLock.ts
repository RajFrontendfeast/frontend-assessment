import { useEffect } from 'react';

/**
 * Custom hook to lock background scrolling (both standard body scroll and Lenis smooth scroll)
 * when a modal or overlay is open, allowing full independent scrolling inside the modal.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    // 1. Pause Lenis smooth scroll if active
    const lenisInstance = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenisInstance && typeof lenisInstance.stop === 'function') {
      lenisInstance.stop();
    }

    // 2. Lock standard body & html overflow
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Compensate for scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restore standard scroll
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.documentElement.style.overflow = originalHtmlOverflow;

      // Resume Lenis smooth scroll
      if (lenisInstance && typeof lenisInstance.start === 'function') {
        lenisInstance.start();
      }
    };
  }, [isLocked]);
}
