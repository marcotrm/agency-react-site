/**
 * Contact.jsx â Contact form + direct email section
 *
 * Features:
 *   - Controlled form with client-side validation
 *   - Submits to a configurable API endpoint (or mailto fallback)
 *   - Success / error feedback states
 *   - Direct email contact block alongside the form
 *
 * âââ Backend integration ââââââââââââââââââââââââââââââââââââââââââââââââââââ
 * The form POSTs JSON to /wp-json/agency/v1/contact (configure in .env as
 * VITE_CONTACT_ENDPOINT). On the WP side, register a handler that sends an
 * email via wp_mail() and returns { success: true }.
 *
 * Alternatively, replace the fetch call with a Formspree, EmailJS, or
 * custom serverless endpoint.
 */
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? '/wp-json/agency/v1/contact';

const CONTACT_EMAIL = 'hello@agence.studio';

const INITIAL_FORM = {
  name:    '',
  email:   '',
  company: '',
  budget:  '',
  message: '',
};

const BUDGET_OPTIONS = [
  'Under â¬10k',
  'â¬10k â â¬25k',
  'â¬25k â â¬50k',
  'â¬50k â â¬100k',
  'â¬100k+',
];

export default function Contact() {
  const [form,    setForm]    = useState(INITIAL_FORM);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const sectionRef = useScrollReveal();

  // ââ Validation âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
                              e.email   = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Tell us about your project.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ââ Submit ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error('[Contact] submit error', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 'var(--space-16)' }}>
          <span className="accent-line" />
          <span className="section-label">Get in Touch</span>
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
            Let's Build Something Remarkable
          </h2>
        </div>

        {/* Two-column layout: form + contact info */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
        >
          {/* ââ Form ââ */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Name */}
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Name *</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={`form-input${errors.name ? ' error' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                />
                {errors.name && <span className="form-error-msg">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email *</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              {/* Company */}
              <div className="form-group">
                <label htmlFor="contact-company" className="form-label">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  className="form-input"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company (optional)"
                />
              </div>

              {/* Budget */}
              <div className="form-group">
                <label htmlFor="contact-budget" className="form-label">Budget Range</label>
                <select
                  id="contact-budget"
                  name="budget"
                  className="form-input"
                  value={form.budget}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select a range</option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Project Brief *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`form-textarea${errors.message ? ' error' : ''}`}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, and timelineâ¦"
                />
                {errors.message && <span className="form-error-msg">{errors.message}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'loading'}
                style={{ alignSelf: 'flex-start' }}
              >
                {status === 'loading' ? 'Sendingâ¦' : 'Send Enquiry â'}
              </button>

              {/* Feedback */}
              {status === 'success' && (
                <p style={{ color: 'var(--color-success)', fontSize: 'var(--text-sm)' }}>
                  Message received â we'll be in touch within 48 hours.
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)' }}>
                  Something went wrong. Please email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-gold)' }}>
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              )}
            </div>
          </form>

          {/* ââ Contact info sidebar ââ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            <div>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--leading-loose)',
                  fontSize: 'var(--text-lg)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                We take on a limited number of projects each quarter to ensure
                every client receives our full attention. Enquire early.
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>
                Email
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-gold)',
                  transition: 'color var(--duration-fast)',
                }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            {/* Office */}
            <div>
              <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>
                Studio
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 'var(--leading-normal)' }}>
                Via della Vigna Nuova 18<br />
                50123 Florence, Italy
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="section-label" style={{ marginBottom: 'var(--space-4)' }}>
                Follow
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
                {['Instagram', 'LinkedIn', 'Dribbble'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-wide)',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      transition: 'color var(--duration-fast)',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-muted)')}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
