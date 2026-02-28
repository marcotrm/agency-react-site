# Agency React Site

Luxury creative agency portfolio built with **React 18 + Vite**, featuring:

- ð¨ **Design System** â CSS custom properties (dark luxury palette, gold accents)
- ð **WordPress REST API** â fetches projects and services from a headless WP backend
- ð **Three.js Layer** â injects the `experience.js` from [ai-web-factory-v3](https://github.com/marcotrm/ai-web-factory-v3) as a live canvas on the Hero
- ð£ï¸ **React Router v6** â full SPA navigation

---

## Quick Start

```bash
npm install
npm run dev
```

> **WordPress API:** set the proxy target in `vite.config.js` to your WP domain.  
> **Three.js:** the `ThreeJSLayer` component dynamically loads  
> `https://raw.githubusercontent.com/marcotrm/ai-web-factory-v3/main/experience.js`  
> and mounts it on `#threejs-canvas`. Pass design-system overrides via data attributes.

---

## Project Structure

```
src/
âââ components/
â   âââ Hero.jsx            # Fullscreen hero with canvas + headline
â   âââ Work.jsx            # 6-card project grid (WP API)
â   âââ Services.jsx        # 3-card services section (WP API)
â   âââ About.jsx           # Agency story + team grid
â   âââ Contact.jsx         # Contact form + email
â   âââ ThreeJSLayer.jsx    # Dynamically injects experience.js
â   âââ Navbar.jsx          # Sticky nav with React Router links
â   âââ Footer.jsx          # Footer with socials
âââ hooks/
â   âââ useWpApi.js         # Generic WP REST API fetch hook
â   âââ useScrollReveal.js  # IntersectionObserver scroll animations
âââ styles/
â   âââ design-system.css   # CSS variables + reset
â   âââ global.css          # Base styles
â   âââ components.css      # Shared component styles
âââ App.jsx                 # Router + layout
âââ main.jsx                # React entry point
```

---

## Environment Variables

Create a `.env` file:

```env
VITE_WP_API_BASE=https://your-wp-domain.com/wp-json/agency/v1
```

---

## Three.js Integration

The `ThreeJSLayer` component:
1. Appends a `<script>` tag pointing to `experience.js` in the source repo.
2. Passes design-system colors as `data-color-bg`, `data-color-gold`, `data-color-text` on `#threejs-canvas`.
3. `experience.js` should read those attributes via `document.getElementById('threejs-canvas').dataset`.

---

## Deployment

```bash
npm run build   # outputs to /dist
```

Deploy `/dist` to Vercel, Netlify, or any static host. Point your CDN to the WP API domain with appropriate CORS headers.
