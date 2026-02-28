/**
 * Navbar.jsx â Sticky navigation bar
 *
 * Features:
 * - Transparent on load, frosted-glass after 64px scroll
 * - Active link detection via React Router's useLocation
 * - Smooth hover underline animation (CSS in components.css)
 */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Work',     to: '/work'     },
  { label: 'Services', to: '/services' },
  { label: 'About',    to: '/about'    },
  { label: 'Contact',  to: '/contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo â returns to home */}
        <NavLink to="/" className="navbar__logo">
          AGENCE<span>.</span>
        </NavLink>

        <nav aria-label="Primary navigation">
          <ul className="navbar__nav">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
