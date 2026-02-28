/**
 * Services.jsx â Agency services section
 *
 * Fetches service data from the WordPress REST API endpoint:
 *   GET /wp-json/agency/v1/servizi
 *
 * Expected WP response shape per item:
 * {
 *   id:          number,
 *   title:       string,
 *   description: string,
 *   icon:        string,  // emoji or SVG URL
 *   features:    string[], // array of feature strings
 * }
 *
 * âââ WordPress side ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
 * Register in functions.php:
 *
 *   add_action('rest_api_init', function() {
 *     register_rest_route('agency/v1', '/servizi', [
 *       'methods'  => 'GET',
 *       'callback' => function() {
 *         $posts = get_posts(['post_type'=>'servizio','numberposts'=>-1]);
 *         return array_map(fn($p) => [
 *           'id'          => $p->ID,
 *           'title'       => get_the_title($p),
 *           'description' => get_the_excerpt($p),
 *           'icon'        => get_post_meta($p->ID,'icona',true),
 *           'features'    => explode('\n', get_post_meta($p->ID,'funzionalita',true)),
 *         ], $posts);
 *       },
 *       'permission_callback' => '__return_true',
 *     ]);
 *   });
 */
import React from 'react';
import { useWpApi } from '../hooks/useWpApi.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

// Fallback services shown if the WP API is unavailable
const FALLBACK_SERVICES = [
  {
    id: 1,
    icon: 'â',
    title: 'Brand Identity',
    description:
      'We build cohesive visual languages that communicate your brand's essence across every touchpoint.',
    features: ['Logo & Visual System', 'Brand Strategy', 'Typography', 'Color Systems', 'Brand Guidelines'],
  },
  {
    id: 2,
    icon: 'â',
    title: 'Digital Experience',
    description:
      'Immersive web experiences that blend cutting-edge technology with thoughtful interaction design.',
    features: ['Web Design & Dev', 'Motion Design', '3D & WebGL', 'CMS Integration', 'Performance Optimization'],
  },
  {
    id: 3,
    icon: 'â',
    title: 'Art Direction',
    description:
      'Visual storytelling that elevates campaigns and editorial projects to gallery-worthy standards.',
    features: ['Campaign Direction', 'Photography Direction', 'Film & Motion', 'Spatial Design', 'Print & Collateral'],
  },
];

function ServiceCard({ service, index }) {
  const { icon, title, description, features = [] } = service;

  return (
    <article
      className="service-card reveal"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="service-card__icon">{icon}</div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
      {features.length > 0 && (
        <ul className="service-card__list">
          {features.filter(Boolean).map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Services() {
  const { data: apiServices, loading, error } = useWpApi('/servizi');
  const sectionRef = useScrollReveal();

  // Use WP data if available and non-empty, otherwise show fallback
  const services =
    !loading && !error && apiServices.length > 0
      ? apiServices.slice(0, 3)
      : FALLBACK_SERVICES;

  return (
    <section
      id="services"
      className="section"
      ref={sectionRef}
      style={{ background: 'var(--color-bg-surface)' }}
    >
      <div className="container">
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 'var(--space-16)' }}>
          <span className="accent-line" />
          <span className="section-label">What We Do</span>
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
            Services Built for the Ambitious
          </h2>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: 'var(--grid-gap)',
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: '400px', borderRadius: 'var(--radius-base)' }}
                />
              ))
            : services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
