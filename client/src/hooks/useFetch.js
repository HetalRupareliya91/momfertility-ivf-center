import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

// Fetches `path`; if the API is unreachable, falls back to bundled data so the site still works.
export default function useFetch(path, fallback) {
  const [state, setState] = useState({ data: fallback ?? null, loading: Boolean(path), error: null });

  useEffect(() => {
    if (!path) return undefined;
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    api(path, { signal: controller.signal })
      .then((res) => setState({ data: res.data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        const useFallback = fallback !== undefined && fallback !== null && err.status !== 404;
        setState({ data: useFallback ? fallback : null, loading: false, error: useFallback ? null : err });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}
