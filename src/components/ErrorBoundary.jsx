/**
 * ErrorBoundary.jsx â catches render-time errors so the whole app
 * does not crash to a blank screen.
 */
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050505',
            color: '#ffffff',
            fontFamily: 'sans-serif',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: '#c9a96e', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#aaa', maxWidth: 500 }}>
            {this.state.message}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, message: '' })}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              background: '#c9a96e',
              color: '#050505',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
