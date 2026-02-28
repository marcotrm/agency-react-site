/**
 * ThreeJSLayer.jsx â Three.js canvas bridge component
 *
 * This component solves the challenge of integrating an external Three.js
 * experience (experience.js from marcotrm/ai-web-factory-v3) into React
 * without bundling Three.js itself â it loads it as a plain <script> tag.
 *
 * âââ How it works âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
 *
 * 1. React renders an empty <div id="threejs-canvas"> with design-system
 *    colors exposed as data-attributes:
 *      data-color-bg="#050505"
 *      data-color-gold="#c9a96e"
 *      data-color-text="#ffffff"
 *
 * 2. On mount, this component appends a <script> tag to <head> pointing to
 *    experience.js in the ai-web-factory-v3 repo.
 *
 * 3. experience.js is expected to:
 *      a) Read #threejs-canvas as its mount target
 *      b) Read design-system colors from the element's dataset
 *      c) Create a Three.js renderer and append its <canvas> inside #threejs-canvas
 *
 * 4. On unmount, the script tag and any Three.js resources are cleaned up
 *    to prevent memory leaks during React hot-reloads.
 *
 * âââ experience.js contract âââââââââââââââââââââââââââââââââââââââââââââââââ
 *
 * The script should expose a global cleanup function window.__threeCleanup()
 * that stops the animation loop and disposes renderer, scenes, geometries.
 * If it doesn't, we fall back to simply removing the injected canvas element.
 *
 * âââ Passing new colors at runtime ââââââââââââââââââââââââââââââââââââââââââ
 *
 * Update data-attributes on #threejs-canvas and dispatch a custom event:
 *   canvas.dataset.colorGold = '#e0c48e';
 *   canvas.dispatchEvent(new CustomEvent('theme-change'));
 * experience.js should listen for this event and update materials accordingly.
 */
import React, { useEffect, useRef } from 'react';

// URL to the experience.js file in the source repository.
// Using the raw GitHub CDN URL so it loads as plain JS.
const EXPERIENCE_SCRIPT_URL =
  'https://raw.githubusercontent.com/marcotrm/ai-web-factory-v3/main/experience.js';

// Design-system color tokens to forward as data attributes.
// These must match the CSS custom properties in design-system.css.
const DESIGN_TOKENS = {
  colorBg:   '#050505',
  colorGold:  '#c9a96e',
  colorText:  '#ffffff',
};

export default function ThreeJSLayer() {
  const canvasRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // ââ Step 1: Set design-system tokens as data attributes ââ
    // experience.js reads these via canvasEl.dataset to theme the scene.
    Object.entries(DESIGN_TOKENS).forEach(([key, val]) => {
      canvasEl.dataset[key] = val;
    });

    // ââ Step 2: Inject <script> tag ââ
    // We avoid dynamic import() because experience.js is not an ES module â
    // it may use a self-executing pattern or assign to window globals.
    const script = document.createElement('script');
    script.src   = EXPERIENCE_SCRIPT_URL;
    script.async = true;
    script.id    = 'three-experience-script';

    script.onerror = () => {
      console.warn(
        '[ThreeJSLayer] Failed to load experience.js. ' +
        'Verify the script URL and that CORS headers are set on the raw CDN.'
      );
    };

    document.head.appendChild(script);
    scriptRef.current = script;

    // ââ Step 3: Cleanup on unmount ââ
    return () => {
      // Call the global cleanup function if experience.js exposed one
      if (typeof window.__threeCleanup === 'function') {
        window.__threeCleanup();
        delete window.__threeCleanup;
      }

      // Remove any Three.js canvas injected inside our container
      const injectedCanvas = canvasEl.querySelector('canvas');
      if (injectedCanvas) injectedCanvas.remove();

      // Remove the script tag
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []); // Runs once on mount; design tokens are static

  return (
    <div
      id="threejs-canvas"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 'var(--z-below)',
        overflow: 'hidden',
        // Pointer events disabled so Hero CTA buttons remain clickable
        pointerEvents: 'none',
      }}
    />
  );
}
