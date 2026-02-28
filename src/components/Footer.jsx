/**
 * Footer.jsx â Site footer
 *
 * Contains: logo, nav links, social links, legal line.
 */
import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: 'Work',     to: '/work'     },
  { label: 'Services', to: '/services' },
  { label: 'About',    to: '/about'    },
  { label: 'Contact',  to: '/contact'  },
];

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Dribbble',  href: '#' },
  { label: 'Behance',   href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '300px' }}>
            <Link
              to="/"
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-wide)',
                display: 'block',
                marginBottom: 'var(--space-4)',
              }}
            >
              AGENCE<span style={{ color: 'var(--color-gold)' }}>.</span>
            </Link>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)' }}>
              Award-winning creative studio specialising in brand identity,
              immersive digital experiences, and art direction.
            </p>
          </div>

          {/* Navigation */}
          <nav>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-text-dim)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Navigation
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {FOOTER_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--text-sm)',
                      transition: 'color var(--duration-fast)',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-muted)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-text-dim)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Follow Us
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {SOCIALS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--text-sm)',
                      transition: 'color var(--duration-fast)',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-muted)')}
                  >
                    {label} â
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-4)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
            Â© {year} Agence Studio. All rights reserved.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
            Built with React + Vite Â·{' '}
            <a
              href="https://github.com/marcotrm/agency-react-site"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-gold)' }}
            >
              View on GitHub â
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
