/**
 * About.jsx â Agency story and team grid
 *
 * Sections:
 *   1. Agency manifesto / story paragraph
 *   2. Stats row (years, projects, clients)
 *   3. Team grid with avatar, name, role
 *
 * Team data is static here but can easily be wired to a WP endpoint
 * at /wp-json/agency/v1/team following the same useWpApi pattern.
 */
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const STATS = [
  { value: '08',  label: 'Years of craft'    },
  { value: '240+', label: 'Projects delivered' },
  { value: '60+',  label: 'Global clients'     },
  { value: '12',   label: 'Industry awards'    },
];

const TEAM = [
  { name: 'Marco Torremocha', role: 'Founder & Creative Director', initials: 'MT' },
  { name: 'Elena Vasquez',    role: 'Lead Designer',               initials: 'EV' },
  { name: 'James Okafor',     role: 'Head of Technology',          initials: 'JO' },
  { name: 'Yuki Tanaka',      role: 'Art Director',                initials: 'YT' },
  { name: 'Camille Bertrand', role: 'Strategy Director',           initials: 'CB' },
  { name: 'Luca Ferretti',    role: 'Motion Designer',             initials: 'LF' },
];

/** Avatar placeholder using initials when no photo is available */
function Avatar({ initials }) {
  return (
    <div
      style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'var(--color-bg-elevated)',
        border: '2px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto var(--space-4)',
        fontSize: 'var(--text-xl)',
        fontWeight: 600,
        color: 'var(--color-gold)',
        letterSpacing: 'var(--tracking-wide)',
        transition: 'border-color var(--duration-base)',
      }}
    >
      {initials}
    </div>
  );
}

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        {/* ââ Story ââ */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
            gap: 'var(--space-16)',
            alignItems: 'center',
            marginBottom: 'var(--space-24)',
          }}
        >
          {/* Left: label + headline */}
          <div>
            <span className="accent-line" />
            <span className="section-label">Our Story</span>
            <h2
              style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
                marginTop: 'var(--space-4)',
              }}
            >
              Born from a Belief That Design Changes Everything
            </h2>
          </div>

          {/* Right: manifesto copy */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--leading-loose)',
              }}
            >
              Founded in 2016, our studio was born from a simple conviction:
              the best brands aren't just seen â they're felt. We combine
              strategic thinking with masterful craft to create identities and
              experiences that endure.
            </p>
            <p
              style={{
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--leading-loose)',
              }}
            >
              We work with a select number of clients each year, giving every
              project the depth of focus it deserves. From global luxury houses
              to disruptive start-ups, our work spans categories but shares a
              common thread: uncompromising quality.
            </p>
            {/* Gold divider quote */}
            <blockquote
              style={{
                borderLeft: '3px solid var(--color-gold)',
                paddingLeft: 'var(--space-6)',
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-lg)',
              }}
            >
              "Luxury is not a price point. It's a standard of care applied to
              every decision."
            </blockquote>
          </div>
        </div>

        {/* ââ Stats row ââ */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--grid-gap)',
            padding: 'var(--space-12) 0',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: 'var(--space-24)',
          }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 1,
                  marginBottom: 'var(--space-2)',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ââ Team grid ââ */}
        <div>
          <div className="reveal" style={{ marginBottom: 'var(--space-12)' }}>
            <span className="section-label">The Team</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
              gap: 'var(--space-10)',
            }}
          >
            {TEAM.map((member) => (
              <div key={member.name} className="team-card reveal">
                <Avatar initials={member.initials} />
                <p className="team-card__name">{member.name}</p>
                <p className="team-card__role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
