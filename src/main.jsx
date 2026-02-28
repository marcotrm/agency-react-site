/**
 * main.jsx â Application entry point
 *
 * Mounts the React application into the #root div defined in index.html.
 * Imports the design-system CSS first so custom properties are available
 * to every component that follows.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Design-system custom properties and global reset
import './styles/design-system.css';
import './styles/global.css';
import './styles/components.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter enables React Router v6 declarative navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
