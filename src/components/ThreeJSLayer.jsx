/**
 * ThreeJSLayer.jsx â Three.js canvas bridge component
 *
 * Loads experience.js from GitHub raw URL as a plain <script> tag.
 * If the script fails to load (CORS, network error, etc.) the component
 * silently falls back and simply renders the canvas div so the rest of
 * the page is unaffected.
 */
import React, { useEffect, useRef, useState } from 'react';

const EXPERIENCE_URL =
  'https://raw.githubusercontent.com/marcotrm/ai-web-factory-v3/main/experience.js';

export default function ThreeJSLayer({
  colorBg   = '#050505',
  colorGold  = '#c9a96e',
  colorText  = '#ffffff',
}) {
  const containerRef = useRef(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    // Avoid adding duplicate scripts on HMR re-mounts
    if (document.querySelector('script[data-threejs-layer]')) return;

    const script = document.createElement('script');
    script.src = EXPERIENCE_URL;
    script.async = true;
    script.setAttribute('data-threejs-layer', 'true');

    script.onerror = () => {
      // Script failed (CORS, 404, network) â degrade gracefully
      setLoadFailed(true);
      console.warn(
        '[ThreeJSLayer] Could not load experience.js â rendering static canvas fallback.',
      );
    };

    document.head.appendChild(script);

    return () => {
      // Clean up on unmount so we don't leave orphan scripts
      try { document.head.removeChild(script); } catch (_) {}
    };
  }, []);

  const style = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: loadFailed ? colorBg : 'transparent',
    // Subtle gradient fallback so the section still looks styled
    ...(loadFailed && {
      background: `radial-gradient(ellipse at 60% 40%, ${colorGold}22 0%, ${colorBg} 70%)`,
    }),
  };

  return (
    <div
      ref={containerRef}
      id="threejs-canvas"
      style={style}
      data-color-bg={colorBg}
      data-color-gold={colorGold}
      data-color-text={colorText}
      aria-hidden="true"
    />
  );
}
