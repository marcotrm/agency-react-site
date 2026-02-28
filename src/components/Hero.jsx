/**
 * Hero.jsx â Full-screen hero section
 *
 * Layout:
 *   - ThreeJSLayer mounted as an absolutely-positioned background
 *   - Headline, subline, and CTA centered over the canvas
 *   - A subtle scroll indicator at the bottom
 *
 * The #threejs-canvas div inside ThreeJSLayer receives the design-system
 * colors as data attributes, which experience.js reads to theme the 3D scene.
 *
 * Sizing: the section takes 100dvh (dynamic viewport height) to handle
 * mobile browser chrome correctly.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import ThreeJSLayer from './ThreeJSLayer.jsx';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100dvh',
        minHeight: '640px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}
    >
      {/*
        ââ Three.js Background Layer ââââââââââââââââââââââââââââââââââââââââ
        ThreeJSLayer injects the experience.js script and provides the
        #threejs-canvas mount point. It sits behind all content (z-index: -1).
      */}
      <ThreeJSLayer />

      {/* ââ Radial gradient vignette to ensure text legibility ââ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(5,5,5,0.85) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ââ Hero content ââ */}
      <div
        className="container animate-in"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-8)',
        }}
      >
        {/* Eyebrow label */}
        <span className="section-label">Luxury Creative Studio</span>

        {/*
          ââ Headline âââââââââââââââââââââââââââââââââââââââââââââââââââââ
          Uses fluid --text-hero token so it scales from mobile to 4K.
          The gold gradient on "Exceptional" is a CSS technique: a linear
          gradient is applied as a background and clipped to the text.
        */}
        <h1
          style={{
            fontSize: 'var(--text-hero)',
            fontWeight: 700,
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-tight)',
            maxWidth: '900px',
          }}
        >
          We craft{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, var(--color-gold-light), var(--color-gold), var(--color-gold-dark))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Exceptional
          </span>{' '}
          Digital Experiences
        </h1>

        {/* Subline */}
        <p
          style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--color-text-muted)',
            maxWidth: '560px',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          Brand strategy, immersive web, and art direction for ambitious brands
          that refuse to be ordinary.
        </p>

        {/* ââ CTA buttons ââ */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/work" className="btn-primary">
            View Our Work
          </Link>
          <Link
            to="/contact"
            className="btn-primary"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--color-text-muted)' }}
          >
            Start a Project
          </Link>
        </div>
      </div>

      {/* ââ Scroll indicator ââ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'var(--space-10)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase',
            color: 'var(--color-text-dim)',
          }}
        >
          Scroll
        </span>
        {/* Animated scroll line */}
        <div
          style={{
            width: '1px',
            height: '48px',
            background:
              'linear-gradient(to bottom, var(--color-gold), transparent)',
            animation: 'fadeIn 2s ease-in-out infinite alternate',
          }}
        />
      </div>
    </section>
  );
}
