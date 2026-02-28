/**
 * Work.jsx â Project portfolio grid
 *
 * Fetches 6 projects from the WordPress REST API endpoint:
 *   GET /wp-json/agency/v1/progetti
 *
 * Expected WP response shape per item:
 * {
 *   id:          number,
 *   title:       string,
 *   excerpt:     string,
 *   category:    string,        // e.g. "Brand Identity"
 *   thumbnail:   string,        // URL to featured image
 *   permalink:   string,        // link to full case study
 *   year:        string|number,
 * }
 *
 * âââ WordPress side ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
 * Register the endpoint in your theme's functions.php:
 *
 *   add_action('rest_api_init', function() {
 *     register_rest_route('agency/v1', '/progetti', [
 *       'methods'  => 'GET',
 *       'callback' => function() {
 *         $posts = get_posts(['post_type'=>'progetto','numberposts'=>6]);
 *         return array_map(fn($p) => [
 *           'id'        => $p->ID,
 *           'title'     => get_the_title($p),
 *           'excerpt'   => get_the_excerpt($p),
 *           'category'  => get_post_meta($p->ID,'categoria',true),
 *           'thumbnail' => get_the_post_thumbnail_url($p,'large'),
 *           'permalink' => get_permalink($p),
 *           'year'      => get_post_meta($p->ID,'anno',true),
 *         ], $posts);
 *       },
 *       'permission_callback' => '__return_true',
 *     ]);
 *   });
 */
import React from 'react';
import { useWpApi } from '../hooks/useWpApi.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

// ââ Skeleton card shown while loading ââââââââââââââââââââââââââââââââââââââ
function SkeletonCard() {
  return (
    <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
      <div className="skeleton" style={{ width: '100%', aspectRatio: '16/9' }} />
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div className="skeleton" style={{ height: '12px', width: '30%' }} />
        <div className="skeleton" style={{ height: '20px', width: '80%' }} />
        <div className="skeleton" style={{ height: '14px', width: '100%' }} />
        <div className="skeleton" style={{ height: '14px', width: '70%' }} />
      </div>
    </div>
  );
}

// ââ Single project card ââââââââââââââââââââââââââââââââââââââââââââââââââââ
function ProjectCard({ project }) {
  const {
    title    = 'Untitled Project',
    excerpt  = '',
    category = '',
    thumbnail,
    permalink = '#',
    year      = '',
  } = project;

  return (
    <article className="project-card reveal">
      {/* Thumbnail */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="project-card__image"
          loading="lazy"
        />
      ) : (
        // Placeholder when WP has no featured image
        <div
          className="project-card__image"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg-elevated)',
          }}
        >
          <span style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-sm)' }}>
            No image
          </span>
        </div>
      )}

      {/* Hover overlay with "View Project" CTA */}
      <div className="project-card__overlay">
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          View Project â
        </a>
      </div>

      {/* Card body */}
      <div className="project-card__body">
        <p className="project-card__tag">
          {category}{year ? ` â ${year}` : ''}
        </p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">
          {excerpt.length > 120 ? excerpt.slice(0, 120) + 'â¦' : excerpt}
        </p>
      </div>
    </article>
  );
}

// ââ Main Work section ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
export default function Work() {
  const { data: projects, loading, error } = useWpApi('/progetti');
  const sectionRef = useScrollReveal();

  return (
    <section id="work" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 'var(--space-16)' }}>
          <span className="accent-line" />
          <span className="section-label">Selected Work</span>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
              marginTop: 'var(--space-4)',
              maxWidth: '600px',
            }}
          >
            Projects That Define Brands
          </h2>
        </div>

        {/* Error state */}
        {error && (
          <p style={{ color: 'var(--color-error)', marginBottom: 'var(--space-8)' }}>
            Could not load projects: {error}
          </p>
        )}

        {/* ââ Grid: 3 cols on desktop, 2 on tablet, 1 on mobile ââ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: 'var(--grid-gap)',
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : projects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
        </div>
      </div>
    </section>
  );
}
