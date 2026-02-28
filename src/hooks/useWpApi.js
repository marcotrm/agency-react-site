/**
 * useWpApi.js â Generic WordPress REST API fetch hook
 *
 * Usage:
 *   const { data, loading, error } = useWpApi('/progetti');
 *
 * The hook prepends the base URL from the VITE_WP_API_BASE env variable.
 * During development, Vite's proxy (vite.config.js) intercepts /wp-json/**
 * calls and forwards them to the configured WordPress domain, avoiding CORS.
 *
 * In production, ensure the WP server has the following header:
 *   Access-Control-Allow-Origin: https://your-react-domain.com
 */
import { useState, useEffect } from 'react';

/**
 * The base URL for all WordPress REST API calls.
 * Set VITE_WP_API_BASE in your .env file, e.g.:
 *   VITE_WP_API_BASE=https://your-wp.com/wp-json/agency/v1
 *
 * Falls back to the relative path so Vite's proxy handles it in dev.
 */
const WP_BASE = import.meta.env.VITE_WP_API_BASE ?? '/wp-json/agency/v1';

/**
 * @param {string}  endpoint  â API path segment, e.g. '/progetti'
 * @param {object}  [options] â fetch options (method, headers, etc.)
 * @returns {{ data: any[], loading: boolean, error: string|null }}
 */
export function useWpApi(endpoint, options = {}) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // Abort controller lets us cancel in-flight requests on unmount
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${WP_BASE}${endpoint}`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json', ...options.headers },
          ...options,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} â ${res.statusText}`);
        }

        const json = await res.json();
        setData(Array.isArray(json) ? json : [json]);
      } catch (err) {
        // AbortError is expected on cleanup; don't surface it as an error
        if (err.name !== 'AbortError') {
          console.error(`[useWpApi] ${endpoint}`, err);
          setError(err.message ?? 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: cancel fetch if component unmounts before response arrives
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, error };
}
