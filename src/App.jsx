/**
 * App.jsx â Root layout and routing
 *
 * Defines the top-level route structure using React Router v6.
 * The Navbar and Footer are always rendered; page content swaps
 * via the <Routes> outlet.
 *
 * Route map:
 *   /          â full one-page scroll (Hero â Work â Services â About â Contact)
 *   /work      â Work section standalone
 *   /services  â Services section standalone
 *   /about     â About section standalone
 *   /contact   â Contact section standalone
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

/** One-page home assembles all sections in sequence */
const Home = () => (
  <>
    <Hero />
    <Work />
    <Services />
    <About />
    <Contact />
  </>
);

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
