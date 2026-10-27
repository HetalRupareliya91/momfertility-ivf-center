const BASE = `${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}/api`;

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function api(path, { method = 'GET', body, signal } = {}) {
  let res;
  try {
    res = await fetch(BASE + path, {
      method,
      signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Unable to reach our server. Please check your connection or call us directly.', 0);
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* no JSON body */
  }

  if (!res.ok) {
    throw new ApiError(data?.error?.message || 'Something went wrong. Please try again.', res.status, data?.error?.details);
  }
  return data;
}
