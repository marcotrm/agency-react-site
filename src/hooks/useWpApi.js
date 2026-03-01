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
 *
 * If WordPress is not yet connected the hook catches the error and sets
 * data = [] so consuming components can render placeholder/static content
 * instead of crashing.
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
 * @param {any[]}   [fallbackData=[]] â data to return when WP is unavailable
 * @returns {{ data: any[], loading: boolean, error: string|null }}
 */
export function useWpApi(endpoint, options = {}, fallbackData = []) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const url = `${WP_BASE}${endpoint}`;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} â ${res.statusText}`);
        }

        const json = await res.json();
        setData(Array.isArray(json) ? json : [json]);
      } catch (err) {
        if (err.name === 'AbortError') return; // unmount â ignore
        // Network error or WP not connected yet â use fallback silently
        console.warn(`[useWpApi] ${endpoint} unavailable, using fallback data.`, err.message);
        setData(fallbackData);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, error };
}

export default useWpApi;
