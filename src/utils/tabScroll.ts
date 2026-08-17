/**
 * Utility for smooth auto-centering of active tabs inside horizontal scrollable containers on mobile & tablet.
 * 
 * Guarantees:
 * - Only scrolls the container's internal scrollLeft (never calls window/page scrollIntoView)
 * - Zero outer layout shift: the surrounding sections and window remain strictly fixed
 * - Clamps scroll cleanly between 0 and maxScrollLeft (scrollWidth - clientWidth)
 * - Perfectly centers active tab, without pulling or over-scrolling the last or first item
 */

export function centerTabInContainer(
  container: HTMLElement | null,
  targetTab: HTMLElement | null,
  options: {
    behavior?: ScrollBehavior;
    padding?: number;
  } = {}
) {
  if (!container || !targetTab) return;

  const { behavior = 'smooth', padding = 12 } = options;

  const containerWidth = container.clientWidth;
  const scrollWidth = container.scrollWidth;
  const maxScrollLeft = scrollWidth - containerWidth;

  // If container does not have horizontal overflow, no scroll needed
  if (maxScrollLeft <= 0) return;

  // Calculate target element offset relative to the scroll container
  // targetTab.offsetLeft is relative to its offsetParent; if container is position relative or is offsetParent
  let targetLeft = targetTab.offsetLeft;
  let parent = targetTab.offsetParent as HTMLElement | null;

  while (parent && parent !== container && container.contains(parent)) {
    targetLeft += parent.offsetLeft;
    parent = parent.offsetParent as HTMLElement | null;
  }

  const targetWidth = targetTab.offsetWidth;
  const targetRight = targetLeft + targetWidth;
  const currentScrollLeft = container.scrollLeft;

  // Calculate ideal scroll position to place the target in the optical center
  const idealScrollLeft = targetLeft - (containerWidth / 2) + (targetWidth / 2);

  // Strictly clamp between 0 and maxScrollLeft
  const clampedScrollLeft = Math.max(0, Math.min(idealScrollLeft, maxScrollLeft));

  // If target is already comfortably visible and target is near right edge at maxScrollLeft,
  // ensure we don't cause jitter
  if (Math.abs(currentScrollLeft - clampedScrollLeft) > 2) {
    container.scrollTo({
      left: clampedScrollLeft,
      behavior,
    });
  }
}
