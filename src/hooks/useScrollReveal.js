/**
 * useScrollReveal.js â IntersectionObserver scroll-reveal hook
 *
 * Applies the CSS class 'reveal' to tracked elements on mount,
 * then adds 'visible' when they enter the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <section ref={ref} className="reveal">...</section>
 *
 * The .reveal and .reveal.visible CSS rules live in global.css.
 */
import { useEffect, useRef } from 'react';

/**
 * @param {IntersectionObserverInit} [options]
 * @returns {React.RefObject}
 */
export function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Collect all direct children with the 'reveal' class
    const targets = container.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, stop watching this element
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,   // trigger when 12% of element is visible
        rootMargin: '0px 0px -64px 0px',  // slight upward offset
        ...options,
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
